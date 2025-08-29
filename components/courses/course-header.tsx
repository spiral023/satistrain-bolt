'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  Share,
  MoreHorizontal,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/database.types';

// Proper TypeScript interfaces
type Course = Database['public']['Tables']['course']['Row'] & {
  module?: Array<{
    id: string;
    title: string;
    lesson?: Array<{
      id: string;
      title: string;
    }>;
  }>;
};

type Enrollment = Database['public']['Tables']['enrollment']['Row'];
type Progress = Database['public']['Tables']['progress']['Row'];

interface CourseHeaderProps {
  course: Course;
  enrollment: Enrollment;
  progress: Progress[];
}

/**
 * Optimized CourseHeader component with memoized calculations
 * Prevents unnecessary re-renders when parent state changes
 */
export const CourseHeader = React.memo<CourseHeaderProps>(({ course, enrollment, progress }) => {
  const router = useRouter();
  
  // Memoize expensive calculations
  const { totalLessons, completedLessons, progressPercentage } = React.useMemo(() => {
    const total = course.module?.reduce((sum: number, module) => 
      sum + (module.lesson?.length || 0), 0) || 0;
    const completed = progress.filter(p => p.completed_at).length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    
    return {
      totalLessons: total,
      completedLessons: completed,
      progressPercentage: percentage,
    };
  }, [course.module, progress]);
  
  // Memoize status badge text
  const enrollmentStatus = React.useMemo(() => {
    return enrollment.status === 'completed' ? 'Abgeschlossen' : 'In Bearbeitung';
  }, [enrollment.status]);

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/courses')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zu den Kursen
            </Button>
            
            <div className="h-6 w-px bg-border" />
            
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {enrollmentStatus}
              </Badge>
              <Badge variant="outline">
                v{course.version}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {course.title}
            </h1>
            <p className="text-muted-foreground mb-4">
              {course.description}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {totalLessons} Lektionen
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.estimated_hours}h geschätzt
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                1.2k Teilnehmer
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                4.8 Bewertung
              </div>
            </div>
          </div>
          
          <div className="text-right min-w-[200px]">
            <div className="text-2xl font-bold text-primary mb-1">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              {completedLessons} von {totalLessons} Lektionen
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>
    </header>
  );
});

CourseHeader.displayName = 'CourseHeader';