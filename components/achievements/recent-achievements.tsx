'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Trophy,
  Star,
  Clock,
  TrendingUp,
  Target,
  Zap,
  Medal,
  Award,
  Calendar,
  BarChart3,
} from 'lucide-react';

const recentActivities = [
  {
    id: '1',
    type: 'achievement_unlocked',
    title: 'Neuer Erfolg erreicht',
    description: 'Problemlöser - 25 schwierige Kundenprobleme gelöst',
    timestamp: 'vor 2 Stunden',
    points: 200,
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    id: '2',
    type: 'badge_earned',
    title: 'Abzeichen erhalten',
    description: 'Empathie-Champion 🏆',
    timestamp: 'vor 5 Stunden',
    points: 150,
    icon: Medal,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: '3',
    type: 'level_up',
    title: 'Level aufgestiegen',
    description: 'Level 8 erreicht - Neue Features freigeschaltet',
    timestamp: 'vor 1 Tag',
    points: 100,
    icon: Star,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: '4',
    type: 'milestone_reached',
    title: 'Meilenstein erreicht',
    description: '1000 Simulationen abgeschlossen',
    timestamp: 'vor 2 Tagen',
    points: 300,
    icon: Target,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: '5',
    type: 'streak_achievement',
    title: 'Streak-Rekord',
    description: '14 Tage Lernstreak - Persönlicher Rekord',
    timestamp: 'vor 3 Tagen',
    points: 75,
    icon: Zap,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

const weeklyProgress = {
  totalPoints: 825,
  achievementsUnlocked: 3,
  badgesEarned: 2,
  levelsGained: 1,
  streakDays: 7,
};

const monthlyStats = [
  {
    label: 'Erfolge erreicht',
    value: 8,
    change: '+3',
    trend: 'up',
  },
  {
    label: 'Abzeichen gesammelt',
    value: 5,
    change: '+2',
    trend: 'up',
  },
  {
    label: 'Level aufgestiegen',
    value: 2,
    change: '+1',
    trend: 'up',
  },
  {
    label: 'Punkte verdient',
    value: 1850,
    change: '+425',
    trend: 'up',
  },
];

const upcomingGoals = [
  {
    title: 'Kommunikationsexperte',
    description: 'Erreiche 90%+ in 10 Simulationen',
    progress: 80,
    timeLeft: '3 Tage',
    reward: 200,
  },
  {
    title: 'Lernbegeisterter',
    description: 'Schließe 5 Kurse ab',
    progress: 60,
    timeLeft: '1 Woche',
    reward: 300,
  },
  {
    title: 'Streak-Meister',
    description: '30 Tage Lernstreak',
    progress: 47,
    timeLeft: '2 Wochen',
    reward: 500,
  },
];

export function RecentAchievements() {
  return (
    <div className="space-y-6">
      {/* Weekly Summary */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Diese Woche erreicht
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {weeklyProgress.totalPoints}
              </div>
              <p className="text-sm text-muted-foreground">XP verdient</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {weeklyProgress.achievementsUnlocked}
              </div>
              <p className="text-sm text-muted-foreground">Erfolge</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">
                {weeklyProgress.badgesEarned}
              </div>
              <p className="text-sm text-muted-foreground">Abzeichen</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {weeklyProgress.levelsGained}
              </div>
              <p className="text-sm text-muted-foreground">Level</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {weeklyProgress.streakDays}
              </div>
              <p className="text-sm text-muted-foreground">Streak-Tage</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Letzte Aktivitäten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
                    >
                      <div className={`p-2 rounded-full ${activity.bgColor}`}>
                        <activity.icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            +{activity.points} XP
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Stats & Upcoming Goals */}
        <div className="space-y-6">
          {/* Monthly Stats */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Monatsstatistik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                    <Badge variant="outline" className="text-green-500">
                      {stat.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Goals */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Bald erreichbar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingGoals.map((goal, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-muted/20">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {goal.timeLeft}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {goal.description}
                      </p>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{goal.progress}%</span>
                          <span>{goal.reward} XP</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                <Calendar className="h-4 w-4 mr-2" />
                Alle Ziele anzeigen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}