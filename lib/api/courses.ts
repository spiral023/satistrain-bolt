import { supabase } from '../supabase-client';
import { Database } from '../database.types';

type Course = Database['public']['Tables']['course']['Row'];
type Module = Database['public']['Tables']['module']['Row'];
type Lesson = Database['public']['Tables']['lesson']['Row'];
type Enrollment = Database['public']['Tables']['enrollment']['Row'];
type Progress = Database['public']['Tables']['progress']['Row'];

export type EnrollmentWithCourse = Enrollment & {
  course: Course;
};

export const coursesApi = {
  // Get all active courses
  async getCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('course')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get course with modules and lessons
  async getCourseDetails(courseId: string) {
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

    if (error) throw error;
    return data;
  },

  // Get user's enrollments
  async getUserEnrollments(userId: string): Promise<EnrollmentWithCourse[]> {
    const { data, error } = await supabase
      .from('enrollment')
      .select(`
        *,
        course (*)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  },

  // Enroll in a course
  async enrollInCourse(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('enrollment')
      .insert({
        user_id: userId,
        course_id: courseId,
        status: 'enrolled',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update enrollment status
  async updateEnrollmentStatus(
    userId: string, 
    courseId: string, 
    status: Database['public']['Enums']['enrollment_status']
  ) {
    const { data, error } = await supabase
      .from('enrollment')
      .update({ status })
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user's progress for a course
  async getCourseProgress(userId: string, courseId: string) {
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

    if (error) throw error;
    return data || [];
  },

  // Update lesson progress
  async updateLessonProgress(
    userId: string,
    lessonId: string,
    score?: number,
    timeSpent?: number
  ) {
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

    if (error) throw error;
    return data;
  },
};
