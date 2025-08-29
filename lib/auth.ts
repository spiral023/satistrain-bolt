'use client';

import { supabase } from './supabase-client';
import { useUserStore } from './store';

export interface AuthUser {
  id: string;
  email: string;
  locale?: string;
  user_metadata?: {
    locale?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } finally {
      // Ensure state is cleared even if signOut fails
      try {
        useUserStore.getState().logout();
      } catch (storeError) {
        console.error('Error clearing user state:', storeError);
      }
    }
  },

  // Get current session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  // Listen to auth changes
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        callback({
          id: session.user.id,
          email: session.user.email!,
          locale: session.user.user_metadata?.locale || 'de',
        });
      } else {
        callback(null);
      }
    });
  },

  // Reset password
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) throw error;
  },

  // Update password
  async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  },
};