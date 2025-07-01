'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Trophy,
  Star,
  Target,
  Zap,
  TrendingUp,
  Award,
  Medal,
  Crown,
} from 'lucide-react';

interface AchievementStatsProps {
  totalAchievements: number;
  completedAchievements: number;
  totalPoints: number;
  currentLevel: number;
  completionRate: number;
}

export function AchievementStats({ 
  totalAchievements, 
  completedAchievements, 
  totalPoints, 
  currentLevel,
  completionRate 
}: AchievementStatsProps) {
  const pointsToNextLevel = (currentLevel * 500) - (totalPoints % 500);
  const levelProgress = ((totalPoints % 500) / 500) * 100;

  const stats = [
    {
      title: 'Erreichte Erfolge',
      value: `${completedAchievements}/${totalAchievements}`,
      description: `${completionRate}% abgeschlossen`,
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      progress: completionRate,
    },
    {
      title: 'Gesamtpunkte',
      value: totalPoints.toLocaleString(),
      description: '+125 diese Woche',
      icon: Zap,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Aktuelles Level',
      value: currentLevel.toString(),
      description: `${pointsToNextLevel} XP bis Level ${currentLevel + 1}`,
      icon: Star,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      progress: levelProgress,
    },
    {
      title: 'Seltene Abzeichen',
      value: '5',
      description: '2 episch, 1 legendär',
      icon: Crown,
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
            
            {stat.progress !== undefined && (
              <div className="mt-4">
                <Progress value={stat.progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}