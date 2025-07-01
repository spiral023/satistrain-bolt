'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/lib/store';
import { authService } from '@/lib/auth';

export function useAuth() {
  const { user, isAuthenticated, loading, setUser, setLoading } = useUserStore();

  useEffect(() => {
    let mounted = true;

    // Check for existing session
    const checkSession = async () => {
      try {
        const session = await authService.getSession();
        if (mounted) {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email!,
              locale: session.user.user_metadata?.locale || 'de',
              deleted_at: null,
              created_at: session.user.created_at,
              updated_at: session.user.updated_at || session.user.created_at,
            });
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((authUser) => {
      if (mounted) {
        if (authUser) {
          setUser({
            id: authUser.id,
            email: authUser.email,
            locale: authUser.locale || 'de',
            deleted_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
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