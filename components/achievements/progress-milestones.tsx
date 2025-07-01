'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  Star,
  Crown,
  Target,
  Zap,
  Gift,
  CheckCircle,
  Lock,
  TrendingUp,
} from 'lucide-react';

interface ProgressMilestonesProps {
  currentLevel: number;
  totalPoints: number;
}

const levelMilestones = [
  {
    level: 1,
    title: 'Neuling',
    pointsRequired: 0,
    rewards: ['Zugang zu Grundkursen', 'Erste Simulation'],
    icon: Star,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
  },
  {
    level: 5,
    title: 'Lernender',
    pointsRequired: 500,
    rewards: ['Erweiterte Kurse', 'Team-Diskussionen'],
    icon: Target,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    level: 10,
    title: 'Experte',
    pointsRequired: 1500,
    rewards: ['Spezielle Abzeichen', 'Mentor-Programm'],
    icon: Trophy,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    level: 15,
    title: 'Meister',
    pointsRequired: 3000,
    rewards: ['Exklusive Inhalte', 'Zertifikat-Erstellung'],
    icon: Crown,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    level: 20,
    title: 'Champion',
    pointsRequired: 5000,
    rewards: ['Alle Features', 'Leaderboard-Hall of Fame'],
    icon: Crown,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

const weeklyGoals = [
  {
    id: 'courses',
    title: 'Kurse abschließen',
    description: 'Schließe 2 Kurse diese Woche ab',
    progress: 50,
    current: 1,
    target: 2,
    reward: 100,
    icon: Target,
  },
  {
    id: 'simulations',
    title: 'Simulationen durchführen',
    description: 'Führe 5 Simulationen durch',
    progress: 80,
    current: 4,
    target: 5,
    reward: 75,
    icon: Zap,
  },
  {
    id: 'microlearning',
    title: 'Mikro-Lernen',
    description: 'Absolviere 10 Mikro-Lerneinheiten',
    progress: 30,
    current: 3,
    target: 10,
    reward: 50,
    icon: Star,
  },
];

const monthlyChallenge = {
  title: 'Empathie-Meister des Monats',
  description: 'Erreiche eine durchschnittliche Empathie-Bewertung von 90%+',
  progress: 85,
  current: 87,
  target: 90,
  reward: 500,
  timeLeft: '12 Tage',
};

export function ProgressMilestones({ currentLevel, totalPoints }: ProgressMilestonesProps) {
  const nextMilestone = levelMilestones.find(m => m.level > currentLevel);
  const currentMilestone = levelMilestones.find(m => m.level <= currentLevel) || levelMilestones[0];
  
  const pointsToNext = nextMilestone ? nextMilestone.pointsRequired - totalPoints : 0;
  const progressToNext = nextMilestone 
    ? ((totalPoints - currentMilestone.pointsRequired) / (nextMilestone.pointsRequired - currentMilestone.pointsRequired)) * 100
    : 100;

  return (
    <div className="space-y-6">
      {/* Current Level Status */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <currentMilestone.icon className={`h-5 w-5 ${currentMilestone.color}`} />
            Level {currentLevel} - {currentMilestone.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Aktuelle Punkte</p>
              <p className="text-2xl font-bold">{totalPoints.toLocaleString()} XP</p>
            </div>
            {nextMilestone && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Bis Level {nextMilestone.level}</p>
                <p className="text-2xl font-bold">{pointsToNext.toLocaleString()} XP</p>
              </div>
            )}
          </div>
          
          {nextMilestone && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fortschritt zu Level {nextMilestone.level}</span>
                <span>{Math.round(progressToNext)}%</span>
              </div>
              <Progress value={progressToNext} className="h-3" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Level Milestones */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Level-Meilensteine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {levelMilestones.map((milestone) => {
              const isUnlocked = currentLevel >= milestone.level;
              const isCurrent = currentLevel === milestone.level;
              const MilestoneIcon = milestone.icon;
              
              return (
                <div 
                  key={milestone.level}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    isCurrent 
                      ? 'bg-primary/10 border-primary/20' 
                      : isUnlocked 
                        ? 'bg-green-500/10 border-green-500/20' 
                        : 'bg-muted/20 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        isUnlocked ? milestone.bgColor : 'bg-muted'
                      }`}>
                        {isUnlocked ? (
                          <MilestoneIcon className={`h-6 w-6 ${milestone.color}`} />
                        ) : (
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          Level {milestone.level} - {milestone.title}
                          {isCurrent && (
                            <Badge className="bg-primary text-primary-foreground">
                              Aktuell
                            </Badge>
                          )}
                          {isUnlocked && !isCurrent && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {milestone.pointsRequired.toLocaleString()} XP erforderlich
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium">Belohnungen:</p>
                      <ul className="text-xs text-muted-foreground">
                        {milestone.rewards.map((reward, index) => (
                          <li key={index}>• {reward}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Wöchentliche Ziele
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {weeklyGoals.map((goal) => (
              <div key={goal.id} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-center gap-3 mb-3">
                  <goal.icon className="h-5 w-5 text-primary" />
                  <h4 className="font-medium">{goal.title}</h4>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {goal.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{goal.current}/{goal.target}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
                
                <div className="mt-3 text-center">
                  <Badge variant="outline">
                    <Gift className="h-3 w-3 mr-1" />
                    {goal.reward} XP
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Challenge */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-purple-500" />
            Monats-Herausforderung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{monthlyChallenge.title}</h3>
            <p className="text-muted-foreground">{monthlyChallenge.description}</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Aktueller Durchschnitt</p>
              <p className="text-2xl font-bold">{monthlyChallenge.current}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Verbleibende Zeit</p>
              <p className="text-2xl font-bold">{monthlyChallenge.timeLeft}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fortschritt zum Ziel</span>
              <span>{monthlyChallenge.progress}%</span>
            </div>
            <Progress value={monthlyChallenge.progress} className="h-3" />
          </div>
          
          <div className="text-center">
            <Badge className="bg-purple-500 text-white">
              <Trophy className="h-3 w-3 mr-1" />
              {monthlyChallenge.reward} XP Belohnung
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}