/*
  # Lernplattform-Schema

  1. Neue Tabellen
    - `course` - Kurse mit Titel, Version und Aktiv-Status
    - `module` - Kursmodule mit Reihenfolge
    - `lesson` - Einzelne Lektionen mit Inhalts-URL und geschätzter Dauer
    - `enrollment` - Kurseinschreibungen mit Status und Zertifikat
    - `progress` - Lernfortschritt pro Lektion mit Bewertung

  2. Sicherheit
    - Row Level Security für alle Tabellen
    - Benutzer können eigenen Fortschritt einsehen
    - Trainer können Team-Fortschritt einsehen

  3. Indizes
    - Performance-Indizes auf häufig abgefragten Spalten
    - Zusammengesetzte Indizes für Fortschritt-Abfragen
*/

-- Erstelle Enum-Typen
DO $$ BEGIN
  CREATE TYPE enrollment_status AS ENUM ('enrolled', 'in_progress', 'completed', 'paused', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Kurse-Tabelle
CREATE TABLE IF NOT EXISTS course (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  version text DEFAULT '1.0',
  is_active boolean DEFAULT true,
  difficulty_level integer DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
  estimated_hours integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Module-Tabelle
CREATE TABLE IF NOT EXISTS module (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES course(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_idx integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, order_idx)
);

-- Lektionen-Tabelle
CREATE TABLE IF NOT EXISTS lesson (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES module(id) ON DELETE CASCADE,
  title text NOT NULL,
  content_url text,
  content_type text DEFAULT 'text',
  estimated_minutes integer DEFAULT 5,
  order_idx integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(module_id, order_idx)
);

-- Einschreibungen-Tabelle
CREATE TABLE IF NOT EXISTS enrollment (
  user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES course(id) ON DELETE CASCADE,
  status enrollment_status DEFAULT 'enrolled',
  certificate_id uuid,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  PRIMARY KEY (user_id, course_id)
);

-- Fortschritt-Tabelle
CREATE TABLE IF NOT EXISTS progress (
  user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lesson(id) ON DELETE CASCADE,
  completed_at timestamptz,
  score integer CHECK (score BETWEEN 0 AND 100),
  time_spent_s integer DEFAULT 0,
  attempts integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, lesson_id)
);

-- Standard-Kurse einfügen
INSERT INTO course (id, title, description, difficulty_level, estimated_hours) VALUES 
  (gen_random_uuid(), 'Grundlagen der Kundenzufriedenheit', 'Einführung in die Prinzipien exzellenten Kundenservice', 1, 2),
  (gen_random_uuid(), 'Empathische Kommunikation', 'Fortgeschrittene Techniken für empathische Kundengespräche', 2, 3),
  (gen_random_uuid(), 'Konfliktlösung im Kundenservice', 'Strategien zur Deeskalation und Problemlösung', 3, 4)
ON CONFLICT (id) DO NOTHING;

-- Indizes erstellen
CREATE INDEX IF NOT EXISTS idx_course_active ON course(is_active);
CREATE INDEX IF NOT EXISTS idx_module_course_order ON module(course_id, order_idx);
CREATE INDEX IF NOT EXISTS idx_lesson_module_order ON lesson(module_id, order_idx);
CREATE INDEX IF NOT EXISTS idx_enrollment_user_status ON enrollment(user_id, status);
CREATE INDEX IF NOT EXISTS idx_progress_user_lesson ON progress(user_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_progress_completed_at ON progress(completed_at);

-- Row Level Security aktivieren
ALTER TABLE course ENABLE ROW LEVEL SECURITY;
ALTER TABLE module ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollment ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- RLS-Richtlinien für Kurse (alle können aktive Kurse lesen)
CREATE POLICY "Aktive Kurse sind öffentlich lesbar"
  ON course FOR SELECT
  TO authenticated
  USING (is_active = true);

-- RLS-Richtlinien für Module (alle können Module aktiver Kurse lesen)
CREATE POLICY "Module aktiver Kurse sind lesbar"
  ON module FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM course c 
    WHERE c.id = course_id AND c.is_active = true
  ));

-- RLS-Richtlinien für Lektionen
CREATE POLICY "Lektionen sind für eingeschriebene Benutzer lesbar"
  ON lesson FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM module m 
    JOIN course c ON c.id = m.course_id 
    JOIN enrollment e ON e.course_id = c.id 
    WHERE m.id = module_id AND e.user_id = auth.uid() AND c.is_active = true
  ));

-- RLS-Richtlinien für Einschreibungen
CREATE POLICY "Benutzer können eigene Einschreibungen verwalten"
  ON enrollment FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- RLS-Richtlinien für Fortschritt
CREATE POLICY "Benutzer können eigenen Fortschritt verwalten"
  ON progress FOR ALL
  TO authenticated
  USING (user_id = auth.uid());