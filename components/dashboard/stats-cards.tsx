'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock,
  TrendingUp,
  Star,
} from 'lucide-react';

// Move static data outside component to prevent recreation on every render
const STATS_DATA = [
  {
    title: 'Aktive Kurse',
    value: '3',
    description: '2 in Bearbeitung',
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Abzeichen',
    value: '12',
    description: '3 diese Woche',
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    title: 'Lernstreak',
    value: '7 Tage',
    description: 'Persönlicher Rekord',
    icon: Target,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'Lernzeit diese Woche',
    value: '4.5h',
    description: 'Ziel: 6h',
    icon: Clock,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

const ACHIEVEMENTS_DATA: {
  name: string;
  description: string;
  rarity: Rarity;
  earned: boolean;
  progress?: number;
  total?: number;
}[] = [
  {
    name: 'Kommunikationsexperte',
    description: '10 Simulationen erfolgreich abgeschlossen',
    rarity: 'rare',
    earned: true,
  },
  {
    name: 'Empathie-Champion',
    description: 'Hohe Empathie-Bewertung in 5 Simulationen',
    rarity: 'epic',
    earned: true,
  },
  {
    name: 'Problemlöser',
    description: 'Schwierige Kundenprobleme gelöst',
    rarity: 'rare',
    earned: false,
    progress: 3,
    total: 5,
  },
];

const RARITY_COLORS: Record<Rarity, string> = {
  common: 'bg-gray-500/20 text-gray-300',
  rare: 'bg-blue-500/20 text-blue-300',
  epic: 'bg-purple-500/20 text-purple-300',
  legendary: 'bg-yellow-500/20 text-yellow-300',
};

// Memoized component to prevent unnecessary re-renders
export const StatsCards = React.memo(function StatsCards() {
  return (
    <div className="space-y-6">
      {/* Hauptstatistiken */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STATS_DATA.map((stat) => (
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lernfortschritt */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Wöchentlicher Fortschritt</h3>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              +15% diese Woche
            </Badge>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Lernziel (6 Stunden)</span>
                <span>4.5h / 6h</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Kurse abgeschlossen</span>
                  <span>2 / 3</span>
                </div>
                <Progress value={67} className="h-1" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Simulationen</span>
                  <span>8 / 10</span>
                </div>
                <Progress value={80} className="h-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Erfolge */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Neueste Erfolge</h3>
            <Badge variant="outline">12 / 25 Abzeichen</Badge>
          </div>
          <div className="space-y-3">
            {ACHIEVEMENTS_DATA.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  achievement.earned 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-muted/50 border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      achievement.earned ? 'bg-green-500/20' : 'bg-muted'
                    }`}>
                      {achievement.earned ? (
                        <Star className="h-4 w-4 text-green-400" />
                      ) : (
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={RARITY_COLORS[achievement.rarity]}
                    >
                      {achievement.rarity}
                    </Badge>
                    {!achievement.earned && achievement.progress && (
                      <span className="text-xs text-muted-foreground">
                        {achievement.progress}/{achievement.total}
                      </span>
                    )}
                  </div>
                </div>
                {!achievement.earned && achievement.progress && achievement.total && (
                  <div className="mt-2">
                    <Progress
                      value={(achievement.progress / achievement.total) * 100}
                      className="h-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

StatsCards.displayName = 'StatsCards';
