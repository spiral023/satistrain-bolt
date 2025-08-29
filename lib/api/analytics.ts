import { supabase } from '../supabase-client';
import { Database } from '../database.types';
import { ValidationError } from '../error-types';
import { VALIDATION, LEARNING } from '../constants';

// Enhanced error handling utility (consistent with courses.ts)
function handleSupabaseError(error: any): never {
  console.error('Supabase error:', error);
  throw new Error(error.message || 'Ein unbekannter Fehler ist aufgetreten');
}

type CSATMetric = Database['public']['Tables']['csat_metric']['Row'];

export const analyticsApi = {
  /**
   * Records a Customer Satisfaction (CSAT) metric for a user
   * @param userId - The ID of the user providing the rating
   * @param score - The CSAT score (1-5)
   * @param category - The category of feedback (default: 'general')
   * @param notes - Optional notes or comments
   * @returns Promise resolving to the created CSAT metric
   * @throws {ValidationError} When userId is missing or score is out of range
   */
  async recordCSAT(
    userId: string,
    score: number,
    category: string = LEARNING.DEFAULT_CSAT_CATEGORY,
    notes?: string
  ): Promise<CSATMetric> {
    // Input validation
    if (!userId) {
      throw new ValidationError('Benutzer-ID ist erforderlich');
    }
    if (typeof score !== 'number' || score < VALIDATION.CSAT_SCORE_MIN || score > VALIDATION.CSAT_SCORE_MAX) {
      throw new ValidationError(`Bewertung muss zwischen ${VALIDATION.CSAT_SCORE_MIN} und ${VALIDATION.CSAT_SCORE_MAX} liegen`);
    }

    const { data, error } = await (supabase
      .from('csat_metric') as any)
      .insert({
        user_id: userId,
        score,
        category,
        notes,
      })
      .select()
      .single();

    if (error) handleSupabaseError(error);
    return data;
  },

  /**
   * Retrieves all CSAT metrics for a specific user
   * @param userId - The ID of the user
   * @param category - Optional category filter
   * @returns Promise resolving to array of CSAT metrics
   */
  async getUserCSAT(userId: string, category?: string): Promise<CSATMetric[]> {
    let query = supabase
      .from('csat_metric')
      .select('*')
      .eq('user_id', userId)
      .order('recorded_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  /**
   * Gets CSAT trend data for a user over a specified time period
   * @param userId - The ID of the user
   * @param days - Number of days to look back (default: 30)
   * @returns Promise resolving to trend data ordered by date
   */
  async getCSATTrends(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('csat_metric')
      .select('score, category, recorded_at')
      .eq('user_id', userId)
      .gte('recorded_at', startDate.toISOString())
      .order('recorded_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get team CSAT overview (for managers/trainers)
  async getTeamCSATOverview() {
    const { data, error } = await supabase
      .from('csat_metric')
      .select(`
        score,
        category,
        recorded_at,
        user:user_id (email)
      `)
      .order('recorded_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    return data || [];
  },

  // Get learning analytics for a user
  async getUserLearningAnalytics(userId: string) {
    // Get course completion stats
    const { data: enrollments, error: enrollmentError } = await supabase
      .from('enrollment')
      .select(`
        status,
        enrolled_at,
        completed_at,
        course (title, estimated_hours)
      `)
      .eq('user_id', userId);

    if (enrollmentError) throw enrollmentError;

    // Get lesson progress
    const { data: progress, error: progressError } = await supabase
      .from('progress')
      .select(`
        score,
        time_spent_s,
        completed_at,
        lesson (
          title,
          estimated_minutes,
          module (
            title,
            course (title)
          )
        )
      `)
      .eq('user_id', userId)
      .not('completed_at', 'is', null);

    if (progressError) throw progressError;

    // Get simulation performance
    const { data: simulations, error: simulationError } = await supabase
      .from('simulation_session')
      .select('total_score, empathy_score, resolution_score, communication_score, completed_at')
      .eq('user_id', userId)
      .not('completed_at', 'is', null);

    if (simulationError) throw simulationError;

    return {
      enrollments: enrollments || [],
      progress: progress || [],
      simulations: simulations || [],
    };
  },
};