/**
 * Utility functions for API operations and error handling
 */

/**
 * Configuration for retry operations
 */
export interface RetryConfig {
  /** Maximum number of retry attempts */
  maxAttempts: number;
  /** Initial delay between retries in milliseconds */
  initialDelay: number;
  /** Multiplier for exponential backoff */
  backoffMultiplier: number;
  /** Maximum delay between retries in milliseconds */
  maxDelay: number;
  /** Function to determine if error should trigger a retry */
  shouldRetry: (error: Error) => boolean;
}

/**
 * Default retry configuration
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelay: 1000,
  backoffMultiplier: 2,
  maxDelay: 10000,
  shouldRetry: (error: Error) => {
    // Retry on network errors, timeout errors, and 5xx server errors
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('fetch') ||
      message.includes('5') // 5xx server errors
    );
  },
};

/**
 * Performs an operation with retry logic and exponential backoff
 * @param operation - The async operation to perform
 * @param config - Retry configuration (optional)
 * @returns Promise resolving to the operation result
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const finalConfig: RetryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: Error;
  let delay = finalConfig.initialDelay;

  for (let attempt = 1; attempt <= finalConfig.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry if this is the last attempt or if error shouldn't trigger retry
      if (attempt === finalConfig.maxAttempts || !finalConfig.shouldRetry(lastError)) {
        throw lastError;
      }

      // Wait before retrying
      await sleep(delay);
      
      // Increase delay for next attempt (exponential backoff)
      delay = Math.min(delay * finalConfig.backoffMultiplier, finalConfig.maxDelay);
    }
  }

  throw lastError!;
}

/**
 * Creates a debounced version of an async function
 * @param func - The async function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number
): T {
  let timeoutId: NodeJS.Timeout | null = null;
  let resolve: ((value: any) => void) | null = null;
  let reject: ((reason: any) => void) | null = null;

  return ((...args: Parameters<T>) => {
    return new Promise((res, rej) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      resolve = res;
      reject = rej;

      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve?.(result);
        } catch (error) {
          reject?.(error);
        }
      }, delay);
    });
  }) as T;
}

/**
 * Creates a throttled version of an async function
 * @param func - The async function to throttle
 * @param delay - Minimum delay between calls in milliseconds
 * @returns Throttled function
 */
export function throttleAsync<T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number
): T {
  let isThrottled = false;
  let lastArgs: Parameters<T>;
  let shouldRunAgain = false;

  return ((...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>(async (resolve, reject) => {
      if (isThrottled) {
        lastArgs = args;
        shouldRunAgain = true;
        return;
      }

      isThrottled = true;
      
      try {
        const result = await func(...args);
        resolve(result);
      } catch (error) {
        reject(error);
      }

      setTimeout(() => {
        isThrottled = false;
        
        if (shouldRunAgain) {
          shouldRunAgain = false;
          // Re-run with the latest arguments
          (func as any)(...lastArgs).then(resolve).catch(reject);
        }
      }, delay);
    });
  }) as T;
}

/**
 * Utility to sleep for a specified duration
 * @param ms - Duration in milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Creates an AbortController that automatically times out
 * @param timeoutMs - Timeout duration in milliseconds
 * @returns AbortController instance
 */
export function createTimeoutController(timeoutMs: number): AbortController {
  const controller = new AbortController();
  
  setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  
  return controller;
}

/**
 * Batch API requests to reduce server load
 * @param requests - Array of request functions
 * @param batchSize - Number of requests to process concurrently
 * @returns Promise resolving to array of results
 */
export async function batchRequests<T>(
  requests: (() => Promise<T>)[],
  batchSize: number = 5
): Promise<T[]> {
  const results: T[] = [];
  
  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(batch.map(req => req()));
    
    for (const result of batchResults) {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        throw result.reason;
      }
    }
  }
  
  return results;
}

/**
 * Performance monitoring utility
 */
export class PerformanceMonitor {
  private static timers = new Map<string, number>();
  
  /**
   * Start timing an operation
   * @param name - Unique name for the operation
   */
  static start(name: string): void {
    this.timers.set(name, performance.now());
  }
  
  /**
   * End timing and log the result
   * @param name - Name of the operation
   * @returns Duration in milliseconds
   */
  static end(name: string): number {
    const startTime = this.timers.get(name);
    if (!startTime) {
      console.warn(`No start time found for operation: ${name}`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.timers.delete(name);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }
  
  /**
   * Measure the performance of an async operation
   * @param name - Name for the operation
   * @param operation - The operation to measure
   * @returns Result of the operation
   */
  static async measure<T>(name: string, operation: () => Promise<T>): Promise<T> {
    this.start(name);
    try {
      const result = await operation();
      this.end(name);
      return result;
    } catch (error) {
      this.end(name);
      throw error;
    }
  }
}