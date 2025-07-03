'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { LeaderboardTable } from '@/components/leaderboard/leaderboard-table';
import { LeaderboardStats } from '@/components/leaderboard/leaderboard-stats';
import { TeamCompetitions } from '@/components/leaderboard/team-competitions';
import { PersonalRanking } from '@/components/leaderboard/personal-ranking';
import { AchievementLeaders } from '@/components/leaderboard/achievement-leaders';
import { WeeklyChallenge } from '@/components/leaderboard/weekly-challenge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import {
  Trophy,
  Crown,
  Medal,
  Star,
  TrendingUp,
  Users,
  Target,
  Zap,
  Calendar,
  Filter,
  Download,
  Share,
} from 'lucide-react';

const leaderboardCategories = [
  {
    id: 'overall',
    name: 'Gesamt',
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    id: 'learning',
    name: 'Lernen',
    icon: Star,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'simulation',
    name: 'Simulationen',
    icon: Target,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 'social',
    name: 'Sozial',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
];

const timeRanges = [
  { id: 'week', label: 'Diese Woche' },
  { id: 'month', label: 'Dieser Monat' },
  { id: 'quarter', label: 'Dieses Quartal' },
  { id: 'year', label: 'Dieses Jahr' },
  { id: 'all', label: 'Alle Zeit' },
];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [userRank, setUserRank] = useState(4);
  const [totalParticipants, setTotalParticipants] = useState(24);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Rangliste & Wettbewerbe
              </h1>
              <p className="text-sm text-muted-foreground">
                Vergleichen Sie Ihre Leistung mit Ihren Teammitgliedern
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Medal className="h-3 w-3" />
                Rang {userRank} von {totalParticipants}
              </Badge>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Teilen
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Personal Ranking Overview */}
            <PersonalRanking 
              userRank={userRank}
              totalParticipants={totalParticipants}
              category={selectedCategory}
              timeRange={selectedTimeRange}
            />

            {/* Category and Time Range Selection */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {leaderboardCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="gap-2"
                  >
                    <category.icon className={`h-4 w-4 ${category.color}`} />
                    {category.name}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-2">
                {timeRanges.map((range) => (
                  <Button
                    key={range.id}
                    variant={selectedTimeRange === range.id ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeRange(range.id)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Leaderboard Stats */}
            <LeaderboardStats 
              category={selectedCategory}
              timeRange={selectedTimeRange}
            />

            {/* Main Content Tabs */}
            <Tabs defaultValue="leaderboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="leaderboard">
                  Rangliste
                </TabsTrigger>
                <TabsTrigger value="competitions">
                  Wettbewerbe
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  Top Performer
                </TabsTrigger>
                <TabsTrigger value="challenges">
                  Challenges
                </TabsTrigger>
                <TabsTrigger value="history">
                  Verlauf
                </TabsTrigger>
              </TabsList>

              <TabsContent value="leaderboard" className="space-y-6">
                <LeaderboardTable 
                  category={selectedCategory}
                  timeRange={selectedTimeRange}
                  currentUserId={user?.id}
                />
              </TabsContent>

              <TabsContent value="competitions" className="space-y-6">
                <TeamCompetitions />
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <AchievementLeaders />
              </TabsContent>

              <TabsContent value="challenges" className="space-y-6">
                <WeeklyChallenge />
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Ranking-Verlauf
                  </h3>
                  <p className="text-muted-foreground">
                    Verfolgen Sie Ihre Ranking-Entwicklung über die Zeit.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}