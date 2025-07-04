'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { toast } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: (failureCount, error) => {
          // Don't retry on authentication errors
          if (error?.message?.includes('auth') || error?.message?.includes('JWT')) {
            return false;
          }
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: false, // Don't retry mutations by default
        onError: (error) => {
          // Show error toast for mutations
          toast.error(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
        },
      },
    },
  }));

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to monitoring service
    console.error('Global error caught:', error, errorInfo);
    
    // Show error toast
    toast.error('Ein unerwarteter Fehler ist aufgetreten');
    
    // Here you could send to error tracking service like Sentry
    // Sentry.captureException(error, { extra: errorInfo });
  };

  return (
    <ErrorBoundary onError={handleError}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="dark" 
        enableSystem={false}
        forcedTheme="dark"
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
