'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  TrendingUp,
  Trophy,
  Target,
  Zap,
  Star,
  Medal,
  Crown,
} from 'lucide-react';

interface LeaderboardStatsProps {
  category: string;
  timeRange: string;
}

export function LeaderboardStats({ category, timeRange }: LeaderboardStatsProps) {
  const stats = [
    {
      title: 'Aktive Teilnehmer',
      value: '24',
      description: '+3 seit letzter Woche',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      trend: '+12.5%',
    },
    {
      title: 'Durchschnittspunkte',
      value: '2,156',
      description: 'Team-Durchschnitt',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      trend: '+8.3%',
    },
    {
      title: 'Top Performer',
      value: 'Sarah S.',
      description: '3,250 XP diese Woche',
      icon: Crown,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      trend: '+15.2%',
    },
    {
      title: 'Wettbewerbs-Rate',
      value: '87%',
      description: 'Aktive Teilnahme',
      icon: Trophy,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      trend: '+5.1%',
    },
  ];

  const departmentStats = [
    {
      name: 'Kundenservice',
      participants: 12,
      averagePoints: 2340,
      topPerformer: 'Sarah Schmidt',
      progress: 78,
      color: 'bg-blue-500',
    },
    {
      name: 'Support',
      participants: 8,
      averagePoints: 2180,
      topPerformer: 'Michael Weber',
      progress: 65,
      color: 'bg-green-500',
    },
    {
      name: 'Vertrieb',
      participants: 4,
      averagePoints: 2090,
      topPerformer: 'Anna Müller',
      progress: 58,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline" className="text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Breakdown */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Abteilungs-Übersicht</h3>
            <Badge variant="outline">
              {timeRange === 'week' ? 'Diese Woche' : 
               timeRange === 'month' ? 'Dieser Monat' : 
               'Alle Zeit'}
            </Badge>
          </div>
          
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{dept.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {dept.participants} Teilnehmer • Top: {dept.topPerformer}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {dept.averagePoints.toLocaleString()} XP
                    </div>
                    <p className="text-sm text-muted-foreground">Durchschnitt</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Leistung vs. Ziel</span>
                    <span>{dept.progress}%</span>
                  </div>
                  <Progress value={dept.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}