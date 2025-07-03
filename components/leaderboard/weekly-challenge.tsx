'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Target,
  Clock,
  Trophy,
  Users,
  Star,
  Zap,
  Gift,
  Calendar,
  TrendingUp,
  Medal,
} from 'lucide-react';

const currentChallenge = {
  title: 'Kommunikations-Meisterschaft',
  description: 'Erreiche die höchste durchschnittliche Kommunikationsbewertung in KI-Simulationen',
  timeLeft: '4 Tage 12 Stunden',
  participants: 20,
  userProgress: 78,
  userRank: 6,
  targetScore: 90,
  currentScore: 87,
  prize: {
    first: '1000 XP + Kommunikations-Guru Abzeichen',
    second: '750 XP + Rhetorik-Experte Abzeichen',
    third: '500 XP + Gesprächs-Profi Abzeichen',
    participation: '100 XP für alle Teilnehmer',
  },
};

const challengeLeaderboard = [
  {
    rank: 1,
    name: 'Julia Becker',
    score: 94,
    simulations: 12,
    avatar: 'JB',
    department: 'Kundenservice',
    trend: 'up',
  },
  {
    rank: 2,
    name: 'Sarah Schmidt',
    score: 92,
    simulations: 15,
    avatar: 'SS',
    department: 'Kundenservice',
    trend: 'stable',
  },
  {
    rank: 3,
    name: 'Anna Müller',
    score: 91,
    simulations: 10,
    avatar: 'AM',
    department: 'Vertrieb',
    trend: 'up',
  },
  {
    rank: 4,
    name: 'Michael Weber',
    score: 89,
    simulations: 14,
    avatar: 'MW',
    department: 'Support',
    trend: 'down',
  },
  {
    rank: 5,
    name: 'Lisa Wagner',
    score: 88,
    simulations: 9,
    avatar: 'LW',
    department: 'Support',
    trend: 'up',
  },
  {
    rank: 6,
    name: 'Du',
    score: 87,
    simulations: 8,
    avatar: 'MM',
    department: 'Kundenservice',
    isCurrentUser: true,
    trend: 'up',
  },
];

const upcomingChallenges = [
  {
    title: 'Empathie-Sprint',
    description: 'Sammle die höchsten Empathie-Bewertungen',
    startDate: '2024-02-05',
    duration: '1 Woche',
    estimatedParticipants: 25,
    prize: 'Empathie-Champion Titel',
    icon: Target,
    color: 'text-red-500',
  },
  {
    title: 'Lern-Marathon',
    description: 'Schließe die meisten Kurse ab',
    startDate: '2024-02-12',
    duration: '2 Wochen',
    estimatedParticipants: 30,
    prize: 'Lernbegeisterter Abzeichen',
    icon: Star,
    color: 'text-blue-500',
  },
  {
    title: 'Team-Collaboration',
    description: 'Hilf anderen beim Lernen',
    startDate: '2024-02-19',
    duration: '1 Monat',
    estimatedParticipants: 20,
    prize: 'Mentor Titel',
    icon: Users,
    color: 'text-green-500',
  },
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-3 w-3 text-green-500" />;
    case 'down':
      return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
    default:
      return <div className="h-3 w-3 rounded-full bg-muted-foreground" />;
  }
};

export function WeeklyChallenge() {
  return (
    <div className="space-y-6">
      {/* Current Challenge */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Aktuelle Challenge
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              {currentChallenge.timeLeft}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">{currentChallenge.title}</h3>
            <p className="text-muted-foreground mb-4">{currentChallenge.description}</p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Users className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <div className="font-bold">{currentChallenge.participants}</div>
                <p className="text-sm text-muted-foreground">Teilnehmer</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Medal className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                <div className="font-bold">#{currentChallenge.userRank}</div>
                <p className="text-sm text-muted-foreground">Dein Rang</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                <div className="font-bold">{currentChallenge.currentScore}%</div>
                <p className="text-sm text-muted-foreground">Aktueller Score</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Fortschritt zum Ziel ({currentChallenge.targetScore}%)</span>
              <span>{currentChallenge.userProgress}%</span>
            </div>
            <Progress value={currentChallenge.userProgress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Noch {currentChallenge.targetScore - currentChallenge.currentScore}% bis zum Ziel!
            </p>
          </div>

          <div className="p-4 bg-muted/20 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Gift className="h-4 w-4 text-primary" />
              Belohnungen
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>🥇 1. Platz:</span>
                <span>{currentChallenge.prize.first}</span>
              </div>
              <div className="flex justify-between">
                <span>🥈 2. Platz:</span>
                <span>{currentChallenge.prize.second}</span>
              </div>
              <div className="flex justify-between">
                <span>🥉 3. Platz:</span>
                <span>{currentChallenge.prize.third}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Teilnahme:</span>
                <span>{currentChallenge.prize.participation}</span>
              </div>
            </div>
          </div>

          <Button className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Simulation starten
          </Button>
        </CardContent>
      </Card>

      {/* Challenge Leaderboard */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Challenge Rangliste
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {challengeLeaderboard.map((user) => (
              <div 
                key={user.rank}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  user.isCurrentUser 
                    ? 'bg-primary/10 border-primary/20' 
                    : 'bg-muted/20 border-border hover:bg-muted/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 min-w-[40px]">
                      <span className="font-bold">#{user.rank}</span>
                      {getTrendIcon(user.trend)}
                    </div>
                    
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-sm">{user.avatar}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <p className={`font-medium ${
                        user.isCurrentUser ? 'text-primary' : 'text-foreground'
                      }`}>
                        {user.name}
                        {user.isCurrentUser && (
                          <Badge variant="secondary" className="ml-2 text-xs">Du</Badge>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.department} • {user.simulations} Simulationen
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">{user.score}%</div>
                    <p className="text-sm text-muted-foreground">Ø Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Challenges */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Kommende Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingChallenges.map((challenge, index) => (
              <div key={index} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      challenge.color === 'text-red-500' ? 'bg-red-500/10' :
                      challenge.color === 'text-blue-500' ? 'bg-blue-500/10' :
                      'bg-green-500/10'
                    }`}>
                      <challenge.icon className={`h-5 w-5 ${challenge.color}`} />
                    </div>
                    
                    <div>
                      <h4 className="font-medium">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Start: {new Date(challenge.startDate).toLocaleDateString('de-DE')}</span>
                        <span>Dauer: {challenge.duration}</span>
                        <span>~{challenge.estimatedParticipants} Teilnehmer</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      {challenge.prize}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Vormerken
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}