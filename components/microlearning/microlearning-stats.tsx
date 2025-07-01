'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Clock,
  Target,
  Zap,
  TrendingUp,
  CheckCircle,
  Calendar,
} from 'lucide-react';

interface MicroLearningStatsProps {
  completedToday: number;
  currentStreak: number;
  totalPoints: number;
}

export function MicroLearningStats({ 
  completedToday, 
  currentStreak, 
  totalPoints 
}: MicroLearningStatsProps) {
  const dailyGoal = 5;
  const progressPercentage = (completedToday / dailyGoal) * 100;

  const stats = [
    {
      title: 'Heute abgeschlossen',
      value: completedToday.toString(),
      description: `${dailyGoal - completedToday} bis zum Tagesziel`,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      progress: progressPercentage,
    },
    {
      title: 'Lernstreak',
      value: `${currentStreak} Tage`,
      description: 'Persönlicher Rekord',
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Gesammelte Punkte',
      value: totalPoints.toLocaleString(),
      description: '+45 diese Woche',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Durchschnitt/Tag',
      value: '4.2',
      description: 'Letzte 7 Tage',
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <>
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
            
            {stat.progress !== undefined && (
              <div className="mt-4">
                <Progress value={stat.progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
}