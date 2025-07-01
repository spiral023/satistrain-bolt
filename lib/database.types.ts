export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user: {
        Row: {
          id: string
          email: string
          locale: string | null
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          locale?: string | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          locale?: string | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      course: {
        Row: {
          id: string
          title: string
          description: string | null
          version: string
          is_active: boolean
          difficulty_level: number
          estimated_hours: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          version?: string
          is_active?: boolean
          difficulty_level?: number
          estimated_hours?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          version?: string
          is_active?: boolean
          difficulty_level?: number
          estimated_hours?: number
          created_at?: string
          updated_at?: string
        }
      }
      module: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          order_idx: number
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          order_idx: number
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          order_idx?: number
          created_at?: string
        }
      }
      lesson: {
        Row: {
          id: string
          module_id: string
          title: string
          content_url: string | null
          content_type: string
          estimated_minutes: number
          order_idx: number
          created_at: string
        }
        Insert: {
          id?: string
          module_id: string
          title: string
          content_url?: string | null
          content_type?: string
          estimated_minutes?: number
          order_idx: number
          created_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          title?: string
          content_url?: string | null
          content_type?: string
          estimated_minutes?: number
          order_idx?: number
          created_at?: string
        }
      }
      enrollment: {
        Row: {
          user_id: string
          course_id: string
          status: 'enrolled' | 'in_progress' | 'completed' | 'paused' | 'cancelled'
          certificate_id: string | null
          enrolled_at: string
          completed_at: string | null
        }
        Insert: {
          user_id: string
          course_id: string
          status?: 'enrolled' | 'in_progress' | 'completed' | 'paused' | 'cancelled'
          certificate_id?: string | null
          enrolled_at?: string
          completed_at?: string | null
        }
        Update: {
          user_id?: string
          course_id?: string
          status?: 'enrolled' | 'in_progress' | 'completed' | 'paused' | 'cancelled'
          certificate_id?: string | null
          enrolled_at?: string
          completed_at?: string | null
        }
      }
      progress: {
        Row: {
          user_id: string
          lesson_id: string
          completed_at: string | null
          score: number | null
          time_spent_s: number
          attempts: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          lesson_id: string
          completed_at?: string | null
          score?: number | null
          time_spent_s?: number
          attempts?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          lesson_id?: string
          completed_at?: string | null
          score?: number | null
          time_spent_s?: number
          attempts?: number
          created_at?: string
          updated_at?: string
        }
      }
      badge: {
        Row: {
          id: string
          name: string
          description: string | null
          emoji: string
          points_required: number
          rarity: 'common' | 'rare' | 'epic' | 'legendary'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          emoji?: string
          points_required?: number
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          emoji?: string
          points_required?: number
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          created_at?: string
        }
      }
      badge_award: {
        Row: {
          user_id: string
          badge_id: string
          awarded_at: string
          awarded_by: string | null
        }
        Insert: {
          user_id: string
          badge_id: string
          awarded_at?: string
          awarded_by?: string | null
        }
        Update: {
          user_id?: string
          badge_id?: string
          awarded_at?: string
          awarded_by?: string | null
        }
      }
      simulation_session: {
        Row: {
          id: string
          user_id: string
          scenario_type: string
          metadata: Json
          total_score: number | null
          empathy_score: number | null
          resolution_score: number | null
          communication_score: number | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          scenario_type?: string
          metadata?: Json
          total_score?: number | null
          empathy_score?: number | null
          resolution_score?: number | null
          communication_score?: number | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          scenario_type?: string
          metadata?: Json
          total_score?: number | null
          empathy_score?: number | null
          resolution_score?: number | null
          communication_score?: number | null
          created_at?: string
          completed_at?: string | null
        }
      }
      simulation_step: {
        Row: {
          id: string
          session_id: string
          step_order: number
          user_text: string
          ai_text: string | null
          score: number | null
          feedback: Json
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          step_order: number
          user_text: string
          ai_text?: string | null
          score?: number | null
          feedback?: Json
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          step_order?: number
          user_text?: string
          ai_text?: string | null
          score?: number | null
          feedback?: Json
          created_at?: string
        }
      }
      csat_metric: {
        Row: {
          id: string
          user_id: string
          score: number
          category: string
          notes: string | null
          recorded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          score: number
          category?: string
          notes?: string | null
          recorded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          score?: number
          category?: string
          notes?: string | null
          recorded_at?: string
        }
      }
      audit_log: {
        Row: {
          id: string
          user_id: string | null
          action: string
          resource_type: string | null
          resource_id: string | null
          data: Json
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          resource_type?: string | null
          resource_id?: string | null
          data?: Json
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          resource_type?: string | null
          resource_id?: string | null
          data?: Json
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      credential_type: 'local' | 'oidc'
      enrollment_status: 'enrolled' | 'in_progress' | 'completed' | 'paused' | 'cancelled'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}