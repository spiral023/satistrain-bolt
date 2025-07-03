'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Calendar,
  Clock,
  Star,
  TrendingUp,
  TrendingDown,
  Play,
  BarChart3,
  MessageSquare,
  Heart,
  Target,
  Filter,
  Download,
  Eye,
} from 'lucide-react';

const simulationHistory = [
  {
    id: '1',
    scenario: 'Rückerstattungsanfrage',
    category: 'Beschwerden',
    date: '2024-01-28',
    duration: '12:34',
    scores: {
      empathy: 92,
      clarity: 85,
      helpfulness: 88,
      overall: 88,
    },
    feedback: 'Ausgezeichnete empathische Kommunikation. Sehr gute Problemlösung.',
    personality: 'frustrated',
    mode: 'guided',
    improvement: '+5',
    messages: 18,
    status: 'completed',
  },
  {
    id: '2',
    scenario: 'Technischer Support',
    category: 'Support',
    date: '2024-01-27',
    duration: '18:45',
    scores: {
      empathy: 78,
      clarity: 92,
      helpfulness: 85,
      overall: 85,
    },
    feedback: 'Sehr klare Erklärungen. Empathie könnte verbessert werden.',
    personality: 'confused',
    mode: 'free',
    improvement: '+3',
    messages: 24,
    status: 'completed',
  },
  {
    id: '3',
    scenario: 'Rechnungsanfrage',
    category: 'Abrechnung',
    date: '2024-01-26',
    duration: '08:12',
    scores: {
      empathy: 95,
      clarity: 88,
      helpfulness: 90,
      overall: 91,
    },
    feedback: 'Perfekte Balance zwischen Empathie und Effizienz.',
    personality: 'polite',
    mode: 'guided',
    improvement: '+7',
    messages: 12,
    status: 'completed',
  },
  {
    id: '4',
    scenario: 'Produktberatung',
    category: 'Beratung',
    date: '2024-01-25',
    duration: '15:23',
    scores: {
      empathy: 82,
      clarity: 79,
      helpfulness: 94,
      overall: 85,
    },
    feedback: 'Sehr hilfsbereit, aber Kommunikation könnte klarer sein.',
    personality: 'confused',
    mode: 'challenge',
    improvement: '-2',
    messages: 21,
    status: 'completed',
  },
  {
    id: '5',
    scenario: 'Lieferproblem',
    category: 'Logistik',
    date: '2024-01-24',
    duration: '14:56',
    scores: {
      empathy: 88,
      clarity: 83,
      helpfulness: 86,
      overall: 86,
    },
    feedback: 'Gute Deeskalation einer schwierigen Situation.',
    personality: 'frustrated',
    mode: 'free',
    improvement: '+4',
    messages: 19,
    status: 'completed',
  },
  {
    id: '6',
    scenario: 'Kontoprobleme',
    category: 'Account',
    date: '2024-01-23',
    duration: '11:08',
    scores: {
      empathy: 85,
      clarity: 90,
      helpfulness: 87,
      overall: 87,
    },
    feedback: 'Sehr strukturierte Herangehensweise an das Problem.',
    personality: 'confused',
    mode: 'guided',
    improvement: '+6',
    messages: 16,
    status: 'completed',
  },
];

const modeLabels = {
  guided: 'Geführt',
  free: 'Frei',
  challenge: 'Herausforderung',
};

const personalityEmojis = {
  frustrated: '😤',
  confused: '😕',
  polite: '😊',
};

export function SimulationHistory() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const filteredHistory = selectedFilter === 'all' 
    ? simulationHistory 
    : simulationHistory.filter(session => session.category === selectedFilter);

  const averageScore = Math.round(
    simulationHistory.reduce((sum, session) => sum + session.scores.overall, 0) / simulationHistory.length
  );

  const totalTime = simulationHistory.reduce((sum, session) => {
    const [minutes, seconds] = session.duration.split(':').map(Number);
    return sum + minutes + seconds / 60;
  }, 0);

  const categories = [
    { id: 'all', name: 'Alle', count: simulationHistory.length },
    { id: 'Beschwerden', name: 'Beschwerden', count: simulationHistory.filter(s => s.category === 'Beschwerden').length },
    { id: 'Support', name: 'Support', count: simulationHistory.filter(s => s.category === 'Support').length },
    { id: 'Abrechnung', name: 'Abrechnung', count: simulationHistory.filter(s => s.category === 'Abrechnung').length },
    { id: 'Beratung', name: 'Beratung', count: simulationHistory.filter(s => s.category === 'Beratung').length },
    { id: 'Logistik', name: 'Logistik', count: simulationHistory.filter(s => s.category === 'Logistik').length },
    { id: 'Account', name: 'Account', count: simulationHistory.filter(s => s.category === 'Account').length },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">
              {simulationHistory.length}
            </div>
            <p className="text-sm text-muted-foreground">Simulationen</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">
              {averageScore}%
            </div>
            <p className="text-sm text-muted-foreground">Ø Bewertung</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">
              {Math.round(totalTime)}m
            </div>
            <p className="text-sm text-muted-foreground">Gesamtzeit</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              +{Math.round(simulationHistory.reduce((sum, s) => sum + parseInt(s.improvement), 0) / simulationHistory.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Ø Verbesserung</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedFilter === category.id ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(category.id)}
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      {/* History List */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Simulationsverlauf</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredHistory.map((session) => (
              <div 
                key={session.id}
                className="p-4 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">
                      {personalityEmojis[session.personality as keyof typeof personalityEmojis]}
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold">{session.scenario}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {session.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {modeLabels[session.mode as keyof typeof modeLabels]}
                          </Badge>
                          <span>•</span>
                          <Calendar className="h-3 w-3" />
                          {new Date(session.date).toLocaleDateString('de-DE')}
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          {session.duration}
                        </div>
                      </div>
                      
                      <div className="grid gap-2 md:grid-cols-4">
                        <div className="text-center p-2 bg-white/5 rounded">
                          <div className="text-sm font-bold text-red-500">{session.scores.empathy}%</div>
                          <p className="text-xs text-muted-foreground">Empathie</p>
                        </div>
                        <div className="text-center p-2 bg-white/5 rounded">
                          <div className="text-sm font-bold text-blue-500">{session.scores.clarity}%</div>
                          <p className="text-xs text-muted-foreground">Klarheit</p>
                        </div>
                        <div className="text-center p-2 bg-white/5 rounded">
                          <div className="text-sm font-bold text-green-500">{session.scores.helpfulness}%</div>
                          <p className="text-xs text-muted-foreground">Hilfsbereitschaft</p>
                        </div>
                        <div className="text-center p-2 bg-white/5 rounded">
                          <div className="text-sm font-bold text-purple-500">{session.scores.overall}%</div>
                          <p className="text-xs text-muted-foreground">Gesamt</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {session.feedback}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1">
                      {parseInt(session.improvement) > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        parseInt(session.improvement) > 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {session.improvement}%
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {session.messages} Nachrichten
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trend */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Leistungstrend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">+12%</div>
                <p className="text-sm text-muted-foreground">Verbesserung letzte Woche</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">5</div>
                <p className="text-sm text-muted-foreground">Tage Streak</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-500">96%</div>
                <p className="text-sm text-muted-foreground">Beste Bewertung</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Fortschritt nach Kategorien</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Empathie</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Klarheit</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hilfsbereitschaft</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}