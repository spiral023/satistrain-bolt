'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  Target,
  Star,
  Heart,
  MessageSquare,
  Clock,
  Trophy,
  Zap,
  Brain,
  Users,
} from 'lucide-react';

interface PerformanceAnalyticsProps {
  stats: {
    totalSessions: number;
    averageScore: number;
    bestScore: number;
    hoursSpent: number;
    currentStreak: number;
  };
}

const skillBreakdown = [
  {
    name: 'Empathie',
    current: 87,
    target: 90,
    trend: '+5%',
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    name: 'Klarheit',
    current: 85,
    target: 88,
    trend: '+3%',
    icon: MessageSquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    name: 'Hilfsbereitschaft',
    current: 88,
    target: 92,
    trend: '+7%',
    icon: Target,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    name: 'Problemlösung',
    current: 82,
    target: 85,
    trend: '+2%',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

const categoryPerformance = [
  {
    category: 'Beschwerden',
    sessions: 8,
    averageScore: 85,
    bestScore: 96,
    improvement: '+8%',
    difficulty: 'Hoch',
  },
  {
    category: 'Support',
    sessions: 12,
    averageScore: 88,
    bestScore: 94,
    improvement: '+5%',
    difficulty: 'Mittel',
  },
  {
    category: 'Abrechnung',
    sessions: 6,
    averageScore: 91,
    bestScore: 98,
    improvement: '+3%',
    difficulty: 'Niedrig',
  },
  {
    category: 'Beratung',
    sessions: 4,
    averageScore: 83,
    bestScore: 89,
    improvement: '+12%',
    difficulty: 'Mittel',
  },
  {
    category: 'Logistik',
    sessions: 2,
    averageScore: 86,
    bestScore: 92,
    improvement: '+6%',
    difficulty: 'Hoch',
  },
];

const achievements = [
  {
    title: 'Empathie-Experte',
    description: 'Erreiche 90%+ Empathie in 5 Simulationen',
    progress: 80,
    current: 4,
    target: 5,
    icon: Heart,
    color: 'text-red-500',
  },
  {
    title: 'Kommunikations-Profi',
    description: 'Erreiche 95%+ Gesamtbewertung',
    progress: 60,
    current: 96,
    target: 95,
    icon: MessageSquare,
    color: 'text-blue-500',
    completed: true,
  },
  {
    title: 'Problemlöser',
    description: 'Löse 20 schwierige Szenarien',
    progress: 45,
    current: 9,
    target: 20,
    icon: Brain,
    color: 'text-purple-500',
  },
];

const weeklyGoals = [
  {
    title: 'Simulationen absolvieren',
    current: 3,
    target: 5,
    progress: 60,
    reward: '50 XP',
  },
  {
    title: 'Empathie-Score verbessern',
    current: 87,
    target: 90,
    progress: 75,
    reward: 'Empathie-Boost Abzeichen',
  },
  {
    title: 'Neue Szenarien testen',
    current: 2,
    target: 3,
    progress: 67,
    reward: '25 XP',
  },
];

export function PerformanceAnalytics({ stats }: PerformanceAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Overall Performance */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Gesamtleistung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">
                {stats.averageScore}%
              </div>
              <p className="text-sm text-muted-foreground">Durchschnittsbewertung</p>
              <Badge variant="outline" className="mt-1 text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% diese Woche
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-1">
                {stats.bestScore}%
              </div>
              <p className="text-sm text-muted-foreground">Beste Bewertung</p>
              <Badge variant="outline" className="mt-1">
                Persönlicher Rekord
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-1">
                {stats.currentStreak}
              </div>
              <p className="text-sm text-muted-foreground">Tage Streak</p>
              <Badge variant="outline" className="mt-1 text-orange-500">
                <Zap className="h-3 w-3 mr-1" />
                Aktiv
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Breakdown */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Fähigkeiten-Analyse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {skillBreakdown.map((skill) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${skill.bgColor}`}>
                      <skill.icon className={`h-5 w-5 ${skill.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Ziel: {skill.target}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{skill.current}%</div>
                    <Badge variant="outline" className="text-green-500">
                      {skill.trend}
                    </Badge>
                  </div>
                </div>
                <Progress value={(skill.current / skill.target) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Leistung nach Kategorien</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryPerformance.map((category) => (
              <div key={category.category} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{category.category}</h4>
                    <p className="text-sm text-muted-foreground">
                      {category.sessions} Simulationen • Schwierigkeit: {category.difficulty}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-500">
                    {category.improvement}
                  </Badge>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-2 bg-white/5 rounded">
                    <div className="text-lg font-bold text-blue-500">
                      {category.averageScore}%
                    </div>
                    <p className="text-xs text-muted-foreground">Durchschnitt</p>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded">
                    <div className="text-lg font-bold text-green-500">
                      {category.bestScore}%
                    </div>
                    <p className="text-xs text-muted-foreground">Beste</p>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded">
                    <div className="text-lg font-bold text-purple-500">
                      {category.sessions}
                    </div>
                    <p className="text-xs text-muted-foreground">Versuche</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Achievements Progress */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Erfolge in Arbeit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    {achievement.completed && (
                      <Badge className="bg-green-500 text-white">
                        Erreicht!
                      </Badge>
                    )}
                  </div>
                  
                  {!achievement.completed && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{achievement.current}/{achievement.target}</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Wöchentliche Ziele
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{goal.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Belohnung: &quot;{goal.reward}&quot;
                      </p>
                    </div>
                    <Badge variant="outline">
                      {goal.current}/{goal.target}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Fortschritt</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-500" />
            KI-Empfehlungen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <h4 className="font-medium text-green-500 mb-1">Empathie stärken</h4>
              <p className="text-sm text-muted-foreground">
                Üben Sie mehr Szenarien mit frustrierten Kunden, um Ihre Empathie-Bewertung zu verbessern.
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <h4 className="font-medium text-blue-500 mb-1">Neue Kategorien erkunden</h4>
              <p className="text-sm text-muted-foreground">
                Versuchen Sie Szenarien in der Kategorie &quot;Logistik&quot; für eine ausgewogenere Erfahrung.
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <h4 className="font-medium text-purple-500 mb-1">Herausforderungs-Modus</h4>
              <p className="text-sm text-muted-foreground">
                Sie sind bereit für den Herausforderungs-Modus! Testen Sie Ihre Fähigkeiten.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
