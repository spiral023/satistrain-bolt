'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database } from '@/lib/database.types';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Lock,
  Play,
  Star,
  Target,
} from 'lucide-react';

type Course = Database['public']['Tables']['course']['Row'];
type Enrollment = Database['public']['Tables']['enrollment']['Row'] & {
  course: Course;
};

interface LearningPathProps {
  enrollments: Enrollment[];
}

const learningPaths = [
  {
    id: 'customer-service-basics',
    title: 'Kundenservice Grundlagen',
    description: 'Perfekter Einstieg für neue Mitarbeiter',
    totalCourses: 4,
    estimatedWeeks: 6,
    difficulty: 'Anfänger',
    courses: [
      {
        id: 1,
        title: 'Grundlagen der Kundenzufriedenheit',
        status: 'completed',
        progress: 100,
      },
      {
        id: 2,
        title: 'Empathische Kommunikation',
        status: 'in_progress',
        progress: 65,
      },
      {
        id: 3,
        title: 'Konfliktlösung im Kundenservice',
        status: 'locked',
        progress: 0,
      },
      {
        id: 4,
        title: 'Fortgeschrittene Gesprächstechniken',
        status: 'locked',
        progress: 0,
      },
    ],
  },
  {
    id: 'advanced-communication',
    title: 'Fortgeschrittene Kommunikation',
    description: 'Für erfahrene Kundenservice-Mitarbeiter',
    totalCourses: 3,
    estimatedWeeks: 4,
    difficulty: 'Fortgeschritten',
    courses: [
      {
        id: 5,
        title: 'Psychologie der Kundenkommunikation',
        status: 'available',
        progress: 0,
      },
      {
        id: 6,
        title: 'Interkulturelle Kommunikation',
        status: 'locked',
        progress: 0,
      },
      {
        id: 7,
        title: 'Digitale Kundenbetreuung',
        status: 'locked',
        progress: 0,
      },
    ],
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    label: 'Abgeschlossen',
  },
  in_progress: {
    icon: Play,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    label: 'In Bearbeitung',
  },
  available: {
    icon: Target,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    label: 'Verfügbar',
  },
  locked: {
    icon: Lock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
    label: 'Gesperrt',
  },
};

export function LearningPath({ enrollments }: LearningPathProps) {
  const calculatePathProgress = (path: typeof learningPaths[0]) => {
    const totalProgress = path.courses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / path.courses.length);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Personalisierte Lernpfade</h2>
        <p className="text-muted-foreground">
          Strukturierte Lernreisen, die auf Ihre Rolle und Ziele zugeschnitten sind
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {learningPaths.map((path) => {
          const progress = calculatePathProgress(path);
          const completedCourses = path.courses.filter(c => c.status === 'completed').length;
          
          return (
            <Card key={path.id} className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-3">
                      {path.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{path.difficulty}</Badge>
                      <Badge variant="outline">
                        {completedCourses}/{path.totalCourses} Kurse
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {path.estimatedWeeks} Wochen
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{progress}%</div>
                    <div className="text-xs text-muted-foreground">Fortschritt</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {path.courses.map((course, index) => {
                    const status = statusConfig[course.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;
                    
                    return (
                      <div key={course.id} className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${status.bgColor}`}>
                          <StatusIcon className={`h-4 w-4 ${status.color}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{course.title}</h4>
                            <span className="text-sm text-muted-foreground">
                              {course.progress}%
                            </span>
                          </div>
                          {course.progress > 0 && (
                            <Progress value={course.progress} className="h-1 mt-1" />
                          )}
                        </div>
                        
                        {index < path.courses.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    {progress === 0 ? 'Pfad starten' : 'Fortsetzen'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}