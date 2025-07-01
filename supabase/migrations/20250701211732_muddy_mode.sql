/*
  # Gamification-Schema

  1. Neue Tabellen
    - `badge` - Abzeichen mit Namen und Emoji
    - `badge_award` - Verleihung von Abzeichen an Benutzer
    - `simulation_session` - KI-Konversationssitzungen
    - `simulation_step` - Einzelne Schritte in Simulationen
    - `csat_metric` - Kundenzufriedenheits-Metriken
    - `audit_log` - Auditprotokoll für alle Aktionen

  2. Sicherheit
    - Row Level Security für alle Tabellen
    - Benutzer können eigene Daten einsehen
    - Trainer können Team-Daten einsehen

  3. Indizes
    - GIN-Indizes für JSONB-Spalten
    - Performance-Indizes für häufige Abfragen
*/

-- Abzeichen-Tabelle
CREATE TABLE IF NOT EXISTS badge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  emoji text DEFAULT '🏆',
  points_required integer DEFAULT 0,
  rarity text DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at timestamptz DEFAULT now()
);

-- Abzeichen-Verleihungen
CREATE TABLE IF NOT EXISTS badge_award (
  user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES badge(id) ON DELETE CASCADE,
  awarded_at timestamptz DEFAULT now(),
  awarded_by uuid REFERENCES "user"(id),
  PRIMARY KEY (user_id, badge_id)
);

-- Simulationssitzungen
CREATE TABLE IF NOT EXISTS simulation_session (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  scenario_type text DEFAULT 'customer_complaint',
  metadata jsonb DEFAULT '{}',
  total_score integer,
  empathy_score integer,
  resolution_score integer,
  communication_score integer,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Simulationsschritte
CREATE TABLE IF NOT EXISTS simulation_step (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES simulation_session(id) ON DELETE CASCADE,
  step_order integer NOT NULL,
  user_text text NOT NULL,
  ai_text text,
  score integer CHECK (score BETWEEN 0 AND 100),
  feedback jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, step_order)
);

-- CSAT-Metriken
CREATE TABLE IF NOT EXISTS csat_metric (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  score integer NOT NULL CHECK (score BETWEEN 1 AND 5),
  category text DEFAULT 'general',
  notes text,
  recorded_at timestamptz DEFAULT now()
);

-- Auditprotokoll
CREATE TABLE IF NOT EXISTS audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES "user"(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  data jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Standard-Abzeichen einfügen
INSERT INTO badge (name, description, emoji, points_required, rarity) VALUES 
  ('Erste Schritte', 'Erste Lektion abgeschlossen', '🌟', 10, 'common'),
  ('Kommunikationsexperte', '10 Simulationen erfolgreich abgeschlossen', '🗣️', 100, 'rare'),
  ('Empathie-Champion', 'Hohe Empathie-Bewertung in 5 Simulationen', '❤️', 150, 'epic'),
  ('Problemlöser', 'Schwierige Kundenprobleme gelöst', '🧩', 200, 'rare'),
  ('Teamplayer', 'Anderen Teammitgliedern geholfen', '🤝', 75, 'common'),
  ('Lernbegeisterter', 'Alle verfügbaren Kurse abgeschlossen', '📚', 500, 'legendary')
ON CONFLICT (name) DO NOTHING;

-- Indizes erstellen
CREATE INDEX IF NOT EXISTS idx_badge_award_user ON badge_award(user_id);
CREATE INDEX IF NOT EXISTS idx_badge_award_awarded_at ON badge_award(awarded_at);
CREATE INDEX IF NOT EXISTS idx_simulation_session_user ON simulation_session(user_id);
CREATE INDEX IF NOT EXISTS idx_simulation_session_created_at ON simulation_session(created_at);
CREATE INDEX IF NOT EXISTS idx_simulation_step_session ON simulation_step(session_id, step_order);
CREATE INDEX IF NOT EXISTS idx_csat_metric_user_recorded ON csat_metric(user_id, recorded_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_user_created ON audit_log(user_id, created_at);

-- GIN-Indizes für JSONB-Spalten
CREATE INDEX IF NOT EXISTS idx_simulation_session_metadata_gin ON simulation_session USING GIN (metadata);
CREATE INDEX IF NOT EXISTS idx_simulation_step_feedback_gin ON simulation_step USING GIN (feedback);
CREATE INDEX IF NOT EXISTS idx_audit_log_data_gin ON audit_log USING GIN (data);

-- Row Level Security aktivieren
ALTER TABLE badge ENABLE ROW LEVEL SECURITY;
ALTER TABLE badge_award ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_session ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_step ENABLE ROW LEVEL SECURITY;
ALTER TABLE csat_metric ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- RLS-Richtlinien für Abzeichen (alle können lesen)
CREATE POLICY "Abzeichen sind öffentlich lesbar"
  ON badge FOR SELECT
  TO authenticated
  USING (true);

-- RLS-Richtlinien für Abzeichen-Verleihungen
CREATE POLICY "Benutzer können eigene Abzeichen einsehen"
  ON badge_award FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- RLS-Richtlinien für Simulationssitzungen
CREATE POLICY "Benutzer können eigene Simulationen verwalten"
  ON simulation_session FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- RLS-Richtlinien für Simulationsschritte
CREATE POLICY "Benutzer können eigene Simulationsschritte verwalten"
  ON simulation_step FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM simulation_session s 
    WHERE s.id = session_id AND s.user_id = auth.uid()
  ));

-- RLS-Richtlinien für CSAT-Metriken
CREATE POLICY "Benutzer können eigene CSAT-Metriken verwalten"
  ON csat_metric FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- RLS-Richtlinien für Auditprotokoll
CREATE POLICY "Benutzer können eigene Auditeinträge einsehen"
  ON audit_log FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());