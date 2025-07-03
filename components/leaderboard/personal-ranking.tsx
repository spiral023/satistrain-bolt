'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  TrendingUp,
  TrendingDown,
  Medal,
  Target,
  Users,
  Zap,
  Star,
  Crown,
} from 'lucide-react';

interface PersonalRankingProps {
  userRank: number;
  totalParticipants: number;
  category: string;
  timeRange: string;
}

export function PersonalRanking({ userRank, totalParticipants, category, timeRange }: PersonalRankingProps) {
  const percentile = Math.round(((totalParticipants - userRank) / totalParticipants) * 100);
  const progressToNext = 75; // Mock progress to next rank
  const pointsToNext = 125; // Mock points needed
  
  const rankingData = {
    currentPoints: 2450,
    weeklyGain: 156,
    previousRank: 3,
    trend: userRank < 3 ? 'down' : 'up', // down means rank improved
    trendValue: Math.abs(userRank - 3),
    level: 8,
    badges: 12,
  };

  const nearbyUsers = [
    {
      rank: userRank - 1,
      name: 'Anna Müller',
      points: 2575,
      avatar: 'AM',
      gap: 125,
    },
    {
      rank: userRank,
      name: 'Du',
      points: 2450,
      avatar: 'MM',
      isCurrentUser: true,
    },
    {
      rank: userRank + 1,
      name: 'Lisa Wagner',
      points: 2380,
      avatar: 'LW',
      gap: -70,
    },
  ];

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Medal className="h-5 w-5 text-primary" />
          Deine aktuelle Position
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Ranking Display */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              #{userRank}
            </div>
            <p className="text-sm text-muted-foreground">
              von {totalParticipants} Teilnehmern
            </p>
            <Badge variant="outline" className="mt-2">
              Top {percentile}%
            </Badge>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {rankingData.currentPoints.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mb-2">Gesamtpunkte</p>
            <div className="flex items-center justify-center gap-1 text-sm">
              {rankingData.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={rankingData.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {rankingData.trend === 'up' ? '+' : '-'}{rankingData.trendValue} Plätze
              </span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">
              +{rankingData.weeklyGain}
            </div>
            <p className="text-sm text-muted-foreground">
              Punkte diese Woche
            </p>
            <Badge variant="outline" className="mt-2 text-green-500">
              Aufsteiger der Woche
            </Badge>
          </div>
        </div>

        {/* Progress to Next Rank */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Fortschritt zu Rang #{userRank - 1}</h4>
            <span className="text-sm text-muted-foreground">
              {pointsToNext} XP verbleibend
            </span>
          </div>
          <Progress value={progressToNext} className="h-3" />
          <p className="text-sm text-muted-foreground">
            Du bist {progressToNext}% des Weges zum nächsten Rang!
          </p>
        </div>

        {/* Nearby Rankings */}
        <div className="space-y-3">
          <h4 className="font-medium">Umgebung in der Rangliste</h4>
          <div className="space-y-2">
            {nearbyUsers.map((user) => (
              <div 
                key={user.rank}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  user.isCurrentUser 
                    ? 'bg-primary/20 border-primary/30' 
                    : 'bg-muted/20 border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold w-8">#{user.rank}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-sm">{user.avatar}</AvatarFallback>
                    </Avatar>
                    <span className={`font-medium ${
                      user.isCurrentUser ? 'text-primary' : 'text-foreground'
                    }`}>
                      {user.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{user.points.toLocaleString()} XP</div>
                    {user.gap && (
                      <div className={`text-sm ${
                        user.gap > 0 ? 'text-red-500' : 'text-green-500'
                      }`}>
                        {user.gap > 0 ? '+' : ''}{user.gap} XP
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-3 bg-muted/20 rounded-lg text-center">
            <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
            <div className="font-bold">Level {rankingData.level}</div>
            <p className="text-sm text-muted-foreground">Aktuelles Level</p>
          </div>
          <div className="p-3 bg-muted/20 rounded-lg text-center">
            <Crown className="h-5 w-5 text-purple-500 mx-auto mb-1" />
            <div className="font-bold">{rankingData.badges} Abzeichen</div>
            <p className="text-sm text-muted-foreground">Gesammelt</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}