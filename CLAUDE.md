# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start the Next.js development server on port 3000
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

### Testing Commands
No specific testing framework is configured. Tests should be added following the project's needs.

## Code Architecture & Structure

### Technology Stack
- **Framework**: Next.js 13.5.1 with App Router architecture
- **Language**: TypeScript 5.2.2 with strict mode
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **State Management**: Zustand for client-side state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Auth**: Supabase Auth with JWT tokens

### Project Structure
```
app/                    # Next.js App Router pages
├── [feature]/          # Feature-based page organization
└── layout.tsx          # Root layout with providers

components/             # React components organized by feature
├── ui/                # Base UI components (shadcn/ui)
├── auth/              # Authentication components
├── courses/           # Course management components
├── simulator/         # AI simulation components
└── [feature]/         # Other feature-specific components

lib/                   # Core utilities and configuration
├── api/               # API layer abstractions
├── auth.ts           # Authentication service
├── store.ts          # Zustand state stores
├── supabase.ts       # Supabase client and types
└── utils.ts          # Utility functions

hooks/                 # Custom React hooks
```

### Key Architectural Patterns

#### State Management with Zustand
The application uses three main Zustand stores:
- `useUserStore` - User authentication and profile
- `useLearningStore` - Learning progress, courses, and gamification
- `useSimulationStore` - AI simulation sessions and conversation history

#### Authentication Flow
- Supabase Auth handles authentication with email/password
- JWT tokens stored automatically by Supabase client
- `AuthProvider` component manages auth state globally
- Protected routes check authentication status

#### Database Layer
- Supabase PostgreSQL with TypeScript types in `database.types.ts`
- Row Level Security (RLS) enabled for data protection
- API abstractions in `lib/api/` provide error handling and type safety
- Custom error types for different failure scenarios

#### Component Architecture
- Feature-based organization mirrors the app structure
- shadcn/ui provides the base component library
- Consistent error handling with custom error boundaries
- Loading states managed through Zustand stores

### Important Development Patterns

#### Error Handling
- Custom error types: `NetworkError`, `NotFoundError`, `AuthenticationError`, `ValidationError`
- Centralized error handling in API layer
- Error boundaries for component-level error recovery

#### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### Component Patterns
- Use TypeScript interfaces for all props and data structures
- Implement loading and error states for all async operations
- Follow shadcn/ui conventions for component styling
- Use Zustand stores for shared state, React state for local component state

#### Database Patterns
- All database operations go through `lib/api/` abstractions
- Use TypeScript types from `database.types.ts`
- Implement proper error handling for all database operations
- Follow Supabase naming conventions (snake_case for columns)

### Key Features to Understand

#### AI Simulation System
- Session-based conversations stored in `simulation_session` and `simulation_step` tables
- Real-time feedback and scoring system
- Conversation history managed through `useSimulationStore`

#### Gamification System
- Point-based progression with levels
- Badge system with rarity levels (common, rare, epic, legendary)
- Progress tracking per lesson and course

#### Course Management
- Hierarchical structure: Course → Module → Lesson
- Enrollment tracking with status management
- Progress tracking with scores and time spent

### Development Notes
- The application is German-focused (UI text in German)
- Uses Netlify for deployment with `netlify.toml` configuration
- Stagewise Toolbar integration for development debugging
- SEO-optimized with comprehensive metadata in layout.tsx
- Mobile-first responsive design with Tailwind CSS