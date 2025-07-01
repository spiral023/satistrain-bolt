import { supabase } from '../supabase-client';
import { Database } from '../database.types';

type CSATMetric = Database['public']['Tables']['csat_metric']['Row'];

export const analyticsApi = {
  // Record CSAT metric
  async recordCSAT(
    userId: string,
    score: number,
    category: string = 'general',
    notes?: string
  ): Promise<CSATMetric> {
    const { data, error } = await supabase
      .from('csat_metric')
      .insert({
        user_id: userId,
        score,
        category,
        notes,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user's CSAT metrics
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

  // Get CSAT trends for a user
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