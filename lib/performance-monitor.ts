/**
 * Performance monitoring utilities for React components and API calls
 */

import React from 'react';

// Define MemoryInfo interface for browser memory API
interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface PerformanceEntry {
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private measurements: PerformanceEntry[] = [];
  private timers: Map<string, number> = new Map();
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start a performance measurement
   */
  start(name: string, metadata?: Record<string, any>): void {
    const startTime = performance.now();
    this.timers.set(name, startTime);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Performance: Started measuring "${name}"`, metadata);
    }
  }

  /**
   * End a performance measurement
   */
  end(name: string): PerformanceEntry | null {
    const endTime = performance.now();
    const startTime = this.timers.get(name);
    
    if (!startTime) {
      console.warn(`⚠️ Performance: No start time found for "${name}"`);
      return null;
    }
    
    const entry: PerformanceEntry = {
      name,
      startTime,
      endTime,
      duration: endTime - startTime,
    };
    
    this.measurements.push(entry);
    this.timers.delete(name);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ Performance: "${name}" took ${entry.duration.toFixed(2)}ms`);
    }
    
    return entry;
  }

  /**
   * Measure an async function
   */
  async measure<T>(name: string, fn: () => Promise<T>, metadata?: Record<string, any>): Promise<T> {
    this.start(name, metadata);
    try {
      const result = await fn();
      return result;
    } finally {
      this.end(name);
    }
  }

  /**
   * Measure a synchronous function
   */
  measureSync<T>(name: string, fn: () => T, metadata?: Record<string, any>): T {
    this.start(name, metadata);
    try {
      const result = fn();
      return result;
    } finally {
      this.end(name);
    }
  }

  /**
   * Get all measurements
   */
  getMeasurements(): PerformanceEntry[] {
    return [...this.measurements];
  }

  /**
   * Get measurements by pattern
   */
  getMeasurementsByPattern(pattern: RegExp): PerformanceEntry[] {
    return this.measurements.filter(entry => pattern.test(entry.name));
  }

  /**
   * Get average duration for measurements matching a pattern
   */
  getAverageDuration(pattern: RegExp): number {
    const matching = this.getMeasurementsByPattern(pattern);
    if (matching.length === 0) return 0;
    
    const total = matching.reduce((sum, entry) => sum + entry.duration, 0);
    return total / matching.length;
  }

  /**
   * Clear all measurements
   */
  clear(): void {
    this.measurements = [];
    this.timers.clear();
  }

  /**
   * Generate performance report
   */
  generateReport(): string {
    if (this.measurements.length === 0) {
      return 'No performance measurements recorded.';
    }

    const grouped = this.measurements.reduce((acc, entry) => {
      const key = entry.name.split(':')[0]; // Group by prefix
      if (!acc[key]) acc[key] = [];
      acc[key].push(entry);
      return acc;
    }, {} as Record<string, PerformanceEntry[]>);

    let report = '📊 Performance Report\n';
    report += '=' .repeat(50) + '\n\n';

    Object.entries(grouped).forEach(([category, entries]) => {
      const total = entries.reduce((sum, e) => sum + e.duration, 0);
      const avg = total / entries.length;
      const min = Math.min(...entries.map(e => e.duration));
      const max = Math.max(...entries.map(e => e.duration));

      report += `${category.toUpperCase()}\n`;
      report += `-`.repeat(20) + '\n';
      report += `Count: ${entries.length}\n`;
      report += `Total: ${total.toFixed(2)}ms\n`;
      report += `Average: ${avg.toFixed(2)}ms\n`;
      report += `Min: ${min.toFixed(2)}ms\n`;
      report += `Max: ${max.toFixed(2)}ms\n\n`;
    });

    return report;
  }

  /**
   * Log performance report to console
   */
  logReport(): void {
    console.log(this.generateReport());
  }
}

// Create singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// React Hook for component performance monitoring
export function usePerformanceMonitor(componentName: string) {
  const monitor = PerformanceMonitor.getInstance();
  
  return {
    startMeasure: (operationName: string, metadata?: Record<string, any>) => {
      monitor.start(`${componentName}:${operationName}`, metadata);
    },
    endMeasure: (operationName: string) => {
      return monitor.end(`${componentName}:${operationName}`);
    },
    measure: <T>(operationName: string, fn: () => Promise<T>) => {
      return monitor.measure(`${componentName}:${operationName}`, fn);
    },
    measureSync: <T>(operationName: string, fn: () => T) => {
      return monitor.measureSync(`${componentName}:${operationName}`, fn);
    }
  };
}

// HOC for automatic component render performance monitoring
export function withPerformanceMonitoring<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>,
  componentName?: string
) {
  const displayName = componentName || WrappedComponent.displayName || WrappedComponent.name || 'Component';
  
  const MonitoredComponent = (props: T) => {
    const monitor = usePerformanceMonitor(displayName);
    
    React.useEffect(() => {
      monitor.startMeasure('render');
      return () => {
        monitor.endMeasure('render');
      };
    });

    return React.createElement(WrappedComponent, props);
  };

  MonitoredComponent.displayName = `withPerformanceMonitoring(${displayName})`;
  
  return MonitoredComponent;
}

// Performance measurement decorator for API calls
export function withAPIPerformanceTracking<T extends (...args: any[]) => Promise<any>>(
  apiFunction: T,
  functionName: string
): T {
  return (async (...args: any[]) => {
    const monitor = PerformanceMonitor.getInstance();
    return await monitor.measure(`API:${functionName}`, () => apiFunction(...args));
  }) as T;
}

// Bundle size analysis utilities
export const bundleAnalysis = {
  /**
   * Get estimated component bundle size impact
   */
  getComponentBundleImpact: (componentName: string): Promise<number> => {
    // This would need to be implemented with actual bundle analysis
    // For now, return a placeholder
    return Promise.resolve(0);
  },

  /**
   * Check for unused exports in modules
   */
  checkUnusedExports: (): Promise<string[]> => {
    // This would need to be implemented with actual static analysis
    return Promise.resolve([]);
  }
};

// Memory usage monitoring (client-side only)
export const memoryMonitor = {
  getCurrentUsage: (): MemoryInfo | null => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      return (performance as any).memory as MemoryInfo;
    }
    return null;
  },

  startMemoryTracking: (interval: number = 5000) => {
    if (typeof window === 'undefined') return null;
    
    const measurements: MemoryInfo[] = [];
    
    const trackMemory = () => {
      const usage = memoryMonitor.getCurrentUsage();
      if (usage) {
        measurements.push(usage);
        
        // Keep only last 100 measurements to prevent memory leaks
        if (measurements.length > 100) {
          measurements.shift();
        }
      }
    };
    
    const intervalId = setInterval(trackMemory, interval);
    
    return {
      stop: () => clearInterval(intervalId),
      getMeasurements: () => [...measurements],
      getCurrentStats: () => {
        if (measurements.length === 0) return null;
        
        const latest = measurements[measurements.length - 1];
        const oldest = measurements[0];
        
        return {
          current: latest,
          growth: latest.usedJSHeapSize - oldest.usedJSHeapSize,
          measurements: measurements.length
        };
      }
    };
  }
};

export type { PerformanceEntry };
export default performanceMonitor;