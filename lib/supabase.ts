import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Fehlende Supabase Umgebungsvariablen: NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY sind erforderlich');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types für die Datenbank
export interface User {
  id: string;
  email: string;
  locale?: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  version: string;
  is_active: boolean;
  difficulty_level: number;
  estimated_hours: number;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_idx: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content_url?: string;
  content_type: string;
  estimated_minutes: number;
  order_idx: number;
  created_at: string;
}

export interface Enrollment {
  user_id: string;
  course_id: string;
  status: 'enrolled' | 'in_progress' | 'completed' | 'paused' | 'cancelled';
  certificate_id?: string;
  enrolled_at: string;
  completed_at?: string;
}

export interface Progress {
  user_id: string;
  lesson_id: string;
  completed_at?: string;
  score?: number;
  time_spent_s: number;
  attempts: number;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description?: string;
  emoji: string;
  points_required: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  created_at: string;
}

export interface BadgeAward {
  user_id: string;
  badge_id: string;
  awarded_at: string;
  awarded_by?: string;
}

export interface SimulationSession {
  id: string;
  user_id: string;
  scenario_type: string;
  metadata: Record<string, any>;
  total_score?: number;
  empathy_score?: number;
  resolution_score?: number;
  communication_score?: number;
  created_at: string;
  completed_at?: string;
}

export interface SimulationStep {
  id: string;
  session_id: string;
  step_order: number;
  user_text: string;
  ai_text?: string;
  score?: number;
  feedback: Record<string, any>;
  created_at: string;
}

export interface CSATMetric {
  id: string;
  user_id: string;
  score: number;
  category: string;
  notes?: string;
  recorded_at: string;
}