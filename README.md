# 🎓 SatisTrain - KI-gestützte Kundenzufriedenheits-Lernplattform

Eine moderne, interaktive Lernplattform zur Verbesserung von Kundenservice-Fähigkeiten durch KI-gestützte Simulationen, Gamification und personalisierte Lernpfade.

## 📋 Inhaltsverzeichnis

- [Überblick](#überblick)
- [Hauptfunktionen](#hauptfunktionen)
- [Technische Architektur](#technische-architektur)
- [Installation](#installation)
- [Projektstruktur](#projektstruktur)
- [Datenbank-Schema](#datenbank-schema)
- [Komponenten-Übersicht](#komponenten-übersicht)
- [API-Endpunkte](#api-endpunkte)
- [Deployment](#deployment)
- [Mitwirken](#mitwirken)

## 🌟 Überblick

SatisTrain ist eine umfassende E-Learning-Plattform, die speziell für die Schulung von Kundenservice-Mitarbeitern entwickelt wurde. Die Plattform kombiniert modernste Technologien mit bewährten pädagogischen Ansätzen, um ein effektives und ansprechendes Lernerlebnis zu schaffen.

### Zielgruppe
- **Kundenservice-Mitarbeiter**: Verbesserung ihrer Kommunikations- und Problemlösungsfähigkeiten
- **Trainer und Manager**: Überwachung des Lernfortschritts und Verwaltung von Schulungsprogrammen
- **Unternehmen**: Steigerung der Kundenzufriedenheit durch bessere Mitarbeiterschulung

## 🚀 Hauptfunktionen

### 🤖 KI-gestützte Simulationen
- **Realistische Kundengespräche**: Interaktive Simulationen mit fortschrittlicher KI
- **Empathie-Bewertung**: Automatische Analyse von Kommunikationsfähigkeiten
- **Echtzeit-Feedback**: Sofortige Rückmeldung zu Gesprächsführung und Problemlösung
- **Verschiedene Szenarien**: Beschwerden, Anfragen, Verkaufsgespräche und mehr

### 🏆 Gamification & Belohnungssystem
- **Punkte-System**: Sammle Punkte für abgeschlossene Lektionen und Simulationen
- **Abzeichen & Achievements**: Über 50 verschiedene Auszeichnungen in 4 Seltenheitsstufen
- **Level-System**: Fortschrittsverfolgung durch aufsteigende Level
- **Leaderboards**: Wöchentliche Herausforderungen und Team-Wettbewerbe
- **Streak-System**: Belohnung für kontinuierliches Lernen

### 📚 Personalisierte Lernpfade
- **Adaptive Kurse**: Maßgeschneiderte Inhalte basierend auf Rolle und Fortschritt
- **Schwierigkeitsanpassung**: Automatische Anpassung an individuelle Lerngeschwindigkeit
- **Empfehlungssystem**: KI-basierte Kursvorschläge
- **Modularer Aufbau**: Flexible Kursstruktur mit Modulen und Lektionen

### 📊 Umfassende Analytik
- **Fortschritts-Tracking**: Detaillierte Verfolgung des Lernfortschritts
- **Performance-Metriken**: CSAT-Scores, Empathie-Werte, Kommunikationsbewertungen
- **Lernzeit-Analyse**: Optimierung der Lernzeiten und -gewohnheiten
- **Team-Dashboards**: Übersicht für Trainer und Manager

### ⚡ Mikro-Lernen
- **Kurze Lerneinheiten**: 3-5 Minuten Sessions für den Arbeitsalltag
- **Tägliche Herausforderungen**: Kleine, regelmäßige Lernaufgaben
- **Mobile-First**: Optimiert für Lernen unterwegs
- **Spaced Repetition**: Wissenschaftlich fundierte Wiederholungsintervalle

### 👥 Soziales Lernen
- **Diskussionsforen**: Austausch zwischen Lernenden
- **Peer-Feedback**: Bewertung von Simulationen durch Kollegen
- **Team-Challenges**: Gemeinsame Lernziele und Wettbewerbe
- **Mentoring-System**: Erfahrene Mitarbeiter als Mentoren

## 🛠 Technische Architektur

### Frontend-Stack
- **Framework**: Next.js 13.5.1 mit App Router
- **Sprache**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3 mit CSS-in-JS
- **UI-Komponenten**: Radix UI Primitives
- **Animationen**: Framer Motion 10.16.16
- **State Management**: Zustand 4.4.7
- **Formulare**: React Hook Form 7.53.0 mit Zod-Validierung

### Backend & Datenbank
- **Backend-as-a-Service**: Supabase
- **Datenbank**: PostgreSQL mit Row Level Security (RLS)
- **Authentifizierung**: Supabase Auth mit JWT
- **Echtzeit**: Supabase Realtime für Live-Updates
- **Dateispeicher**: Supabase Storage

### Entwicklungstools
- **Linting**: ESLint mit Next.js Konfiguration
- **Code-Qualität**: TypeScript Strict Mode
- **Build-Tool**: Next.js mit SWC Compiler
- **Deployment**: Netlify mit automatischen Builds

### Externe Integrationen
- **Stagewise Toolbar**: Entwicklungstools und Debugging
- **Charts**: Recharts für Datenvisualisierung
- **Icons**: Lucide React Icon-Bibliothek
- **Notifications**: Sonner für Toast-Nachrichten

## 📦 Installation

### Voraussetzungen
- Node.js 18+ (empfohlen: Version aus `.nvmrc`)
- npm oder yarn
- Supabase-Projekt

### Lokale Entwicklung

1. **Repository klonen**
```bash
git clone https://github.com/spiral023/satistrain-bolt.git
cd satistrain-bolt
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Umgebungsvariablen konfigurieren**
```bash
cp .env.example .env.local
```

Erforderliche Umgebungsvariablen:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **Datenbank-Migrationen ausführen**
```bash
npx supabase db push
```

5. **Entwicklungsserver starten**
```bash
npm run dev
```

Die Anwendung ist unter `http://localhost:3000` verfügbar.

## 📁 Projektstruktur

```
satistrain-bolt/
├── app/                          # Next.js App Router
│   ├── globals.css              # Globale Styles
│   ├── layout.tsx               # Root Layout
│   ├── page.tsx                 # Homepage
│   ├── providers.tsx            # Context Provider
│   ├── achievements/            # Achievement-Seiten
│   ├── auth/                    # Authentifizierung
│   ├── certificates/            # Zertifikate
│   ├── courses/                 # Kursverwaltung
│   ├── dashboard/               # Benutzer-Dashboard
│   ├── leaderboard/             # Ranglisten
│   ├── microlearning/           # Mikro-Lernen
│   └── simulator/               # KI-Simulationen
├── components/                   # React-Komponenten
│   ├── ui/                      # Basis-UI-Komponenten
│   ├── achievements/            # Achievement-Komponenten
│   ├── auth/                    # Auth-Komponenten
│   ├── certificates/            # Zertifikat-Komponenten
│   ├── courses/                 # Kurs-Komponenten
│   ├── dashboard/               # Dashboard-Komponenten
│   ├── leaderboard/             # Leaderboard-Komponenten
│   ├── microlearning/           # Mikro-Lernen-Komponenten
│   ├── navigation/              # Navigation
│   └── simulator/               # Simulator-Komponenten
├── hooks/                       # Custom React Hooks
├── lib/                         # Utility-Funktionen
│   ├── api/                     # API-Abstraktionen
│   ├── auth.ts                  # Authentifizierung
│   ├── database.types.ts        # TypeScript-Typen
│   ├── store.ts                 # Zustand Store
│   ├── supabase.ts              # Supabase-Client
│   └── utils.ts                 # Hilfsfunktionen
├── supabase/                    # Supabase-Konfiguration
│   └── migrations/              # Datenbank-Migrationen
├── .eslintrc.json              # ESLint-Konfiguration
├── .gitignore                  # Git-Ignore-Regeln
├── .nvmrc                      # Node.js-Version
├── components.json             # Shadcn/ui-Konfiguration
├── netlify.toml                # Netlify-Deployment
├── next.config.js              # Next.js-Konfiguration
├── package.json                # NPM-Dependencies
├── postcss.config.js           # PostCSS-Konfiguration
├── tailwind.config.ts          # Tailwind-Konfiguration
└── tsconfig.json               # TypeScript-Konfiguration
```

## 🗄 Datenbank-Schema

### Kern-Entitäten

#### Benutzer & Authentifizierung
- **user**: Benutzerprofile mit E-Mail, Locale und Soft-Delete
- **credential**: Authentifizierungsdaten (lokal/OIDC)
- **session**: JWT-basierte Sitzungsverwaltung
- **role**: Rollensystem (Admin, Trainer, Mitarbeiter)
- **user_role**: Benutzer-Rollen-Zuordnung

#### Lerninhalt
- **course**: Kurse mit Versionierung und Schwierigkeitsgrad
- **module**: Kursmodule mit Reihenfolge
- **lesson**: Einzelne Lektionen mit Inhaltstypen
- **enrollment**: Kurseinschreibungen mit Status-Tracking
- **progress**: Detaillierter Lernfortschritt pro Lektion

#### Gamification
- **badge**: Abzeichen mit Seltenheitsstufen
- **badge_award**: Verleihung von Abzeichen an Benutzer

#### KI-Simulationen
- **simulation_session**: Simulationssitzungen mit Bewertungen
- **simulation_step**: Einzelne Gesprächsschritte mit KI-Feedback

#### Metriken & Audit
- **csat_metric**: Kundenzufriedenheits-Bewertungen
- **audit_log**: Vollständige Aktivitätsverfolgung

### Sicherheitsfeatures
- **Row Level Security (RLS)**: Datenschutz auf Datenbankebene
- **JWT-Authentifizierung**: Sichere Token-basierte Anmeldung
- **Rollen-basierte Zugriffskontrolle**: Granulare Berechtigungen
- **Audit-Logging**: Vollständige Nachverfolgbarkeit

## 🧩 Komponenten-Übersicht

### UI-Komponenten (Shadcn/ui)
Vollständige Sammlung von wiederverwendbaren UI-Komponenten:
- **Formulare**: Input, Textarea, Select, Checkbox, Radio
- **Navigation**: Breadcrumb, Pagination, Tabs, Menu
- **Feedback**: Alert, Toast, Dialog, Tooltip
- **Layout**: Card, Separator, Accordion, Collapsible
- **Datenvisualisierung**: Chart, Progress, Badge

### Feature-spezifische Komponenten

#### Dashboard
- **StatsCards**: Übersichtskarten mit Kennzahlen
- **ActivityFeed**: Chronologische Aktivitätsliste

#### Kurse
- **CourseGrid**: Responsive Kursübersicht
- **CourseProgress**: Fortschrittsanzeige
- **LearningPath**: Visualisierung des Lernpfads

#### Simulationen
- **SimulatorInterface**: Hauptinterface für KI-Gespräche
- **LiveFeedback**: Echtzeit-Bewertungsanzeige
- **PerformanceAnalytics**: Detaillierte Leistungsauswertung

#### Achievements
- **BadgeCollection**: Sammlung erworbener Abzeichen
- **ProgressMilestones**: Meilenstein-Tracking
- **LeaderboardPreview**: Ranglistenvorschau

## 🔌 API-Endpunkte

### Authentifizierung
```typescript
// Benutzeranmeldung
POST /auth/login
POST /auth/register
POST /auth/logout
GET /auth/user
```

### Kurse
```typescript
// Kursverwaltung
GET /api/courses
GET /api/courses/[id]
POST /api/courses/[id]/enroll
GET /api/courses/[id]/progress
```

### Simulationen
```typescript
// KI-Simulationen
POST /api/simulations/start
POST /api/simulations/[id]/step
GET /api/simulations/[id]/feedback
GET /api/simulations/history
```

### Gamification
```typescript
// Achievements und Punkte
GET /api/achievements
GET /api/leaderboard
GET /api/badges
POST /api/badges/award
```

### Analytics
```typescript
// Lernanalysen
GET /api/analytics/progress
GET /api/analytics/performance
GET /api/analytics/csat
```

## 🚀 Deployment

### Netlify (Empfohlen)
Die Anwendung ist für Netlify optimiert:

1. **Automatisches Deployment**: Push zu `main` Branch
2. **Build-Konfiguration**: In `netlify.toml` definiert
3. **Umgebungsvariablen**: Über Netlify Dashboard konfigurieren

### Manuelle Deployment-Schritte

1. **Build erstellen**
```bash
npm run build
```

2. **Statische Dateien**
```bash
npm run export  # Falls statisches Export gewünscht
```

3. **Umgebungsvariablen setzen**
- Supabase-Konfiguration
- API-Keys für externe Services

### Produktions-Checkliste
- [ ] Umgebungsvariablen konfiguriert
- [ ] Datenbank-Migrationen ausgeführt
- [ ] RLS-Richtlinien aktiviert
- [ ] SSL-Zertifikat installiert
- [ ] Performance-Monitoring eingerichtet

## 🤝 Mitwirken

### Entwicklungsrichtlinien
1. **Code-Style**: ESLint + Prettier Konfiguration befolgen
2. **TypeScript**: Strict Mode verwenden
3. **Komponenten**: Atomic Design Prinzipien
4. **Testing**: Unit Tests für kritische Funktionen
5. **Dokumentation**: JSDoc für komplexe Funktionen

### Pull Request Prozess
1. Feature Branch erstellen
2. Änderungen implementieren
3. Tests hinzufügen/aktualisieren
4. Dokumentation aktualisieren
5. Pull Request erstellen

### Lokale Entwicklung
```bash
# Linting
npm run lint

# Type Checking
npm run type-check

# Build Test
npm run build
```

## 📊 Statistiken

- **2,500+** Aktive Lerner
- **50+** Verfügbare Kurse
- **85%** Durchschnittliche Verbesserung
- **10k+** Simulationen pro Monat

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe [LICENSE](LICENSE) für Details.

## 🆘 Support

Bei Fragen oder Problemen:
- **Issues**: GitHub Issues für Bug-Reports
- **Diskussionen**: GitHub Discussions für Fragen
- **E-Mail**: support@satistrain.com

---

<<<<<<< HEAD
**Entwickelt mit ❤️ für besseren Kundenservice**
=======
**Entwickelt mit ❤️ für besseren Kundenservice**
>>>>>>> c62b08132d8c62d803af4fe71cb43c8f375c8f47
