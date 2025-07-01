'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy,
  Star,
  Crown,
  Medal,
  Award,
  Heart,
  Brain,
  Target,
  Users,
  Zap,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Lock,
} from 'lucide-react';

const badgeCategories = [
  { id: 'all', name: 'Alle', count: 25 },
  { id: 'learning', name: 'Lernen', count: 8 },
  { id: 'simulation', name: 'Simulationen', count: 6 },
  { id: 'social', name: 'Sozial', count: 4 },
  { id: 'special', name: 'Besondere', count: 7 },
];

const badges = [
  {
    id: 'first-lesson',
    name: 'Erste Schritte',
    emoji: '🌟',
    description: 'Erste Lektion abgeschlossen',
    category: 'learning',
    rarity: 'common',
    earned: true,
    earnedDate: '2024-01-15',
    points: 10,
  },
  {
    id: 'communication-expert',
    name: 'Kommunikationsexperte',
    emoji: '🗣️',
    description: '10 Simulationen erfolgreich abgeschlossen',
    category: 'simulation',
    rarity: 'rare',
    earned: true,
    earnedDate: '2024-01-18',
    points: 100,
  },
  {
    id: 'empathy-champion',
    name: 'Empathie-Champion',
    emoji: '❤️',
    description: 'Hohe Empathie-Bewertung in 5 Simulationen',
    category: 'simulation',
    rarity: 'epic',
    earned: true,
    earnedDate: '2024-01-22',
    points: 150,
  },
  {
    id: 'problem-solver',
    name: 'Problemlöser',
    emoji: '🧩',
    description: 'Schwierige Kundenprobleme gelöst',
    category: 'simulation',
    rarity: 'rare',
    earned: true,
    earnedDate: '2024-01-20',
    points: 200,
  },
  {
    id: 'team-player',
    name: 'Teamplayer',
    emoji: '🤝',
    description: 'Anderen Teammitgliedern geholfen',
    category: 'social',
    rarity: 'common',
    earned: true,
    earnedDate: '2024-01-25',
    points: 75,
  },
  {
    id: 'learning-enthusiast',
    name: 'Lernbegeisterter',
    emoji: '📚',
    description: 'Alle verfügbaren Kurse abgeschlossen',
    category: 'learning',
    rarity: 'legendary',
    earned: false,
    progress: 60,
    points: 500,
  },
  {
    id: 'streak-master',
    name: 'Streak-Meister',
    emoji: '🔥',
    description: '30 Tage in Folge gelernt',
    category: 'learning',
    rarity: 'epic',
    earned: false,
    progress: 23,
    points: 300,
  },
  {
    id: 'mentor',
    name: 'Mentor',
    emoji: '👨‍🏫',
    description: '5 neue Teammitglieder betreut',
    category: 'social',
    rarity: 'rare',
    earned: false,
    progress: 40,
    points: 250,
  },
  {
    id: 'perfectionist',
    name: 'Perfektionist',
    emoji: '💎',
    description: '100% in allen Kursen erreicht',
    category: 'special',
    rarity: 'legendary',
    earned: false,
    locked: true,
    points: 1000,
  },
];

const rarityColors = {
  common: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  rare: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  epic: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  legendary: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
};

export function BadgeCollection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const earnedBadges = badges.filter(badge => badge.earned);
  const totalBadges = badges.length;

  return (
    <div className="space-y-6">
      {/* Collection Overview */}
      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Meine Abzeichen-Sammlung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">
                {earnedBadges.length}
              </div>
              <p className="text-sm text-muted-foreground">Gesammelte Abzeichen</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">
                {Math.round((earnedBadges.length / totalBadges) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Sammlung vollständig</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">
                {earnedBadges.filter(b => b.rarity === 'epic' || b.rarity === 'legendary').length}
              </div>
              <p className="text-sm text-muted-foreground">Seltene Abzeichen</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {badgeCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredBadges.map((badge) => (
              <Card 
                key={badge.id} 
                className={`bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 cursor-pointer ${
                  badge.earned ? `border-2 ${rarityColors[badge.rarity].replace('bg-', 'border-').replace('/20', '/30')}` : ''
                } ${badge.locked ? 'opacity-60' : ''}`}
                onClick={() => setSelectedBadge(badge.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="space-y-4">
                    {/* Badge Icon */}
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                      badge.locked ? 'bg-muted' : badge.earned ? rarityColors[badge.rarity] : 'bg-muted/50'
                    }`}>
                      {badge.locked ? '🔒' : badge.emoji}
                    </div>

                    {/* Badge Info */}
                    <div className="space-y-2">
                      <h3 className={`font-semibold ${
                        badge.earned ? 'text-foreground' : badge.locked ? 'text-muted-foreground' : 'text-muted-foreground'
                      }`}>
                        {badge.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>

                    {/* Rarity & Points */}
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className={`text-xs ${rarityColors[badge.rarity]}`}>
                        {badge.rarity}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        {badge.points} XP
                      </Badge>
                    </div>

                    {/* Status */}
                    {badge.earned && (
                      <div className="text-center">
                        <Badge className="bg-green-500 text-white">
                          Erreicht am {badge.earnedDate}
                        </Badge>
                      </div>
                    )}

                    {badge.progress !== undefined && !badge.earned && !badge.locked && (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                          Fortschritt: {badge.progress}%
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${badge.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {badge.locked && (
                      <div className="text-center">
                        <Lock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          Erreiche Level 10
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Badges */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Kürzlich erhalten
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {earnedBadges.slice(0, 5).map((badge) => (
              <div key={badge.id} className="flex-shrink-0 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${rarityColors[badge.rarity]}`}>
                  {badge.emoji}
                </div>
                <p className="text-xs font-medium">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.earnedDate}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}