import { supabase } from '../supabase-client';
import { Database } from '../database.types';
import { NetworkError, NotFoundError, AuthenticationError, ValidationError } from '../error-types';

type Course = Database['public']['Tables']['course']['Row'];
type Module = Database['public']['Tables']['module']['Row'];
type Lesson = Database['public']['Tables']['lesson']['Row'];
type Enrollment = Database['public']['Tables']['enrollment']['Row'];
type Progress = Database['public']['Tables']['progress']['Row'];

export type EnrollmentWithCourse = Enrollment & {
  course: Course;
};

// Enhanced error handling utility
function handleSupabaseError(error: any): never {
  console.error('Supabase error:', error);

  // Network/connection errors
  if (error.message?.includes('fetch') || error.message?.includes('network')) {
    throw new NetworkError('Verbindung zum Server fehlgeschlagen');
  }

  // Authentication errors
  if (error.message?.includes('JWT') || error.message?.includes('auth') || error.status === 401) {
    throw new AuthenticationError('Authentifizierung fehlgeschlagen');
  }

  // Not found errors
  if (error.status === 404 || error.message?.includes('not found')) {
    throw new NotFoundError('Ressource nicht gefunden');
  }

  // Validation errors
  if (error.status === 400 || error.message?.includes('validation')) {
    throw new ValidationError(error.message || 'Ungültige Daten');
  }

  // Generic error
  throw new Error(error.message || 'Ein unbekannter Fehler ist aufgetreten');
}

export const coursesApi = {
  // Get all active courses
  async getCourses(): Promise<Course[]> {
    try {
      const { data, error } = await supabase
        .from('course')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) handleSupabaseError(error);
      return data || [];
    } catch (error) {
      if (error instanceof Error) throw error;
      handleSupabaseError(error);
    }
  },

  // Get course with modules and lessons
  async getCourseDetails(courseId: string) {
    try {
      if (!courseId) {
        throw new ValidationError('Kurs-ID ist erforderlich');
      }

      const { data, error } = await supabase
        .from('course')
        .select(`
          *,
          module (
            *,
            lesson (*)
          )
        `)
        .eq('id', courseId)
        .eq('is_active', true)
        .single();

      if (error) handleSupabaseError(error);
      if (!data) throw new NotFoundError('Kurs nicht gefunden');
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      handleSupabaseError(error);
    }
  },

  // Get user's enrollments
  async getUserEnrollments(userId: string): Promise<EnrollmentWithCourse[]> {
    try {
      if (!userId) {
        throw new ValidationError('Benutzer-ID ist erforderlich');
      }

      const { data, error } = await supabase
        .from('enrollment')
        .select(`
          *,
          course (*)
        `)
        .eq('user_id', userId);

      if (error) handleSupabaseError(error);
      return data || [];
    } catch (error) {
      if (error instanceof Error) throw error;
      handleSupabaseError(error);
    }
  },

  // Enroll in a course
  async enrollInCourse(userId: string, courseId: string) {
    try {
      if (!userId || !courseId) {
        throw new ValidationError('Benutzer-ID und Kurs-ID sind erforderlich');
      }

      // Check if already enrolled
      const { data: existing } = await supabase
        .from('enrollment')
        .select('id')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

      if (existing) {
        throw new ValidationError('Sie sind bereits in diesem Kurs eingeschrieben');
      }

      const { data, error } = await supabase
        .from('enrollment')
        .insert({
          user_id: userId,
          course_id: courseId,
          status: 'enrolled',
        })
        .select()
        .single();

      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      handleSupabaseError(error);
    }
  },

  // Update enrollment status
  async updateEnrollmentStatus(
    userId: string, 
    courseId: string, 
    status: Database['public']['Enums']['enrollment_status']
  ) {
    try {
      if (!userId || !courseId || !status) {
        throw new ValidationError('Alle Parameter sind erforderlich');
      }

      const { data, error } = await supabase
        .from('enrollment')
        .update({ status })
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .select()
        .single();

      if (error) handleSupabaseError(error);
      if (!data) throw new NotFoundError('Einschreibung nicht gefunden');
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      handleSupabaseError(error);
    }
  },

  // Get user's progress for a course
  async getCourseProgress(userId: string, courseId: string) {
    try {
      if (!userId || !courseId) {
        throw new ValidationError('Benutzer-ID und Kurs-ID sind erforderlich');
      }

      const { data, error } = await supabase
        .from('progress')
        .select(`
          *,
          lesson (
            *,
            module (
              course_id
            )
          )
        `)
        .eq('user_id', userId)
        .eq('lesson.module.course_id', courseId);

      if (error) handleSupabaseError(error);
      return data || [];
    } catch (error) {
      if (error instanceof Error) throw error;
      handleSupabaseError(error);
    }
  },

  // Update lesson progress
  async updateLessonProgress(
    userId: string,
    lessonId: string,
    score?: number,
    timeSpent?: number
  ) {
    try {
      if (!userId || !lessonId) {
        throw new ValidationError('Benutzer-ID und Lektion-ID sind erforderlich');
      }

      if (score !== undefined && (score < 0 || score > 100)) {
        throw new ValidationError('Punktzahl muss zwischen 0 und 100 liegen');
      }

      const { data, error } = await supabase
        .from('progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          completed_at: new Date().toISOString(),
          score,
          time_spent_s: timeSpent || 0,
          attempts: 1,
        })
        .select()
        .single();

      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      handleSupabaseError(error);
    }
  },
};
