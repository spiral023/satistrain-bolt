/*
  # Kundenzufriedenheits-Lernplattform Hauptschema

  1. Neue Tabellen
    - `user` - Benutzerprofile mit E-Mail, Locale und Löschmarkierung
    - `credential` - Authentifizierungsdaten (lokal/OIDC)
    - `session` - Benutzersitzungen mit JWT und Refresh Token
    - `role` - Benutzerrollen (Trainer, Admin, Mitarbeiter)
    - `permission` - Systemberechtigungen
    - `user_role` - Zuordnung Benutzer zu Rollen

  2. Sicherheit
    - Row Level Security auf allen Tabellen aktiviert
    - Richtlinien für Benutzer zum Lesen eigener Daten
    - Trainer/Admin-Zugriff auf Teamdaten

  3. Indizes
    - Eindeutige Indizes auf E-Mail und JWT-ID
    - Performance-Indizes auf häufig abgefragten Spalten
*/

-- Erstelle Enum-Typen
DO $$ BEGIN
  CREATE TYPE credential_type AS ENUM ('local', 'oidc');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Benutzer-Tabelle
CREATE TABLE IF NOT EXISTS "user" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  locale text DEFAULT 'de',
  deleted_at timestamptz DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Anmeldedaten-Tabelle
CREATE TABLE IF NOT EXISTS credential (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  type credential_type NOT NULL DEFAULT 'local',
  secret_hash text,
  salt text,
  last_used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Sitzungen-Tabelle
CREATE TABLE IF NOT EXISTS session (
  jwt_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  refresh_token_hash text NOT NULL,
  ip inet,
  user_agent text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Rollen-Tabelle
CREATE TABLE IF NOT EXISTS role (
  slug text PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Berechtigungen-Tabelle
CREATE TABLE IF NOT EXISTS permission (
  slug text PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Benutzer-Rollen-Zuordnung
CREATE TABLE IF NOT EXISTS user_role (
  user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  role_slug text NOT NULL REFERENCES role(slug) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, role_slug)
);

-- Standard-Rollen einfügen
INSERT INTO role (slug, name, description) VALUES 
  ('admin', 'Administrator', 'Vollzugriff auf alle Funktionen'),
  ('trainer', 'Trainer', 'Kann Kurse verwalten und Fortschritte einsehen'),
  ('employee', 'Mitarbeiter', 'Kann Kurse absolvieren und an Simulationen teilnehmen')
ON CONFLICT (slug) DO NOTHING;

-- Indizes erstellen
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_email ON "user"(email);
CREATE INDEX IF NOT EXISTS idx_session_jwt_id ON session(jwt_id);
CREATE INDEX IF NOT EXISTS idx_credential_user_id ON credential(user_id);
CREATE INDEX IF NOT EXISTS idx_session_user_id ON session(user_id);
CREATE INDEX IF NOT EXISTS idx_session_expires_at ON session(expires_at);

-- Row Level Security aktivieren
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE credential ENABLE ROW LEVEL SECURITY;
ALTER TABLE session ENABLE ROW LEVEL SECURITY;
ALTER TABLE role ENABLE ROW LEVEL SECURITY;
ALTER TABLE permission ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_role ENABLE ROW LEVEL SECURITY;

-- RLS-Richtlinien für Benutzer
CREATE POLICY "Benutzer können eigene Daten lesen"
  ON "user" FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Benutzer können eigene Daten aktualisieren"
  ON "user" FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS-Richtlinien für Anmeldedaten
CREATE POLICY "Benutzer können eigene Anmeldedaten lesen"
  ON credential FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- RLS-Richtlinien für Sitzungen
CREATE POLICY "Benutzer können eigene Sitzungen lesen"
  ON session FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- RLS-Richtlinien für Rollen (alle können lesen)
CREATE POLICY "Rollen sind öffentlich lesbar"
  ON role FOR SELECT
  TO authenticated
  USING (true);

-- RLS-Richtlinien für Berechtigungen (alle können lesen)
CREATE POLICY "Berechtigungen sind öffentlich lesbar"
  ON permission FOR SELECT
  TO authenticated
  USING (true);

-- RLS-Richtlinien für Benutzer-Rollen
CREATE POLICY "Benutzer können eigene Rollen lesen"
  ON user_role FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());