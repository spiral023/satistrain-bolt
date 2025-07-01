'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Heart,
  Brain,
  Target,
  Zap,
  Clock,
  Play,
  TrendingUp,
} from 'lucide-react';

const quickTopics = [
  {
    id: 'active-listening',
    title: 'Aktives Zuhören',
    description: 'Grundlagen und Techniken für besseres Zuhören',
    duration: '2-3 Min.',
    lessons: 5,
    icon: MessageSquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    trending: true,
  },
  {
    id: 'empathy-building',
    title: 'Empathie aufbauen',
    description: 'Verstehen und mitfühlen mit Kunden',
    duration: '3-4 Min.',
    lessons: 4,
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    trending: false,
  },
  {
    id: 'problem-solving',
    title: 'Problemlösung',
    description: 'Schnelle Lösungsansätze für Kundenprobleme',
    duration: '4-5 Min.',
    lessons: 6,
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    trending: true,
  },
  {
    id: 'goal-setting',
    title: 'Ziele setzen',
    description: 'Klare Ziele in Kundengesprächen definieren',
    duration: '2-3 Min.',
    lessons: 3,
    icon: Target,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    trending: false,
  },
  {
    id: 'quick-wins',
    title: 'Schnelle Erfolge',
    description: 'Sofort umsetzbare Tipps für besseren Service',
    duration: '1-2 Min.',
    lessons: 8,
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    trending: true,
  },
];

const featuredTopic = {
  title: 'Deeskalations-Techniken',
  description: 'Lernen Sie, wie Sie schwierige Situationen entschärfen und Kunden beruhigen können.',
  duration: '5 Min.',
  lessons: 3,
  difficulty: 'Fortgeschritten',
  rating: 4.9,
  completions: 1240,
};

export function QuickTopics() {
  return (
    <div className="space-y-6">
      {/* Featured Topic */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Empfohlenes Thema
            </CardTitle>
            <Badge className="bg-primary text-primary-foreground">
              Beliebt
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{featuredTopic.title}</h3>
            <p className="text-muted-foreground mb-4">
              {featuredTopic.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {featuredTopic.duration}
              </div>
              <div>{featuredTopic.lessons} Lektionen</div>
              <div>⭐ {featuredTopic.rating}</div>
              <div>{featuredTopic.completions} Abschlüsse</div>
            </div>
          </div>

          <Button className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Jetzt starten
          </Button>
        </CardContent>
      </Card>

      {/* Quick Topics Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Schnellthemen</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickTopics.map((topic) => (
            <Card key={topic.id} className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${topic.bgColor}`}>
                    <topic.icon className={`h-6 w-6 ${topic.color}`} />
                  </div>
                  {topic.trending && (
                    <Badge variant="outline" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {topic.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {topic.duration}
                  </div>
                  <div>{topic.lessons} Lektionen</div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Starten
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}