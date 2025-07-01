'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { MicroLearningGrid } from '@/components/microlearning/microlearning-grid';
import { MicroLearningStats } from '@/components/microlearning/microlearning-stats';
import { DailyChallenge } from '@/components/microlearning/daily-challenge';
import { LearningStreak } from '@/components/microlearning/learning-streak';
import { QuickTopics } from '@/components/microlearning/quick-topics';
import { RecentActivity } from '@/components/microlearning/recent-activity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import {
  Zap,
  Clock,
  Target,
  Brain,
  Coffee,
  Sparkles,
  TrendingUp,
  Play,
  CheckCircle,
  Filter,
} from 'lucide-react';

const microLearningCategories = [
  {
    id: 'quick-tips',
    name: 'Schnelle Tipps',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    count: 24,
  },
  {
    id: 'scenarios',
    name: 'Szenarien',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    count: 18,
  },
  {
    id: 'coffee-break',
    name: 'Kaffeepause',
    icon: Coffee,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    count: 15,
  },
  {
    id: 'daily-dose',
    name: 'Tägliche Dosis',
    icon: Target,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    count: 30,
  },
];

export default function MicroLearningPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedToday, setCompletedToday] = useState(3);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalPoints, setTotalPoints] = useState(1250);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                Mikro-Lernen
              </h1>
              <p className="text-sm text-muted-foreground">
                Kurze, effektive Lerneinheiten für zwischendurch
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {completedToday} heute abgeschlossen
              </Badge>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Stats Row */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MicroLearningStats 
                completedToday={completedToday}
                currentStreak={currentStreak}
                totalPoints={totalPoints}
              />
            </div>

            {/* Daily Challenge & Streak */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <DailyChallenge />
              </div>
              <div>
                <LearningStreak streak={currentStreak} />
              </div>
            </div>

            {/* Category Navigation */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Lernkategorien
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {microLearningCategories.map((category) => (
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
                          {category.count} Einheiten
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="browse" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="browse">
                  Durchsuchen
                </TabsTrigger>
                <TabsTrigger value="topics">
                  Schnellthemen
                </TabsTrigger>
                <TabsTrigger value="activity">
                  Aktivität
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  Favoriten
                </TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="space-y-6">
                <MicroLearningGrid 
                  category={selectedCategory}
                  onComplete={(id) => setCompletedToday(prev => prev + 1)}
                />
              </TabsContent>

              <TabsContent value="topics" className="space-y-6">
                <QuickTopics />
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <RecentActivity />
              </TabsContent>

              <TabsContent value="favorites" className="space-y-6">
                <div className="text-center py-12">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Noch keine Favoriten
                  </h3>
                  <p className="text-muted-foreground">
                    Markieren Sie Mikro-Lerneinheiten als Favoriten, um sie hier zu sehen.
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