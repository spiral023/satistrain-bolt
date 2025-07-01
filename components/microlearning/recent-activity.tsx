'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Clock,
  CheckCircle,
  Star,
  Repeat,
  TrendingUp,
  Calendar,
  Zap,
} from 'lucide-react';

const recentActivities = [
  {
    id: '1',
    title: 'Aktives Zuhören in 3 Minuten',
    type: 'completed',
    timestamp: 'vor 2 Stunden',
    score: 95,
    points: 15,
    duration: 3,
  },
  {
    id: '2',
    title: 'Empathie-Boost: Kundenperspektive',
    type: 'completed',
    timestamp: 'vor 4 Stunden',
    score: 88,
    points: 20,
    duration: 4,
  },
  {
    id: '3',
    title: 'Deeskalation in 60 Sekunden',
    type: 'started',
    timestamp: 'gestern',
    progress: 60,
    duration: 2,
  },
  {
    id: '4',
    title: 'Positive Sprache verwenden',
    type: 'completed',
    timestamp: 'vor 2 Tagen',
    score: 92,
    points: 15,
    duration: 3,
  },
  {
    id: '5',
    title: 'Schwierige Fragen meistern',
    type: 'completed',
    timestamp: 'vor 3 Tagen',
    score: 85,
    points: 20,
    duration: 4,
  },
];

const weeklyStats = {
  totalCompleted: 12,
  totalTime: 38,
  averageScore: 91,
  pointsEarned: 185,
};

const achievements = [
  {
    title: 'Streak-Meister',
    description: '7 Tage in Folge gelernt',
    earned: 'vor 1 Tag',
    icon: '🔥',
  },
  {
    title: 'Schnell-Lerner',
    description: '10 Mikro-Lerneinheiten abgeschlossen',
    earned: 'vor 3 Tagen',
    icon: '⚡',
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-6">
      {/* Weekly Summary */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Wöchentliche Zusammenfassung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {weeklyStats.totalCompleted}
              </div>
              <p className="text-sm text-muted-foreground">Abgeschlossen</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {weeklyStats.totalTime}m
              </div>
              <p className="text-sm text-muted-foreground">Lernzeit</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {weeklyStats.averageScore}%
              </div>
              <p className="text-sm text-muted-foreground">Ø Bewertung</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {weeklyStats.pointsEarned}
              </div>
              <p className="text-sm text-muted-foreground">XP verdient</p>
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
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'completed' 
                            ? 'bg-green-500/10' 
                            : 'bg-blue-500/10'
                        }`}>
                          {activity.type === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <p className="font-medium">{activity.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{activity.timestamp}</span>
                            <span>•</span>
                            <span>{activity.duration} Min.</span>
                            {activity.score && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500" />
                                  {activity.score}%
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {activity.points && (
                          <Badge variant="outline" className="gap-1">
                            <Zap className="h-3 w-3" />
                            {activity.points} XP
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <Repeat className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <div>
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Neue Erfolge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="space-y-1">
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.earned}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  Alle Erfolge anzeigen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}