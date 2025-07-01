'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  Clock,
  Star,
  Play,
  CheckCircle,
  Zap,
  Target,
} from 'lucide-react';

const dailyChallenges = [
  {
    id: 'empathy-master',
    title: 'Empathie-Meister',
    description: 'Absolviere 3 Empathie-Übungen und erreiche eine Bewertung von mindestens 85%',
    progress: 2,
    total: 3,
    timeLeft: '4h 23m',
    reward: 50,
    difficulty: 'Mittel',
    category: 'Empathie',
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
];

const weeklyQuest = {
  title: 'Kommunikations-Champion',
  description: 'Sammle 200 Punkte durch Mikro-Lerneinheiten diese Woche',
  progress: 145,
  total: 200,
  timeLeft: '3 Tage',
  reward: 100,
  participants: 24,
};

export function DailyChallenge() {
  const [completingChallenge, setCompletingChallenge] = useState(false);
  
  const challenge = dailyChallenges[0];
  const progressPercentage = (challenge.progress / challenge.total) * 100;
  const weeklyProgressPercentage = (weeklyQuest.progress / weeklyQuest.total) * 100;

  const handleStartChallenge = () => {
    setCompletingChallenge(true);
    setTimeout(() => {
      setCompletingChallenge(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Daily Challenge */}
      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Tägliche Herausforderung
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              {challenge.timeLeft}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {challenge.description}
            </p>
            
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{challenge.difficulty}</Badge>
              <Badge variant="outline">{challenge.category}</Badge>
              <Badge className="bg-yellow-500 text-black">
                <Zap className="h-3 w-3 mr-1" />
                {challenge.reward} XP
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fortschritt</span>
              <span>{challenge.progress}/{challenge.total} abgeschlossen</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <Button 
            onClick={handleStartChallenge}
            disabled={completingChallenge}
            className="w-full"
          >
            {completingChallenge ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Wird bearbeitet...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Herausforderung starten
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Weekly Team Quest */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Wöchentliche Team-Quest
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">{weeklyQuest.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {weeklyQuest.description}
            </p>
            
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">
                {weeklyQuest.participants} Teilnehmer
              </Badge>
              <Badge variant="outline">
                {weeklyQuest.timeLeft} verbleibend
              </Badge>
              <Badge className="bg-blue-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                {weeklyQuest.reward} XP
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Team-Fortschritt</span>
              <span>{weeklyQuest.progress}/{weeklyQuest.total} Punkte</span>
            </div>
            <Progress value={weeklyProgressPercentage} className="h-3" />
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Noch {weeklyQuest.total - weeklyQuest.progress} Punkte bis zur Belohnung!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}