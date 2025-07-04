'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Database } from '@/lib/database.types';
import { ButtonLoading, CourseGridSkeleton } from '@/components/ui/loading-states';
import { ErrorDisplay, InlineError } from '@/components/ui/error-display';
import {
  BookOpen,
  Clock,
  Star,
  Users,
  Play,
  CheckCircle,
  AlertCircle,
  Pause,
  MoreHorizontal,
} from 'lucide-react';

type Course = Database['public']['Tables']['course']['Row'];
type Enrollment = Database['public']['Tables']['enrollment']['Row'] & {
  course: Course;
};

interface CourseGridProps {
  enrollments?: Enrollment[];
  courses?: Course[];
  type: 'enrolled' | 'available';
  onEnroll?: (courseId: string) => void;
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

const statusConfig = {
  enrolled: {
    icon: BookOpen,
    label: 'Eingeschrieben',
    color: 'bg-blue-500/10 text-blue-500',
    progress: 0,
  },
  in_progress: {
    icon: Play,
    label: 'In Bearbeitung',
    color: 'bg-orange-500/10 text-orange-500',
    progress: 45,
  },
  completed: {
    icon: CheckCircle,
    label: 'Abgeschlossen',
    color: 'bg-green-500/10 text-green-500',
    progress: 100,
  },
  paused: {
    icon: Pause,
    label: 'Pausiert',
    color: 'bg-gray-500/10 text-gray-500',
    progress: 25,
  },
  cancelled: {
    icon: AlertCircle,
    label: 'Abgebrochen',
    color: 'bg-red-500/10 text-red-500',
    progress: 0,
  },
};

const difficultyLabels = {
  1: 'Anfänger',
  2: 'Fortgeschritten',
  3: 'Experte',
  4: 'Profi',
  5: 'Meister',
};

const difficultyColors = {
  1: 'bg-green-500/10 text-green-500',
  2: 'bg-blue-500/10 text-blue-500',
  3: 'bg-yellow-500/10 text-yellow-500',
  4: 'bg-orange-500/10 text-orange-500',
  5: 'bg-red-500/10 text-red-500',
};

export function CourseGrid({ 
  enrollments, 
  courses, 
  type, 
  onEnroll, 
  loading = false,
  error = null,
  onRetry 
}: CourseGridProps) {
  const [loadingEnroll, setLoadingEnroll] = useState<string | null>(null);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  const handleEnroll = async (courseId: string) => {
    if (!onEnroll) return;
    
    setLoadingEnroll(courseId);
    setEnrollError(null);
    
    try {
      await onEnroll(courseId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Einschreibung fehlgeschlagen';
      setEnrollError(errorMessage);
    } finally {
      setLoadingEnroll(null);
    }
  };

  // Show loading skeleton
  if (loading) {
    return <CourseGridSkeleton count={type === 'enrolled' ? 3 : 6} />;
  }

  // Show error state
  if (error) {
    return (
      <div className="py-12">
        <ErrorDisplay 
          error={error} 
          onRetry={onRetry}
          className="max-w-md mx-auto"
        />
      </div>
    );
  }

  if (type === 'enrolled' && enrollments) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enrollments.map((enrollment) => {
          const status = statusConfig[enrollment.status];
          const StatusIcon = status.icon;
          
          return (
            <Card key={enrollment.course_id} className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                      {enrollment.course.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {enrollment.course.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className={status.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                  <Badge variant="outline" className={difficultyColors[enrollment.course.difficulty_level as keyof typeof difficultyColors]}>
                    {difficultyLabels[enrollment.course.difficulty_level as keyof typeof difficultyLabels]}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {enrollment.course.estimated_hours}h
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    1.2k Teilnehmer
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fortschritt</span>
                    <span>{status.progress}%</span>
                  </div>
                  <Progress value={status.progress} className="h-2" />
                </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/courses/${enrollment.course_id}`}>
                    {enrollment.status === 'completed' ? 'Wiederholen' : 'Fortsetzen'}
                  </Link>
                </Button>
                {enrollment.status === 'completed' && (
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                )}
              </div>

                {enrollment.status === 'completed' && enrollment.completed_at && (
                  <div className="text-xs text-muted-foreground">
                    Abgeschlossen am {new Date(enrollment.completed_at).toLocaleDateString('de-DE')}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  if (type === 'available' && courses) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {course.title.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className={difficultyColors[course.difficulty_level as keyof typeof difficultyColors]}>
                  {difficultyLabels[course.difficulty_level as keyof typeof difficultyLabels]}
                </Badge>
                <Badge variant="outline">
                  v{course.version}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.estimated_hours}h
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  1.2k Teilnehmer
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  4.8
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Was Sie lernen werden:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Grundlagen der Kundenkommunikation</li>
                  <li>• Empathische Gesprächsführung</li>
                  <li>• Konfliktlösung und Deeskalation</li>
                </ul>
              </div>

              <div className="space-y-2">
                {enrollError && (
                  <InlineError 
                    error={enrollError} 
                    size="sm"
                    onRetry={() => setEnrollError(null)}
                  />
                )}
                <Button 
                  onClick={() => handleEnroll(course.id)}
                  disabled={loadingEnroll === course.id}
                  className="w-full"
                >
                  <ButtonLoading 
                    isLoading={loadingEnroll === course.id}
                    loadingText="Einschreiben..."
                  >
                    Jetzt einschreiben
                  </ButtonLoading>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">
        Keine Kurse gefunden
      </h3>
      <p className="text-muted-foreground">
        {type === 'enrolled' 
          ? 'Sie sind noch in keinen Kursen eingeschrieben.'
          : 'Keine verfügbaren Kurse gefunden.'
        }
      </p>
    </div>
  );
}
