'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Play,
  Clock,
  Star,
  CheckCircle,
  Zap,
  Brain,
  Coffee,
  Target,
  Heart,
  BookOpen,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';

interface MicroLearningGridProps {
  category: string;
  onComplete: (id: string) => void;
}

const microLearningItems = [
  {
    id: '1',
    title: 'Aktives Zuhören in 3 Minuten',
    description: 'Lernen Sie die Grundlagen des aktiven Zuhörens mit praktischen Übungen.',
    duration: 3,
    type: 'interactive',
    category: 'quick-tips',
    difficulty: 'Anfänger',
    points: 15,
    completed: false,
    rating: 4.8,
    participants: 1240,
    icon: MessageSquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: '2',
    title: 'Empathie-Boost: Kundenperspektive',
    description: 'Schnelle Techniken, um sich in die Lage des Kunden zu versetzen.',
    duration: 4,
    type: 'scenario',
    category: 'scenarios',
    difficulty: 'Fortgeschritten',
    points: 20,
    completed: true,
    rating: 4.9,
    participants: 856,
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    id: '3',
    title: 'Kaffeepausen-Kommunikation',
    description: 'Verbessern Sie Ihre Kommunikation während kurzer Pausen.',
    duration: 5,
    type: 'tips',
    category: 'coffee-break',
    difficulty: 'Anfänger',
    points: 10,
    completed: false,
    rating: 4.6,
    participants: 623,
    icon: Coffee,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    id: '4',
    title: 'Deeskalation in 60 Sekunden',
    description: 'Schnelle Techniken zur Beruhigung aufgebrachter Kunden.',
    duration: 2,
    type: 'quick-win',
    category: 'daily-dose',
    difficulty: 'Experte',
    points: 25,
    completed: false,
    rating: 4.9,
    participants: 945,
    icon: Target,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: '5',
    title: 'Positive Sprache verwenden',
    description: 'Transformieren Sie negative Aussagen in positive Lösungen.',
    duration: 3,
    type: 'interactive',
    category: 'quick-tips',
    difficulty: 'Anfänger',
    points: 15,
    completed: false,
    rating: 4.7,
    participants: 1120,
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    id: '6',
    title: 'Schwierige Fragen meistern',
    description: 'Strategien für den Umgang mit herausfordernden Kundenfragen.',
    duration: 4,
    type: 'scenario',
    category: 'scenarios',
    difficulty: 'Fortgeschritten',
    points: 20,
    completed: true,
    rating: 4.8,
    participants: 734,
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

const typeLabels = {
  interactive: 'Interaktiv',
  scenario: 'Szenario',
  tips: 'Tipps',
  'quick-win': 'Quick Win',
};

const difficultyColors = {
  'Anfänger': 'bg-green-500/10 text-green-500',
  'Fortgeschritten': 'bg-blue-500/10 text-blue-500',
  'Experte': 'bg-red-500/10 text-red-500',
};

export function MicroLearningGrid({ category, onComplete }: MicroLearningGridProps) {
  const [completingId, setCompletingId] = useState<string | null>(null);

  const filteredItems = category === 'all' 
    ? microLearningItems 
    : microLearningItems.filter(item => item.category === category);

  const handleStart = async (id: string) => {
    setCompletingId(id);
    
    // Simulate completion after 2 seconds
    setTimeout(() => {
      onComplete(id);
      setCompletingId(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {category === 'all' ? 'Alle Mikro-Lerneinheiten' : 'Gefilterte Einheiten'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {filteredItems.length} Einheiten verfügbar
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const ItemIcon = item.icon;
          const isCompleting = completingId === item.id;
          
          return (
            <Card key={item.id} className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.bgColor}`}>
                      <ItemIcon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.duration} Min.
                        </Badge>
                        <Badge variant="outline" className={difficultyColors[item.difficulty as keyof typeof difficultyColors]}>
                          {item.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {item.completed && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {item.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {item.participants}
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    {item.points} XP
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {typeLabels[item.type as keyof typeof typeLabels]}
                  </Badge>
                </div>

                {isCompleting ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Wird abgeschlossen...</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleStart(item.id)}
                    className="w-full"
                    variant={item.completed ? "outline" : "default"}
                  >
                    {item.completed ? (
                      <>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Wiederholen
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Jetzt starten
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}