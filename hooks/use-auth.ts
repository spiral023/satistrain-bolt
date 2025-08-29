'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/lib/store';
import { authService } from '@/lib/auth';

export function useAuth() {
  const { user, isAuthenticated, loading, setUser, setLoading } = useUserStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Check for existing session with proper race condition handling
    const checkSession = async () => {
      try {
        const session = await authService.getSession();
        if (!signal.aborted) {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email!,
              locale: session.user.user_metadata?.locale || 'de',
              deleted_at: undefined,
              created_at: session.user.created_at,
              updated_at: session.user.updated_at || session.user.created_at,
            });
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    // Listen for auth changes with proper cleanup
    const { data: { subscription } } = authService.onAuthStateChange((authUser) => {
      if (!signal.aborted) {
        if (authUser?.email) {
          setUser({
            id: authUser.id,
            email: authUser.email,
            locale: authUser.user_metadata?.locale || 'de',
            deleted_at: undefined,
            created_at: authUser.created_at || new Date().toISOString(),
            updated_at: authUser.updated_at || authUser.created_at || new Date().toISOString(),
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => {
      // Comprehensive cleanup
      controller.abort();
      subscription.unsubscribe();
    };
  }, [setUser, setLoading]);

  return {
    user,
    isAuthenticated,
    loading,
    signIn: authService.signIn,
    signUp: authService.signUp,
    signOut: authService.signOut,
    resetPassword: authService.resetPassword,
  };
}
