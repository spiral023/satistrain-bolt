'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Database } from '@/lib/database.types';
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

type Course = Database['public']['Tables']['course']['Row'];
type Enrollment = Database['public']['Tables']['enrollment']['Row'] & {
  course: Course;
};

interface EnrollmentStatsProps {
  enrollments: Enrollment[];
}

export function EnrollmentStats({ enrollments }: EnrollmentStatsProps) {
  const totalEnrollments = enrollments.length;
  const completedCourses = enrollments.filter(e => e.status === 'completed').length;
  const inProgressCourses = enrollments.filter(e => e.status === 'in_progress').length;
  const totalHours = enrollments.reduce((sum, e) => sum + e.course.estimated_hours, 0);
  const completedHours = enrollments
    .filter(e => e.status === 'completed')
    .reduce((sum, e) => sum + e.course.estimated_hours, 0);

  const completionRate = totalEnrollments > 0 ? (completedCourses / totalEnrollments) * 100 : 0;
  const progressRate = totalHours > 0 ? (completedHours / totalHours) * 100 : 0;

  const stats = [
    {
      title: 'Eingeschriebene Kurse',
      value: totalEnrollments.toString(),
      description: `${inProgressCourses} in Bearbeitung`,
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Abgeschlossene Kurse',
      value: completedCourses.toString(),
      description: `${completionRate.toFixed(0)}% Abschlussrate`,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Lernstunden',
      value: `${completedHours}h`,
      description: `von ${totalHours}h gesamt`,
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Fortschritt',
      value: `${progressRate.toFixed(0)}%`,
      description: 'Gesamtfortschritt',
      icon: Target,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            
            {stat.title === 'Fortschritt' && (
              <div className="mt-4">
                <Progress value={progressRate} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}