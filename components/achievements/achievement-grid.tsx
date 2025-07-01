'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  Star,
  Target,
  Crown,
  Zap,
  Medal,
  Award,
  Lock,
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Brain,
  Heart,
  MessageSquare,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

interface AchievementGridProps {
  category: string;
  completedAchievements: number;
}

const achievements = [
  {
    id: 'first-steps',
    title: 'Erste Schritte',
    description: 'Absolviere deine erste Lektion',
    category: 'learning',
    rarity: 'common',
    points: 10,
    progress: 100,
    completed: true,
    icon: Star,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    unlockedAt: '2024-01-15',
  },
  {
    id: 'communication-expert',
    title: 'Kommunikationsexperte',
    description: 'Erreiche eine Bewertung von 90%+ in 10 Simulationen',
    category: 'simulation',
    rarity: 'rare',
    points: 100,
    progress: 80,
    completed: false,
    icon: MessageSquare,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    requirement: '8/10 Simulationen',
  },
  {
    id: 'empathy-champion',
    title: 'Empathie-Champion',
    description: 'Erreiche hohe Empathie-Bewertungen in 5 aufeinanderfolgenden Simulationen',
    category: 'simulation',
    rarity: 'epic',
    points: 150,
    progress: 60,
    completed: false,
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    requirement: '3/5 Simulationen',
  },
  {
    id: 'problem-solver',
    title: 'Problemlöser',
    description: 'Löse 25 schwierige Kundenprobleme erfolgreich',
    category: 'simulation',
    rarity: 'rare',
    points: 75,
    progress: 100,
    completed: true,
    icon: Target,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    unlockedAt: '2024-01-20',
  },
  {
    id: 'learning-enthusiast',
    title: 'Lernbegeisterter',
    description: 'Schließe 5 Kurse erfolgreich ab',
    category: 'learning',
    rarity: 'rare',
    points: 200,
    progress: 60,
    completed: false,
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    requirement: '3/5 Kurse',
  },
  {
    id: 'team-player',
    title: 'Teamplayer',
    description: 'Hilf 10 Teammitgliedern bei ihren Lernzielen',
    category: 'social',
    rarity: 'rare',
    points: 125,
    progress: 30,
    completed: false,
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    requirement: '3/10 geholfen',
  },
  {
    id: 'streak-master',
    title: 'Streak-Meister',
    description: 'Lerne 30 Tage in Folge',
    category: 'learning',
    rarity: 'epic',
    points: 300,
    progress: 23,
    completed: false,
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    requirement: '7/30 Tage',
  },
  {
    id: 'ai-whisperer',
    title: 'KI-Flüsterer',
    description: 'Führe 100 erfolgreiche KI-Simulationen durch',
    category: 'simulation',
    rarity: 'legendary',
    points: 500,
    progress: 45,
    completed: false,
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    requirement: '45/100 Simulationen',
  },
  {
    id: 'perfectionist',
    title: 'Perfektionist',
    description: 'Erreiche 100% in allen verfügbaren Kursen',
    category: 'learning',
    rarity: 'legendary',
    points: 1000,
    progress: 0,
    completed: false,
    icon: Crown,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    requirement: 'Gesperrt',
    locked: true,
  },
];

const rarityConfig = {
  common: {
    label: 'Häufig',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/20',
  },
  rare: {
    label: 'Selten',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  epic: {
    label: 'Episch',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  legendary: {
    label: 'Legendär',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
};

export function AchievementGrid({ category, completedAchievements }: AchievementGridProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);

  const filteredAchievements = category === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === category);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {category === 'all' ? 'Alle Erfolge' : 'Gefilterte Erfolge'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {filteredAchievements.filter(a => a.completed).length} von {filteredAchievements.length} erreicht
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map((achievement) => {
          const rarity = rarityConfig[achievement.rarity as keyof typeof rarityConfig];
          const AchievementIcon = achievement.icon;
          const isCompleted = achievement.completed;
          const isLocked = achievement.locked;
          
          return (
            <Card 
              key={achievement.id} 
              className={`bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group cursor-pointer ${
                isCompleted ? `${rarity.borderColor} border-2` : ''
              } ${isLocked ? 'opacity-60' : ''}`}
              onClick={() => setSelectedAchievement(achievement.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      isLocked ? 'bg-muted' : achievement.bgColor
                    }`}>
                      {isLocked ? (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      ) : isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <AchievementIcon className={`h-6 w-6 ${achievement.color}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className={`text-lg ${
                        isCompleted ? 'text-primary' : isLocked ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        {achievement.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={`text-xs ${rarity.color} ${rarity.bgColor}`}>
                          {rarity.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          {achievement.points} XP
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {isCompleted && (
                    <div className="text-right">
                      <Trophy className="h-5 w-5 text-yellow-500 mb-1" />
                      <p className="text-xs text-muted-foreground">
                        {achievement.unlockedAt}
                      </p>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>

                {!isLocked && !isCompleted && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fortschritt</span>
                      <span>{achievement.requirement}</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}

                {isLocked && (
                  <div className="text-center py-2">
                    <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Erreiche Level 10 zum Freischalten
                    </p>
                  </div>
                )}

                {isCompleted && (
                  <div className="text-center py-2">
                    <div className="flex items-center justify-center gap-2 text-green-500">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Erreicht!</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Details Modal would go here */}
    </div>
  );
}