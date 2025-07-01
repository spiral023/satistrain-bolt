import { supabase } from '../supabase-client';
import { Database } from '../database.types';

type Badge = Database['public']['Tables']['badge']['Row'];
type BadgeAward = Database['public']['Tables']['badge_award']['Row'];

export const gamificationApi = {
  // Get all badges
  async getBadges(): Promise<Badge[]> {
    const { data, error } = await supabase
      .from('badge')
      .select('*')
      .order('points_required', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get user's badges
  async getUserBadges(userId: string): Promise<BadgeAward[]> {
    const { data, error } = await supabase
      .from('badge_award')
      .select(`
        *,
        badge (*)
      `)
      .eq('user_id', userId)
      .order('awarded_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Award badge to user
  async awardBadge(userId: string, badgeId: string, awardedBy?: string) {
    const { data, error } = await supabase
      .from('badge_award')
      .insert({
        user_id: userId,
        badge_id: badgeId,
        awarded_by: awardedBy,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Calculate user points based on progress and badges
  async getUserPoints(userId: string): Promise<number> {
    // Get points from completed lessons (10 points per lesson)
    const { data: progressData, error: progressError } = await supabase
      .from('progress')
      .select('score')
      .eq('user_id', userId)
      .not('completed_at', 'is', null);

    if (progressError) throw progressError;

    const progressPoints = (progressData || []).reduce((total, progress) => {
      return total + (progress.score || 0);
    }, 0);

    // Get points from badges
    const { data: badgeData, error: badgeError } = await supabase
      .from('badge_award')
      .select(`
        badge (points_required)
      `)
      .eq('user_id', userId);

    if (badgeError) throw badgeError;

    const badgePoints = (badgeData || []).reduce((total, award) => {
      return total + (award.badge?.points_required || 0);
    }, 0);

    return progressPoints + badgePoints;
  },

  // Get leaderboard
  async getLeaderboard(limit: number = 10) {
    // This would need a more complex query or a view in production
    // For now, we'll get basic user data and calculate points client-side
    const { data, error } = await supabase
      .from('user')
      .select(`
        id,
        email,
        badge_award (
          badge (points_required)
        ),
        progress (score)
      `)
      .limit(limit);

    if (error) throw error;
    return data || [];
  },
};