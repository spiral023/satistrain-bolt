'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronUp,
  ChevronDown,
  Users,
  Zap,
  Target,
} from 'lucide-react';

interface LeaderboardTableProps {
  category: string;
  timeRange: string;
  currentUserId?: string;
}

const leaderboardData = [
  {
    rank: 1,
    previousRank: 2,
    name: 'Sarah Schmidt',
    email: 'sarah.schmidt@company.com',
    department: 'Kundenservice',
    totalPoints: 3250,
    weeklyPoints: 425,
    level: 12,
    badges: 18,
    coursesCompleted: 8,
    simulationsCompleted: 45,
    averageScore: 94,
    streak: 21,
    avatar: 'SS',
    isCurrentUser: false,
    trend: 'up',
    trendValue: 1,
  },
  {
    rank: 2,
    previousRank: 1,
    name: 'Michael Weber',
    email: 'michael.weber@company.com',
    department: 'Support',
    totalPoints: 3100,
    weeklyPoints: 298,
    level: 11,
    badges: 16,
    coursesCompleted: 7,
    simulationsCompleted: 42,
    averageScore: 91,
    streak: 14,
    avatar: 'MW',
    isCurrentUser: false,
    trend: 'down',
    trendValue: -1,
  },
  {
    rank: 3,
    previousRank: 4,
    name: 'Anna Müller',
    email: 'anna.mueller@company.com',
    department: 'Vertrieb',
    totalPoints: 2950,
    weeklyPoints: 387,
    level: 11,
    badges: 15,
    coursesCompleted: 6,
    simulationsCompleted: 38,
    averageScore: 89,
    streak: 18,
    avatar: 'AM',
    isCurrentUser: false,
    trend: 'up',
    trendValue: 1,
  },
  {
    rank: 4,
    previousRank: 3,
    name: 'Max Mustermann',
    email: 'max.mustermann@company.com',
    department: 'Kundenservice',
    totalPoints: 2450,
    weeklyPoints: 356,
    level: 8,
    badges: 12,
    coursesCompleted: 5,
    simulationsCompleted: 32,
    averageScore: 87,
    streak: 7,
    avatar: 'MM',
    isCurrentUser: true,
    trend: 'down',
    trendValue: -1,
  },
  {
    rank: 5,
    previousRank: 6,
    name: 'Lisa Wagner',
    email: 'lisa.wagner@company.com',
    department: 'Support',
    totalPoints: 2380,
    weeklyPoints: 276,
    level: 8,
    badges: 11,
    coursesCompleted: 5,
    simulationsCompleted: 29,
    averageScore: 85,
    streak: 12,
    avatar: 'LW',
    isCurrentUser: false,
    trend: 'up',
    trendValue: 1,
  },
  {
    rank: 6,
    previousRank: 5,
    name: 'Thomas Klein',
    email: 'thomas.klein@company.com',
    department: 'Vertrieb',
    totalPoints: 2250,
    weeklyPoints: 234,
    level: 7,
    badges: 10,
    coursesCompleted: 4,
    simulationsCompleted: 26,
    averageScore: 83,
    streak: 5,
    avatar: 'TK',
    isCurrentUser: false,
    trend: 'down',
    trendValue: -1,
  },
  {
    rank: 7,
    previousRank: 8,
    name: 'Julia Becker',
    email: 'julia.becker@company.com',
    department: 'Kundenservice',
    totalPoints: 2180,
    weeklyPoints: 312,
    level: 7,
    badges: 9,
    coursesCompleted: 4,
    simulationsCompleted: 24,
    averageScore: 86,
    streak: 9,
    avatar: 'JB',
    isCurrentUser: false,
    trend: 'up',
    trendValue: 1,
  },
  {
    rank: 8,
    previousRank: 7,
    name: 'David Fischer',
    email: 'david.fischer@company.com',
    department: 'Support',
    totalPoints: 2050,
    weeklyPoints: 198,
    level: 6,
    badges: 8,
    coursesCompleted: 3,
    simulationsCompleted: 22,
    averageScore: 81,
    streak: 3,
    avatar: 'DF',
    isCurrentUser: false,
    trend: 'down',
    trendValue: -1,
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

const getTrendIcon = (trend: string, value: number) => {
  if (trend === 'up') {
    return <ChevronUp className="h-4 w-4 text-green-500" />;
  } else if (trend === 'down') {
    return <ChevronDown className="h-4 w-4 text-red-500" />;
  }
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

export function LeaderboardTable({ category, timeRange, currentUserId }: LeaderboardTableProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top 3 Performer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {leaderboardData.slice(0, 3).map((user, index) => (
              <div key={user.rank} className="text-center">
                <div className="relative mb-4">
                  <Avatar className={`h-16 w-16 mx-auto ${
                    index === 0 ? 'ring-4 ring-yellow-500' :
                    index === 1 ? 'ring-4 ring-gray-400' :
                    'ring-4 ring-orange-600'
                  }`}>
                    <AvatarFallback className="text-lg font-bold">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(user.rank)}
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{user.department}</p>
                
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">
                    {user.totalPoints.toLocaleString()} XP
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Level {user.level} • {user.badges} Abzeichen
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    +{user.weeklyPoints} diese Woche
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Vollständige Rangliste</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Weniger Details' : 'Mehr Details'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboardData.map((user) => (
              <div 
                key={user.rank}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  user.isCurrentUser 
                    ? 'bg-primary/10 border-primary/20 ring-2 ring-primary/20' 
                    : 'bg-muted/20 border-border hover:bg-muted/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Rank and Trend */}
                    <div className="flex items-center gap-2 min-w-[60px]">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(user.rank)}
                      </div>
                      <div className="flex flex-col items-center">
                        {getTrendIcon(user.trend, user.trendValue)}
                        <span className="text-xs text-muted-foreground">
                          {Math.abs(user.trendValue)}
                        </span>
                      </div>
                    </div>
                    
                    {/* User Info */}
                    <div className="flex items-center gap-3">
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
                          <span>{user.department}</span>
                          <span>•</span>
                          <span>Level {user.level}</span>
                          <span>•</span>
                          <span>{user.badges} Abzeichen</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Points and Stats */}
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {user.totalPoints.toLocaleString()} XP
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      +{user.weeklyPoints} diese Woche
                    </div>
                  </div>
                </div>

                {/* Detailed Stats */}
                {showDetails && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-500">
                          {user.coursesCompleted}
                        </div>
                        <p className="text-xs text-muted-foreground">Kurse</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-500">
                          {user.simulationsCompleted}
                        </div>
                        <p className="text-xs text-muted-foreground">Simulationen</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-500">
                          {user.averageScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">Ø Bewertung</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-500">
                          {user.streak}
                        </div>
                        <p className="text-xs text-muted-foreground">Streak-Tage</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}