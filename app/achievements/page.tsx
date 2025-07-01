'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { AchievementGrid } from '@/components/achievements/achievement-grid';
import { AchievementStats } from '@/components/achievements/achievement-stats';
import { BadgeCollection } from '@/components/achievements/badge-collection';
import { ProgressMilestones } from '@/components/achievements/progress-milestones';
import { LeaderboardPreview } from '@/components/achievements/leaderboard-preview';
import { RecentAchievements } from '@/components/achievements/recent-achievements';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import {
  Trophy,
  Star,
  Target,
  Crown,
  Zap,
  Medal,
  Award,
  TrendingUp,
  Filter,
  Share,
  Download,
} from 'lucide-react';

const achievementCategories = [
  {
    id: 'learning',
    name: 'Lernen',
    icon: Star,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    count: 12,
    completed: 8,
  },
  {
    id: 'simulation',
    name: 'Simulationen',
    icon: Target,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    count: 8,
    completed: 5,
  },
  {
    id: 'social',
    name: 'Sozial',
    icon: Trophy,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    count: 6,
    completed: 3,
  },
  {
    id: 'special',
    name: 'Besondere',
    icon: Crown,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    count: 4,
    completed: 1,
  },
];

export default function AchievementsPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [totalAchievements, setTotalAchievements] = useState(30);
  const [completedAchievements, setCompletedAchievements] = useState(17);
  const [totalPoints, setTotalPoints] = useState(2450);
  const [currentLevel, setCurrentLevel] = useState(8);

  const completionRate = Math.round((completedAchievements / totalAchievements) * 100);

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
                Erfolge & Abzeichen
              </h1>
              <p className="text-sm text-muted-foreground">
                Verfolgen Sie Ihre Fortschritte und sammeln Sie Auszeichnungen
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Medal className="h-3 w-3" />
                Level {currentLevel}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Zap className="h-3 w-3" />
                {totalPoints.toLocaleString()} XP
              </Badge>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Teilen
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Zertifikat
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Achievement Stats Overview */}
            <AchievementStats 
              totalAchievements={totalAchievements}
              completedAchievements={completedAchievements}
              totalPoints={totalPoints}
              currentLevel={currentLevel}
              completionRate={completionRate}
            />

            {/* Category Navigation */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Erfolgs-Kategorien
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {achievementCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "secondary" : "ghost"}
                      className="h-auto p-4 flex flex-col items-center gap-3"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className={`p-3 rounded-full ${category.bgColor}`}>
                        <category.icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {category.completed}/{category.count} erreicht
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="achievements" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="achievements">
                  Erfolge
                </TabsTrigger>
                <TabsTrigger value="badges">
                  Abzeichen
                </TabsTrigger>
                <TabsTrigger value="milestones">
                  Meilensteine
                </TabsTrigger>
                <TabsTrigger value="leaderboard">
                  Rangliste
                </TabsTrigger>
                <TabsTrigger value="recent">
                  Aktivität
                </TabsTrigger>
              </TabsList>

              <TabsContent value="achievements" className="space-y-6">
                <AchievementGrid 
                  category={selectedCategory}
                  completedAchievements={completedAchievements}
                />
              </TabsContent>

              <TabsContent value="badges" className="space-y-6">
                <BadgeCollection />
              </TabsContent>

              <TabsContent value="milestones" className="space-y-6">
                <ProgressMilestones 
                  currentLevel={currentLevel}
                  totalPoints={totalPoints}
                />
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-6">
                <LeaderboardPreview />
              </TabsContent>

              <TabsContent value="recent" className="space-y-6">
                <RecentAchievements />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}