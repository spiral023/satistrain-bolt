'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Target,
  Calendar,
  Flame,
  Trophy,
  CheckCircle,
} from 'lucide-react';

interface LearningStreakProps {
  streak: number;
}

const streakMilestones = [
  { days: 3, reward: '🔥 Feuer-Starter', unlocked: true },
  { days: 7, reward: '⚡ Woche-Warrior', unlocked: true },
  { days: 14, reward: '🚀 Zwei-Wochen-Held', unlocked: false },
  { days: 30, reward: '👑 Monats-Meister', unlocked: false },
  { days: 100, reward: '🏆 Jahrhundert-Champion', unlocked: false },
];

const weeklyActivity = [
  { day: 'Mo', completed: true },
  { day: 'Di', completed: true },
  { day: 'Mi', completed: true },
  { day: 'Do', completed: true },
  { day: 'Fr', completed: true },
  { day: 'Sa', completed: true },
  { day: 'So', completed: true },
];

export function LearningStreak({ streak }: LearningStreakProps) {
  const nextMilestone = streakMilestones.find(m => !m.unlocked);
  const daysToNext = nextMilestone ? nextMilestone.days - streak : 0;

  return (
    <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Lernstreak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Streak */}
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-500 mb-2">
            {streak}
          </div>
          <p className="text-sm text-muted-foreground">
            Tage in Folge
          </p>
          <Badge variant="outline" className="mt-2">
            Persönlicher Rekord
          </Badge>
        </div>

        {/* Weekly Activity */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Diese Woche</h4>
          <div className="flex justify-between gap-1">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  day.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {day.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    day.day
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Milestone */}
        {nextMilestone && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Nächster Meilenstein</h4>
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {nextMilestone.reward}
                </span>
                <Badge variant="outline" className="text-xs">
                  {nextMilestone.days} Tage
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Noch {daysToNext} Tage bis zur Belohnung
              </p>
            </div>
          </div>
        )}

        {/* Unlocked Achievements */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Errungenschaften</h4>
          <div className="space-y-2">
            {streakMilestones.filter(m => m.unlocked).map((milestone) => (
              <div key={milestone.days} className="flex items-center gap-2 text-sm">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span>{milestone.reward}</span>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full">
          <Calendar className="h-4 w-4 mr-2" />
          Streak-Kalender anzeigen
        </Button>
      </CardContent>
    </Card>
  );
}