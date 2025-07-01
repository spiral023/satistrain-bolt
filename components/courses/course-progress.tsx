'use client';

import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Play } from 'lucide-react';

interface CourseProgressProps {
  course: any;
  progress: any[];
}

export function CourseProgress({ course, progress }: CourseProgressProps) {
  const totalLessons = course.module?.reduce((sum: number, module: any) => 
    sum + (module.lesson?.length || 0), 0) || 0;
  const completedLessons = progress.filter(p => p.completed_at).length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const totalTime = course.module?.reduce((sum: number, module: any) => 
    sum + (module.lesson?.reduce((lessonSum: number, lesson: any) => 
      lessonSum + lesson.estimated_minutes, 0) || 0), 0) || 0;
  
  const completedTime = progress.reduce((sum, p) => 
    sum + (p.lesson?.estimated_minutes || 0), 0);

  return (
    <div className="border-b border-border bg-muted/20 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">
              {completedLessons}/{totalLessons} Lektionen
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">
              {completedTime}/{totalTime} Min.
            </span>
          </div>
          
          <Badge variant="outline">
            {Math.round(progressPercentage)}% abgeschlossen
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Gesamtfortschritt</div>
            <div className="text-lg font-bold text-primary">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <Progress value={progressPercentage} className="w-32 h-2" />
        </div>
      </div>
    </div>
  );
}