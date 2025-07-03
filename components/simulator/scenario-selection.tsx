'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Play,
  Clock,
  Star,
  Users,
  Target,
  Heart,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Zap,
  Brain,
} from 'lucide-react';

interface ScenarioSelectionProps {
  mode: string;
  onStartSimulation: (scenario: any) => void;
}

const scenarios = [
  {
    id: 'complaint-refund',
    title: 'Rückerstattungsanfrage',
    description: 'Ein Kunde ist unzufrieden mit seinem Kauf und möchte eine Rückerstattung.',
    category: 'Beschwerden',
    difficulty: 'Mittel',
    duration: '10-15 Min.',
    personality: 'frustrated',
    objectives: [
      'Empathie zeigen',
      'Rückerstattungsrichtlinien erklären',
      'Alternative Lösungen anbieten',
    ],
    skills: ['Empathie', 'Problemlösung', 'Richtlinien'],
    initialMessage: 'Hallo, ich bin sehr unzufrieden mit meinem Kauf und möchte mein Geld zurück!',
    icon: AlertTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    completions: 1240,
    rating: 4.2,
  },
  {
    id: 'technical-support',
    title: 'Technischer Support',
    description: 'Ein Kunde hat technische Probleme mit einem Produkt und benötigt Hilfe.',
    category: 'Support',
    difficulty: 'Hoch',
    duration: '15-20 Min.',
    personality: 'confused',
    objectives: [
      'Problem diagnostizieren',
      'Schritt-für-Schritt Anleitung geben',
      'Geduld bewahren',
    ],
    skills: ['Technisches Wissen', 'Geduld', 'Kommunikation'],
    initialMessage: 'Hi, ich verstehe nicht, warum mein Gerät nicht funktioniert. Können Sie mir helfen?',
    icon: Brain,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    completions: 856,
    rating: 4.5,
  },
  {
    id: 'billing-inquiry',
    title: 'Rechnungsanfrage',
    description: 'Ein Kunde hat Fragen zu seiner Rechnung und möchte Erklärungen.',
    category: 'Abrechnung',
    difficulty: 'Niedrig',
    duration: '5-10 Min.',
    personality: 'polite',
    objectives: [
      'Rechnung erklären',
      'Transparenz schaffen',
      'Vertrauen aufbauen',
    ],
    skills: ['Erklärung', 'Transparenz', 'Freundlichkeit'],
    initialMessage: 'Guten Tag, ich habe eine Frage zu meiner letzten Rechnung. Können Sie mir dabei helfen?',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    completions: 2100,
    rating: 4.8,
  },
  {
    id: 'product-recommendation',
    title: 'Produktberatung',
    description: 'Ein Kunde sucht nach dem passenden Produkt und benötigt Beratung.',
    category: 'Beratung',
    difficulty: 'Mittel',
    duration: '10-15 Min.',
    personality: 'confused',
    objectives: [
      'Bedürfnisse ermitteln',
      'Passende Produkte vorschlagen',
      'Kaufentscheidung unterstützen',
    ],
    skills: ['Beratung', 'Produktwissen', 'Verkauf'],
    initialMessage: 'Hallo, ich suche nach einem neuen Produkt, bin mir aber nicht sicher, was am besten zu mir passt.',
    icon: Target,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    completions: 1680,
    rating: 4.6,
  },
  {
    id: 'delivery-issue',
    title: 'Lieferproblem',
    description: 'Ein Kunde hat Probleme mit der Lieferung und ist verärgert.',
    category: 'Logistik',
    difficulty: 'Hoch',
    duration: '10-15 Min.',
    personality: 'frustrated',
    objectives: [
      'Situation beruhigen',
      'Lieferstatus prüfen',
      'Lösung finden',
    ],
    skills: ['Deeskalation', 'Problemlösung', 'Empathie'],
    initialMessage: 'Meine Bestellung sollte schon längst da sein! Das ist inakzeptabel!',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    completions: 945,
    rating: 4.1,
  },
  {
    id: 'account-access',
    title: 'Kontoprobleme',
    description: 'Ein Kunde kann nicht auf sein Konto zugreifen und benötigt Hilfe.',
    category: 'Account',
    difficulty: 'Mittel',
    duration: '8-12 Min.',
    personality: 'confused',
    objectives: [
      'Identität verifizieren',
      'Sicherheitsmaßnahmen erklären',
      'Zugang wiederherstellen',
    ],
    skills: ['Sicherheit', 'Verifikation', 'Geduld'],
    initialMessage: 'Ich kann mich nicht in mein Konto einloggen. Können Sie mir dabei helfen?',
    icon: Brain,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    completions: 1320,
    rating: 4.4,
  },
];

const categories = [
  { id: 'all', name: 'Alle', count: scenarios.length },
  { id: 'Beschwerden', name: 'Beschwerden', count: scenarios.filter(s => s.category === 'Beschwerden').length },
  { id: 'Support', name: 'Support', count: scenarios.filter(s => s.category === 'Support').length },
  { id: 'Abrechnung', name: 'Abrechnung', count: scenarios.filter(s => s.category === 'Abrechnung').length },
  { id: 'Beratung', name: 'Beratung', count: scenarios.filter(s => s.category === 'Beratung').length },
  { id: 'Logistik', name: 'Logistik', count: scenarios.filter(s => s.category === 'Logistik').length },
  { id: 'Account', name: 'Account', count: scenarios.filter(s => s.category === 'Account').length },
];

const difficultyColors = {
  'Niedrig': 'bg-green-500/10 text-green-500',
  'Mittel': 'bg-yellow-500/10 text-yellow-500',
  'Hoch': 'bg-red-500/10 text-red-500',
};

export function ScenarioSelection({ mode, onStartSimulation }: ScenarioSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredScenarios = scenarios.filter(scenario => {
    const matchesSearch = scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scenario.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scenario.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szenarien durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Mode Info */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">
                {mode === 'guided' ? 'Geführter Modus' : 
                 mode === 'free' ? 'Freier Modus' : 
                 'Herausforderungs-Modus'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {mode === 'guided' ? 'Erhalten Sie Tipps und Anleitungen während der Simulation' : 
                 mode === 'free' ? 'Führen Sie das Gespräch ohne Hilfestellungen' : 
                 'Meistern Sie besonders schwierige Kundensituationen'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenarios Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredScenarios.map((scenario) => (
          <Card key={scenario.id} className={`bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group border-2 ${scenario.borderColor}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${scenario.bgColor}`}>
                    <scenario.icon className={`h-6 w-6 ${scenario.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {scenario.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {scenario.category}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${difficultyColors[scenario.difficulty as keyof typeof difficultyColors]}`}>
                        {scenario.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {scenario.description}
              </p>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {scenario.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {scenario.completions.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  {scenario.rating}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Lernziele:</h4>
                <div className="flex flex-wrap gap-1">
                  {scenario.objectives.slice(0, 2).map((objective, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {objective}
                    </Badge>
                  ))}
                  {scenario.objectives.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{scenario.objectives.length - 2} weitere
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Trainierte Fähigkeiten:</h4>
                <div className="flex flex-wrap gap-1">
                  {scenario.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => onStartSimulation(scenario)}
                className="w-full"
              >
                <Play className="h-4 w-4 mr-2" />
                Simulation starten
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredScenarios.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Keine Szenarien gefunden
          </h3>
          <p className="text-muted-foreground">
            Versuchen Sie andere Suchbegriffe oder Filter.
          </p>
        </div>
      )}
    </div>
  );
}