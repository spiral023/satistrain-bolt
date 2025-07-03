'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Trophy,
  Users,
  Target,
  Calendar,
  Clock,
  Star,
  Medal,
  Zap,
  Crown,
  Gift,
} from 'lucide-react';

const activeCompetitions = [
  {
    id: 'empathy-week',
    title: 'Empathie-Woche Challenge',
    description: 'Sammle die meisten Empathie-Punkte in KI-Simulationen',
    type: 'weekly',
    participants: 18,
    timeLeft: '3 Tage 14h',
    prize: '500 XP + Empathie-Champion Abzeichen',
    progress: 65,
    userRank: 4,
    totalParticipants: 18,
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  {
    id: 'learning-sprint',
    title: 'Lern-Sprint',
    description: 'Schließe die meisten Kurse in 2 Wochen ab',
    type: 'biweekly',
    participants: 22,
    timeLeft: '8 Tage 6h',
    prize: '300 XP + Lernbegeisterter Titel',
    progress: 40,
    userRank: 7,
    totalParticipants: 22,
    icon: Target,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 'team-collaboration',
    title: 'Team-Zusammenarbeit',
    description: 'Hilf anderen Teammitgliedern bei ihren Lernzielen',
    type: 'monthly',
    participants: 15,
    timeLeft: '12 Tage 3h',
    prize: '400 XP + Mentor Abzeichen',
    progress: 25,
    userRank: 12,
    totalParticipants: 15,
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
];

const pastCompetitions = [
  {
    title: 'Simulation-Meisterschaft',
    winner: 'Sarah Schmidt',
    participants: 20,
    completedAt: '2024-01-15',
    userRank: 3,
    prize: 'KI-Flüsterer Abzeichen',
  },
  {
    title: 'Streak-Challenge',
    winner: 'Michael Weber',
    participants: 24,
    completedAt: '2024-01-08',
    userRank: 8,
    prize: 'Konsistenz-König Titel',
  },
];

const leaderboard = [
  {
    rank: 1,
    name: 'Sarah Schmidt',
    points: 1250,
    avatar: 'SS',
    department: 'Kundenservice',
  },
  {
    rank: 2,
    name: 'Anna Müller',
    points: 1180,
    avatar: 'AM',
    department: 'Vertrieb',
  },
  {
    rank: 3,
    name: 'Michael Weber',
    points: 1120,
    avatar: 'MW',
    department: 'Support',
  },
  {
    rank: 4,
    name: 'Du',
    points: 980,
    avatar: 'MM',
    department: 'Kundenservice',
    isCurrentUser: true,
  },
];

export function TeamCompetitions() {
  return (
    <div className="space-y-6">
      {/* Active Competitions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Aktive Wettbewerbe</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {activeCompetitions.map((competition) => (
            <Card key={competition.id} className={`bg-card/50 backdrop-blur-sm border-2 ${competition.borderColor}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${competition.bgColor}`}>
                      <competition.icon className={`h-6 w-6 ${competition.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{competition.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {competition.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {competition.timeLeft}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Teilnehmer</p>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{competition.participants}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Dein Rang</p>
                    <div className="flex items-center gap-2">
                      <Medal className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">
                        #{competition.userRank} von {competition.totalParticipants}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fortschritt</span>
                    <span>{competition.progress}%</span>
                  </div>
                  <Progress value={competition.progress} className="h-2" />
                </div>

                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Gift className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Belohnung:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{competition.prize}</p>
                </div>

                <Button className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Teilnehmen
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Current Competition Leaderboard */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Empathie-Woche Challenge - Rangliste
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((user) => (
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
                    <div className="flex items-center justify-center w-8 h-8">
                      {user.rank === 1 ? (
                        <Crown className="h-5 w-5 text-yellow-500" />
                      ) : user.rank === 2 ? (
                        <Medal className="h-5 w-5 text-gray-400" />
                      ) : user.rank === 3 ? (
                        <Medal className="h-5 w-5 text-orange-600" />
                      ) : (
                        <span className="font-bold">#{user.rank}</span>
                      )}
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
                      <p className="text-sm text-muted-foreground">{user.department}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold">{user.points} Punkte</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Competitions */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Vergangene Wettbewerbe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastCompetitions.map((competition, index) => (
              <div key={index} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{competition.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Gewinner: {competition.winner} • {competition.participants} Teilnehmer
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Abgeschlossen am {new Date(competition.completedAt).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">Rang #{competition.userRank}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {competition.prize}
                    </p>
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