import { supabase } from '../supabase-client';
import { Database } from '../database.types';

type SimulationSession = Database['public']['Tables']['simulation_session']['Row'];
type SimulationStep = Database['public']['Tables']['simulation_step']['Row'];

export const simulationsApi = {
  // Create a new simulation session
  async createSession(
    userId: string,
    scenarioType: string = 'customer_complaint',
    metadata: Record<string, any> = {}
  ): Promise<SimulationSession> {
    const { data, error } = await supabase
      .from('simulation_session')
      .insert({
        user_id: userId,
        scenario_type: scenarioType,
        metadata,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user's simulation sessions
  async getUserSessions(userId: string): Promise<SimulationSession[]> {
    const { data, error } = await supabase
      .from('simulation_session')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get session with steps
  async getSessionDetails(sessionId: string) {
    const { data, error } = await supabase
      .from('simulation_session')
      .select(`
        *,
        simulation_step (*)
      `)
      .eq('id', sessionId)
      .single();

    if (error) throw error;
    return data;
  },

  // Add a step to a simulation
  async addSimulationStep(
    sessionId: string,
    stepOrder: number,
    userText: string,
    aiText?: string,
    score?: number,
    feedback: Record<string, any> = {}
  ): Promise<SimulationStep> {
    const { data, error } = await supabase
      .from('simulation_step')
      .insert({
        session_id: sessionId,
        step_order: stepOrder,
        user_text: userText,
        ai_text: aiText,
        score,
        feedback,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Complete a simulation session
  async completeSession(
    sessionId: string,
    totalScore?: number,
    empathyScore?: number,
    resolutionScore?: number,
    communicationScore?: number
  ) {
    const { data, error } = await supabase
      .from('simulation_session')
      .update({
        completed_at: new Date().toISOString(),
        total_score: totalScore,
        empathy_score: empathyScore,
        resolution_score: resolutionScore,
        communication_score: communicationScore,
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get simulation statistics for a user
  async getUserSimulationStats(userId: string) {
    const { data, error } = await supabase
      .from('simulation_session')
      .select('total_score, empathy_score, resolution_score, communication_score, completed_at')
      .eq('user_id', userId)
      .not('completed_at', 'is', null);

    if (error) throw error;

    const sessions = data || [];
    const totalSessions = sessions.length;
    
    if (totalSessions === 0) {
      return {
        totalSessions: 0,
        averageScore: 0,
        averageEmpathy: 0,
        averageResolution: 0,
        averageCommunication: 0,
      };
    }

    const averageScore = sessions.reduce((sum, s) => sum + (s.total_score || 0), 0) / totalSessions;
    const averageEmpathy = sessions.reduce((sum, s) => sum + (s.empathy_score || 0), 0) / totalSessions;
    const averageResolution = sessions.reduce((sum, s) => sum + (s.resolution_score || 0), 0) / totalSessions;
    const averageCommunication = sessions.reduce((sum, s) => sum + (s.communication_score || 0), 0) / totalSessions;

    return {
      totalSessions,
      averageScore: Math.round(averageScore),
      averageEmpathy: Math.round(averageEmpathy),
      averageResolution: Math.round(averageResolution),
      averageCommunication: Math.round(averageCommunication),
    };
  },
};