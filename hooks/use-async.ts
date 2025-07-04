'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseAsyncOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  retryCount?: number;
  retryDelay?: number;
}

export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { onSuccess, onError, retryCount = 0, retryDelay = 1000 } = options;
  const retryCountRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: any[]) => {
      if (!isMountedRef.current) return;

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const data = await asyncFunction(...args);
        
        if (isMountedRef.current) {
          setState({ data, loading: false, error: null });
          onSuccess?.(data);
          retryCountRef.current = 0;
        }
        
        return data;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        
        if (isMountedRef.current) {
          if (retryCountRef.current < retryCount) {
            retryCountRef.current++;
            setTimeout(() => {
              if (isMountedRef.current) {
                execute(...args);
              }
            }, retryDelay);
          } else {
            setState({ data: null, loading: false, error: err });
            onError?.(err);
          }
        }
        
        throw err;
      }
    },
    [asyncFunction, onSuccess, onError, retryCount, retryDelay]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
    retryCountRef.current = 0;
  }, []);

  const retry = useCallback(() => {
    retryCountRef.current = 0;
    // Note: This requires the last arguments to be stored if we want to retry with same args
    // For now, it just resets the state
    reset();
  }, [reset]);

  return {
    ...state,
    execute,
    reset,
    retry,
    isIdle: !state.loading && !state.error && !state.data,
  };
}

// Hook for handling mutations (POST, PUT, DELETE operations)
export function useMutation<T, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { onSuccess, onError } = options;
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const mutate = useCallback(
    async (variables: TVariables) => {
      if (!isMountedRef.current) return;

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const data = await mutationFn(variables);
        
        if (isMountedRef.current) {
          setState({ data, loading: false, error: null });
          onSuccess?.(data);
        }
        
        return data;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        
        if (isMountedRef.current) {
          setState({ data: null, loading: false, error: err });
          onError?.(err);
        }
        
        throw err;
      }
    },
    [mutationFn, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    mutate,
    reset,
    isIdle: !state.loading && !state.error && !state.data,
  };
}

// Hook for handling queries with automatic execution
export function useQuery<T>(
  queryKey: string,
  queryFn: () => Promise<T>,
  options: UseAsyncOptions & {
    enabled?: boolean;
    refetchOnMount?: boolean;
    staleTime?: number;
  } = {}
) {
  const {
    enabled = true,
    refetchOnMount = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    ...asyncOptions
  } = options;

  const async = useAsync(queryFn, asyncOptions);
  const lastFetchRef = useRef<number>(0);

  const isStale = useCallback(() => {
    return Date.now() - lastFetchRef.current > staleTime;
  }, [staleTime]);

  const refetch = useCallback(() => {
    lastFetchRef.current = Date.now();
    return async.execute();
  }, [async]);

  useEffect(() => {
    if (enabled && (refetchOnMount || isStale())) {
      refetch();
    }
  }, [enabled, refetchOnMount, refetch, isStale]);

  return {
    ...async,
    refetch,
    isStale: isStale(),
  };
}
