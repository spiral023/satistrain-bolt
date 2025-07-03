'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  Crown,
  Star,
  Target,
  Heart,
  Brain,
  Zap,
  Users,
  Medal,
  Award,
} from 'lucide-react';

const achievementCategories = [
  {
    id: 'learning',
    name: 'Lern-Champions',
    icon: Star,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    leaders: [
      {
        rank: 1,
        name: 'Sarah Schmidt',
        value: '12 Kurse',
        avatar: 'SS',
        department: 'Kundenservice',
        achievement: 'Lernbegeisterter',
      },
      {
        rank: 2,
        name: 'Michael Weber',
        value: '10 Kurse',
        avatar: 'MW',
        department: 'Support',
        achievement: 'Wissensdurstig',
      },
      {
        rank: 3,
        name: 'Anna Müller',
        value: '9 Kurse',
        avatar: 'AM',
        department: 'Vertrieb',
        achievement: 'Fleißiger Lerner',
      },
    ],
  },
  {
    id: 'simulation',
    name: 'Simulations-Experten',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    leaders: [
      {
        rank: 1,
        name: 'Anna Müller',
        value: '98% Ø Score',
        avatar: 'AM',
        department: 'Vertrieb',
        achievement: 'KI-Flüsterer',
      },
      {
        rank: 2,
        name: 'Sarah Schmidt',
        value: '96% Ø Score',
        avatar: 'SS',
        department: 'Kundenservice',
        achievement: 'Simulation-Meister',
      },
      {
        rank: 3,
        name: 'Julia Becker',
        value: '94% Ø Score',
        avatar: 'JB',
        department: 'Kundenservice',
        achievement: 'Gesprächs-Profi',
      },
    ],
  },
  {
    id: 'empathy',
    name: 'Empathie-Meister',
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    leaders: [
      {
        rank: 1,
        name: 'Julia Becker',
        value: '99% Empathie',
        avatar: 'JB',
        department: 'Kundenservice',
        achievement: 'Empathie-Champion',
      },
      {
        rank: 2,
        name: 'Lisa Wagner',
        value: '97% Empathie',
        avatar: 'LW',
        department: 'Support',
        achievement: 'Herzensmensch',
      },
      {
        rank: 3,
        name: 'Sarah Schmidt',
        value: '95% Empathie',
        avatar: 'SS',
        department: 'Kundenservice',
        achievement: 'Mitfühlend',
      },
    ],
  },
  {
    id: 'social',
    name: 'Team-Player',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    leaders: [
      {
        rank: 1,
        name: 'Michael Weber',
        value: '15 geholfen',
        avatar: 'MW',
        department: 'Support',
        achievement: 'Mentor',
      },
      {
        rank: 2,
        name: 'Thomas Klein',
        value: '12 geholfen',
        avatar: 'TK',
        department: 'Vertrieb',
        achievement: 'Teamplayer',
      },
      {
        rank: 3,
        name: 'David Fischer',
        value: '10 geholfen',
        avatar: 'DF',
        department: 'Support',
        achievement: 'Hilfsbereit',
      },
    ],
  },
];

const monthlyAwards = [
  {
    title: 'Lerner des Monats',
    winner: 'Sarah Schmidt',
    department: 'Kundenservice',
    achievement: 'Höchste Kursabschlussrate',
    avatar: 'SS',
    icon: Star,
    color: 'text-blue-500',
  },
  {
    title: 'Empathie-Champion',
    winner: 'Julia Becker',
    department: 'Kundenservice',
    achievement: 'Beste Empathie-Bewertungen',
    avatar: 'JB',
    icon: Heart,
    color: 'text-red-500',
  },
  {
    title: 'Team-Mentor',
    winner: 'Michael Weber',
    department: 'Support',
    achievement: 'Meiste Hilfestellungen',
    avatar: 'MW',
    icon: Users,
    color: 'text-green-500',
  },
];

const hallOfFame = [
  {
    name: 'Sarah Schmidt',
    titles: ['Lernbegeisterter', 'Simulation-Meister', 'Konsistenz-König'],
    totalAchievements: 18,
    avatar: 'SS',
    department: 'Kundenservice',
    joinedDate: '2023-06-15',
  },
  {
    name: 'Michael Weber',
    titles: ['Mentor', 'Team-Champion', 'Problemlöser'],
    totalAchievements: 16,
    avatar: 'MW',
    department: 'Support',
    joinedDate: '2023-08-20',
  },
  {
    name: 'Anna Müller',
    titles: ['KI-Flüsterer', 'Empathie-Champion', 'Aufsteiger'],
    totalAchievements: 15,
    avatar: 'AM',
    department: 'Vertrieb',
    joinedDate: '2023-09-10',
  },
];

export function AchievementLeaders() {
  return (
    <div className="space-y-6">
      {/* Category Leaders */}
      <div className="grid gap-6 lg:grid-cols-2">
        {achievementCategories.map((category) => (
          <Card key={category.id} className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className={`h-5 w-5 ${category.color}`} />
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.leaders.map((leader) => (
                  <div key={leader.rank} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6">
                        {leader.rank === 1 ? (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        ) : leader.rank === 2 ? (
                          <Medal className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Medal className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                      
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-sm">{leader.avatar}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <p className="font-medium">{leader.name}</p>
                        <p className="text-xs text-muted-foreground">{leader.department}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold">{leader.value}</div>
                      <Badge variant="outline" className="text-xs">
                        {leader.achievement}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Awards */}
      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Auszeichnungen des Monats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {monthlyAwards.map((award, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-white/5">
                <div className={`p-3 rounded-full ${award.color === 'text-blue-500' ? 'bg-blue-500/10' : 
                                                   award.color === 'text-red-500' ? 'bg-red-500/10' : 
                                                   'bg-green-500/10'} mx-auto w-fit mb-3`}>
                  <award.icon className={`h-6 w-6 ${award.color}`} />
                </div>
                
                <h3 className="font-semibold mb-2">{award.title}</h3>
                
                <Avatar className="h-12 w-12 mx-auto mb-3">
                  <AvatarFallback>{award.avatar}</AvatarFallback>
                </Avatar>
                
                <p className="font-medium">{award.winner}</p>
                <p className="text-sm text-muted-foreground mb-2">{award.department}</p>
                <p className="text-xs text-muted-foreground">{award.achievement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hall of Fame */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-purple-500" />
            Hall of Fame
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hallOfFame.map((member, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-purple-500/5 to-blue-500/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 ring-2 ring-purple-500/20">
                      <AvatarFallback className="text-lg font-bold">{member.avatar}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {member.department} • Seit {new Date(member.joinedDate).toLocaleDateString('de-DE')}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {member.titles.map((title, titleIndex) => (
                          <Badge key={titleIndex} variant="outline" className="text-xs">
                            {title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-500">
                      {member.totalAchievements}
                    </div>
                    <p className="text-sm text-muted-foreground">Erfolge</p>
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