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
  addMultipleMessages: (messages: Array<{
    type: 'user' | 'ai';
    message: string;
    score?: number;
  }>) => void;
  updateSessionAndAddMessage: (session: SimulationSession, message: {
    type: 'user' | 'ai';
    message: string;
    score?: number;
  }) => void;
  clearConversation: () => void;
}

// Performance-optimized user store with selectors
export const useUserStore = create<UserState>()(
  subscribeWithSelector((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setLoading: (loading) => set({ loading }),
    logout: () => set({ user: null, isAuthenticated: false }),
  }))
);

// Learning store with immer for better performance on nested updates
export const useLearningStore = create<LearningState>()(
  immer((set) => ({
    currentCourse: null,
    progress: {},
    totalPoints: 0,
    currentLevel: 1,
    badges: [],
    setCurrentCourse: (course) => set((draft) => {
      draft.currentCourse = course;
    }),
    updateProgress: (lessonId, progress) => 
      set((draft) => {
        draft.progress[lessonId] = progress;
      }),
    addPoints: (points) => 
      set((draft) => {
        if (typeof points !== 'number' || isNaN(points)) {
          console.warn('Invalid points value:', points);
          return;
        }
        draft.totalPoints = Math.max(0, draft.totalPoints + points);
        draft.currentLevel = Math.floor(draft.totalPoints / LEARNING.POINTS_PER_LEVEL) + 1;
      }),
    addBadge: (badge) => 
      set((draft) => {
        const exists = draft.badges.some(b => b.id === badge.id);
        if (!exists) {
          draft.badges.push(badge);
        }
      }),
  }))
);

// Simulation store with optimized message handling
export const useSimulationStore = create<SimulationState>()(
  immer((set) => ({
    currentSession: null,
    isSimulationActive: false,
    conversationHistory: [],
    setCurrentSession: (session) => set((draft) => {
      draft.currentSession = session;
    }),
    setSimulationActive: (active) => set((draft) => {
      draft.isSimulationActive = active;
    }),
    addMessage: (message) => 
      set((draft) => {
        const newMessage = {
          id: crypto.randomUUID(),
          ...message,
          timestamp: new Date(),
        };
        draft.conversationHistory.push(newMessage);
        
        // Efficient memory management
        if (draft.conversationHistory.length > LEARNING.MAX_CONVERSATION_HISTORY) {
          draft.conversationHistory = draft.conversationHistory.slice(-LEARNING.MAX_CONVERSATION_HISTORY);
        }
      }),
    addMultipleMessages: (messages) =>
      set((draft) => {
        const newMessages = messages.map(message => ({
          id: crypto.randomUUID(),
          ...message,
          timestamp: new Date(),
        }));
        draft.conversationHistory.push(...newMessages);
        
        // Efficient batch cleanup
        if (draft.conversationHistory.length > LEARNING.MAX_CONVERSATION_HISTORY) {
          draft.conversationHistory = draft.conversationHistory.slice(-LEARNING.MAX_CONVERSATION_HISTORY);
        }
      }),
    updateSessionAndAddMessage: (session, message) =>
      set((draft) => {
        draft.currentSession = session;
        const newMessage = {
          id: crypto.randomUUID(),
          ...message,
          timestamp: new Date(),
        };
        draft.conversationHistory.push(newMessage);
        
        if (draft.conversationHistory.length > LEARNING.MAX_CONVERSATION_HISTORY) {
          draft.conversationHistory = draft.conversationHistory.slice(-LEARNING.MAX_CONVERSATION_HISTORY);
        }
      }),
    clearConversation: () => set((draft) => {
      draft.conversationHistory = [];
    }),
  }))
);

// Optimized selectors to prevent unnecessary re-renders
export const useUserStoreSelectors = {
  user: (state: UserState) => state.user,
  isAuthenticated: (state: UserState) => state.isAuthenticated,
  loading: (state: UserState) => state.loading,
};

export const useLearningStoreSelectors = {
  currentCourse: (state: LearningState) => state.currentCourse,
  progress: (state: LearningState) => state.progress,
  totalPoints: (state: LearningState) => state.totalPoints,
  currentLevel: (state: LearningState) => state.currentLevel,
  badges: (state: LearningState) => state.badges,
};

export const useSimulationStoreSelectors = {
  currentSession: (state: SimulationState) => state.currentSession,
  isSimulationActive: (state: SimulationState) => state.isSimulationActive,
  conversationHistory: (state: SimulationState) => state.conversationHistory,
  lastMessage: (state: SimulationState) => 
    state.conversationHistory[state.conversationHistory.length - 1] || null,
  messageCount: (state: SimulationState) => state.conversationHistory.length,
};

// Helper hooks for specific user data
export const useUserAuth = () => useUserStore(useUserStoreSelectors.isAuthenticated);
export const useUserData = () => useUserStore(useUserStoreSelectors.user);
export const useUserLoading = () => useUserStore(useUserStoreSelectors.loading);

// Helper hooks for learning data
export const useLearningProgress = () => useLearningStore(useLearningStoreSelectors.progress);
export const useLearningPoints = () => useLearningStore(useLearningStoreSelectors.totalPoints);
export const useLearningLevel = () => useLearningStore(useLearningStoreSelectors.currentLevel);

// Helper hooks for simulation data
export const useSimulationActive = () => useSimulationStore(useSimulationStoreSelectors.isSimulationActive);
export const useConversationHistory = () => useSimulationStore(useSimulationStoreSelectors.conversationHistory);
export const useMessageCount = () => useSimulationStore(useSimulationStoreSelectors.messageCount);