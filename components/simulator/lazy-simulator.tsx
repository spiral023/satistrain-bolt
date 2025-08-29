'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Loading component for better UX
const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  );
};

// Lazy load the simulator interface with loading state
export const LazySimulatorInterface = dynamic(
  () => import('./simulator-interface').then(mod => ({ default: mod.SimulatorInterface })),
  {
    loading: () => (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-2 text-sm text-muted-foreground">Simulator wird geladen...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
    ssr: false, // Disable SSR for simulator as it's client-heavy
  }
);

// Lazy load course content
export const LazyCourseContent = dynamic(
  () => import('../courses/course-content').then(mod => ({ default: mod.CourseContent })),
  {
    loading: () => (
      <Card>
        <CardContent className="p-6">
          <LoadingSpinner size="md" />
        </CardContent>
      </Card>
    ),
  }
);

// Lazy load course grid for better performance
export const LazyCourseGrid = dynamic(
  () => import('../courses/course-grid').then(mod => ({ default: mod.CourseGrid })),
  {
    loading: () => (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-32 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    ),
  }
);

// Lazy load recommended courses
export const LazyRecommendedCourses = dynamic(
  () => import('../courses/recommended-courses').then(mod => ({ default: mod.RecommendedCourses })),
  {
    loading: () => (
      <Card>
        <CardContent className="p-6">
          <LoadingSpinner size="md" />
        </CardContent>
      </Card>
    ),
  }
);

// Note: LazyDashboardAnalytics removed as analytics-chart component doesn't exist yet
// TODO: Add back when analytics chart component is created

LazySimulatorInterface.displayName = 'LazySimulatorInterface';
LazyCourseContent.displayName = 'LazyCourseContent';
LazyCourseGrid.displayName = 'LazyCourseGrid';
LazyRecommendedCourses.displayName = 'LazyRecommendedCourses';