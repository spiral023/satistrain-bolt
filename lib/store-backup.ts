import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { User, Course, Badge, SimulationSession } from './supabase';
import { LEARNING } from './constants';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

interface LearningState {
  currentCourse: Course | null;
  progress: Record<string, number>;
  totalPoints: number;
  currentLevel: number;
  badges: Badge[];
  setCurrentCourse: (course: Course | null) => void;
  updateProgress: (lessonId: string, progress: number) => void;
  addPoints: (points: number) => void;
  addBadge: (badge: Badge) => void;
}

interface SimulationState {
  currentSession: SimulationSession | null;
  isSimulationActive: boolean;
  conversationHistory: Array<{
    id: string;
    type: 'user' | 'ai';
    message: string;
    timestamp: Date;
    score?: number;
  }>;
  setCurrentSession: (session: SimulationSession | null) => void;
  setSimulationActive: (active: boolean) => void;
  addMessage: (message: {
    type: 'user' | 'ai';
    message: string;
    score?: number;
  }) => void;
  clearConversation: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export const useLearningStore = create<LearningState>((set) => ({
  currentCourse: null,
  progress: {},
  totalPoints: 0,
  currentLevel: 1,
  badges: [],
  setCurrentCourse: (course) => set({ currentCourse: course }),
  updateProgress: (lessonId, progress) => 
    set((state) => ({
      progress: { ...state.progress, [lessonId]: progress }
    })),
  addPoints: (points) => 
    set((state) => {
      if (typeof points !== 'number' || isNaN(points)) {
        console.warn('Invalid points value:', points);
        return state;
      }
      const newTotal = Math.max(0, state.totalPoints + points);
      const newLevel = Math.floor(newTotal / LEARNING.POINTS_PER_LEVEL) + 1;
      return { totalPoints: newTotal, currentLevel: newLevel };
    }),
  addBadge: (badge) => 
    set((state) => {
      const exists = state.badges.some(b => b.id === badge.id);
      if (exists) return state;
      return { badges: [...state.badges, badge] };
    }),
}));

export const useSimulationStore = create<SimulationState>((set) => ({
  currentSession: null,
  isSimulationActive: false,
  conversationHistory: [],
  setCurrentSession: (session) => set({ currentSession: session }),
  setSimulationActive: (active) => set({ isSimulationActive: active }),
  addMessage: (message) => 
    set((state) => ({
      conversationHistory: [
        ...state.conversationHistory,
        {
          id: crypto.randomUUID(),
          ...message,
          timestamp: new Date(),
        }
      ].slice(-LEARNING.MAX_CONVERSATION_HISTORY) // Limit history to prevent memory leaks
    })),
  clearConversation: () => set({ conversationHistory: [] }),
}));