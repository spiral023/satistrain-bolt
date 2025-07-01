'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  Users,
  Target,
  Zap,
} from 'lucide-react';

const leaderboardData = [
  {
    rank: 1,
    name: 'Sarah Schmidt',
    points: 3250,
    level: 12,
    badges: 18,
    weeklyGain: 125,
    avatar: 'SS',
    isCurrentUser: false,
  },
  {
    rank: 2,
    name: 'Michael Weber',
    points: 3100,
    level: 11,
    badges: 16,
    weeklyGain: 98,
    avatar: 'MW',
    isCurrentUser: false,
  },
  {
    rank: 3,
    name: 'Anna Müller',
    points: 2950,
    level: 11,
    badges: 15,
    weeklyGain: 87,
    avatar: 'AM',
    isCurrentUser: false,
  },
  {
    rank: 4,
    name: 'Du',
    points: 2450,
    level: 8,
    badges: 12,
    weeklyGain: 156,
    avatar: 'MM',
    isCurrentUser: true,
  },
  {
    rank: 5,
    name: 'Lisa Wagner',
    points: 2380,
    level: 8,
    badges: 11,
    weeklyGain: 76,
    avatar: 'LW',
    isCurrentUser: false,
  },
];

const teamStats = {
  totalMembers: 24,
  averageLevel: 7.2,
  totalPoints: 45680,
  topPerformer: 'Sarah Schmidt',
};

const achievements = [
  {
    title: 'Team-Champion',
    description: 'Führe dein Team zum Sieg',
    progress: 75,
    icon: Crown,
    color: 'text-yellow-500',
  },
  {
    title: 'Aufsteiger der Woche',
    description: 'Größter Punktezuwachs',
    progress: 100,
    icon: TrendingUp,
    color: 'text-green-500',
  },
  {
    title: 'Konsistenz-König',
    description: '7 Tage Top 10',
    progress: 57,
    icon: Target,
    color: 'text-blue-500',
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-orange-600" />;
    default:
      return <span className="text-lg font-bold">#{rank}</span>;
  }
};

export function LeaderboardPreview() {
  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Team-Übersicht
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {teamStats.totalMembers}
              </div>
              <p className="text-sm text-muted-foreground">Teammitglieder</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">
                {teamStats.averageLevel}
              </div>
              <p className="text-sm text-muted-foreground">Ø Level</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {teamStats.totalPoints.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Team-Punkte</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-500">
                {teamStats.topPerformer}
              </div>
              <p className="text-sm text-muted-foreground">Top Performer</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Leaderboard */}
        <div className="lg:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Team-Rangliste
                </CardTitle>
                <Button variant="outline" size="sm">
                  Vollständige Liste
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((user) => (
                  <div 
                    key={user.rank}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      user.isCurrentUser 
                        ? 'bg-primary/10 border-primary/20' 
                        : 'bg-muted/20 border-border hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8">
                          {getRankIcon(user.rank)}
                        </div>
                        
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className={`font-semibold ${
                            user.isCurrentUser ? 'text-primary' : 'text-foreground'
                          }`}>
                            {user.name}
                            {user.isCurrentUser && (
                              <Badge variant="secondary" className="ml-2">Du</Badge>
                            )}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Level {user.level}</span>
                            <span>•</span>
                            <span>{user.badges} Abzeichen</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {user.points.toLocaleString()} XP
                        </div>
                        <div className="flex items-center gap-1 text-sm text-green-500">
                          <TrendingUp className="h-3 w-3" />
                          +{user.weeklyGain} diese Woche
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competitive Achievements */}
        <div>
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Wettbewerbs-Erfolge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-muted/20">
                    <div className="flex items-center gap-3 mb-2">
                      <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                      <h4 className="font-medium">{achievement.title}</h4>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Fortschritt</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4">
                <Trophy className="h-4 w-4 mr-2" />
                Alle Wettbewerbe anzeigen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}