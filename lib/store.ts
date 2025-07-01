import { create } from 'zustand';
import { User, Course, Badge, SimulationSession } from './supabase';

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
      const newTotal = state.totalPoints + points;
      const newLevel = Math.floor(newTotal / 100) + 1;
      return { totalPoints: newTotal, currentLevel: newLevel };
    }),
  addBadge: (badge) => 
    set((state) => ({ badges: [...state.badges, badge] })),
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
          id: Date.now().toString(),
          ...message,
          timestamp: new Date(),
        }
      ]
    })),
  clearConversation: () => set({ conversationHistory: [] }),
}));