'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Heart,
  MessageSquare,
  Target,
  Brain,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Zap,
} from 'lucide-react';

interface LiveFeedbackProps {
  scenario: any;
  mode: string;
}

const feedbackCategories = [
  {
    id: 'empathy',
    name: 'Empathie',
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    id: 'clarity',
    name: 'Klarheit',
    icon: MessageSquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'helpfulness',
    name: 'Hilfsbereitschaft',
    icon: Target,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 'problem_solving',
    name: 'Problemlösung',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

const liveTips = [
  {
    id: '1',
    type: 'suggestion',
    title: 'Empathie zeigen',
    message: 'Versuchen Sie, die Gefühle des Kunden zu verstehen und zu validieren.',
    icon: Heart,
    color: 'text-blue-500',
    timestamp: '2 Min. ago',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Zu technisch',
    message: 'Ihre Erklärung könnte für den Kunden zu komplex sein.',
    icon: AlertCircle,
    color: 'text-orange-500',
    timestamp: '1 Min. ago',
  },
  {
    id: '3',
    type: 'success',
    title: 'Gute Lösung',
    message: 'Ausgezeichnet! Sie haben eine praktische Lösung angeboten.',
    icon: CheckCircle,
    color: 'text-green-500',
    timestamp: 'Gerade eben',
  },
];

const currentScores = {
  empathy: 87,
  clarity: 82,
  helpfulness: 90,
  problem_solving: 85,
  overall: 86,
};

const sessionProgress = {
  messagesExchanged: 12,
  timeElapsed: '08:34',
  customerSatisfaction: 78,
  goalProgress: 65,
};

const improvementSuggestions = [
  {
    category: 'Empathie',
    suggestion: 'Verwenden Sie mehr emotionale Validierung',
    example: '"Ich verstehe, dass das frustrierend sein muss..."',
    impact: 'Hoch',
  },
  {
    category: 'Klarheit',
    suggestion: 'Strukturieren Sie Ihre Antworten',
    example: 'Verwenden Sie "Erstens, zweitens, drittens..."',
    impact: 'Mittel',
  },
  {
    category: 'Hilfsbereitschaft',
    suggestion: 'Bieten Sie konkrete nächste Schritte an',
    example: '"Hier ist, was wir als nächstes tun können..."',
    impact: 'Hoch',
  },
];

export function LiveFeedback({ scenario, mode }: LiveFeedbackProps) {
  const [activeTab, setActiveTab] = useState('scores');
  const [realtimeUpdates, setRealtimeUpdates] = useState(true);

  return (
    <div className="h-full flex flex-col bg-card/30 backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Live-Feedback
        </h3>
        <p className="text-sm text-muted-foreground">
          Echtzeit-Analyse Ihrer Performance
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('scores')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'scores'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Bewertungen
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'tips'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Tipps
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'progress'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Fortschritt
          </button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        {activeTab === 'scores' && (
          <div className="space-y-4">
            {/* Overall Score */}
            <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {currentScores.overall}%
                </div>
                <p className="text-sm text-muted-foreground">Gesamtbewertung</p>
                <Badge variant="outline" className="mt-2 text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3% seit letzter Nachricht
                </Badge>
              </CardContent>
            </Card>

            {/* Category Scores */}
            <div className="space-y-3">
              {feedbackCategories.map((category) => {
                const score = currentScores[category.id as keyof typeof currentScores];
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <category.icon className={`h-4 w-4 ${category.color}`} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm font-bold">{score}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                );
              })}
            </div>

            {/* Score Trends */}
            <Card className="bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Trend-Analyse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Empathie</span>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-3 w-3" />
                    +5%
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Klarheit</span>
                  <div className="flex items-center gap-1 text-red-500">
                    <TrendingDown className="h-3 w-3" />
                    -2%
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Hilfsbereitschaft</span>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-3 w-3" />
                    +8%
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-4">
            {/* Live Tips */}
            <div className="space-y-3">
              {liveTips.map((tip) => (
                <Card key={tip.id} className="bg-card/50">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-1 rounded-full ${
                        tip.type === 'success' ? 'bg-green-500/10' :
                        tip.type === 'warning' ? 'bg-orange-500/10' :
                        'bg-blue-500/10'
                      }`}>
                        <tip.icon className={`h-4 w-4 ${tip.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{tip.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {tip.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {tip.timestamp}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Improvement Suggestions */}
            <Card className="bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Verbesserungsvorschläge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {improvementSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-2 bg-muted/20 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{suggestion.category}</span>
                      <Badge variant="outline" className={`text-xs ${
                        suggestion.impact === 'Hoch' ? 'text-red-500' : 'text-yellow-500'
                      }`}>
                        {suggestion.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {suggestion.suggestion}
                    </p>
                    <p className="text-xs text-blue-500 italic">
                      {suggestion.example}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-4">
            {/* Session Progress */}
            <Card className="bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Sitzungsfortschritt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Nachrichten</span>
                  <span className="text-sm font-bold">{sessionProgress.messagesExchanged}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Zeit</span>
                  <span className="text-sm font-bold">{sessionProgress.timeElapsed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Kundenzufriedenheit</span>
                  <span className="text-sm font-bold">{sessionProgress.customerSatisfaction}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Goal Progress */}
            <Card className="bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Zielfortschritt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Szenario-Ziele</span>
                    <span>{sessionProgress.goalProgress}%</span>
                  </div>
                  <Progress value={sessionProgress.goalProgress} className="h-2" />
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Empathie gezeigt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Problem verstanden</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-orange-500" />
                    <span>Lösung angeboten</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Indicators */}
            <Card className="bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Leistungsindikatoren</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Antwortzeit</span>
                  <Badge variant="outline" className="text-green-500">Gut</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Nachrichtenlänge</span>
                  <Badge variant="outline" className="text-blue-500">Optimal</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Ton & Stil</span>
                  <Badge variant="outline" className="text-green-500">Professionell</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Live-Updates</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Aktiv</span>
          </div>
        </div>
      </div>
    </div>
  );
}