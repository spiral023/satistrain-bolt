'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { SimulatorInterface } from '@/components/simulator/simulator-interface';
import { ScenarioSelection } from '@/components/simulator/scenario-selection';
import { SimulationHistory } from '@/components/simulator/simulation-history';
import { PerformanceAnalytics } from '@/components/simulator/performance-analytics';
import { SimulationSettings } from '@/components/simulator/simulation-settings';
import { LiveFeedback } from '@/components/simulator/live-feedback';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import {
  Brain,
  Play,
  Pause,
  RotateCcw,
  Settings,
  BarChart3,
  History,
  Zap,
  Target,
  MessageSquare,
  Users,
  Trophy,
  Star,
} from 'lucide-react';

const simulationModes = [
  {
    id: 'guided',
    name: 'Geführt',
    description: 'Schritt-für-Schritt Anleitung',
    icon: Target,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    difficulty: 'Anfänger',
  },
  {
    id: 'free',
    name: 'Freies Gespräch',
    description: 'Offene Konversation',
    icon: MessageSquare,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    difficulty: 'Fortgeschritten',
  },
  {
    id: 'challenge',
    name: 'Herausforderung',
    description: 'Schwierige Szenarien',
    icon: Trophy,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    difficulty: 'Experte',
  },
];

export default function SimulatorPage() {
  const { user } = useAuth();
  const [currentMode, setCurrentMode] = useState('guided');
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [simulationStats, setSimulationStats] = useState({
    totalSessions: 32,
    averageScore: 87,
    bestScore: 96,
    hoursSpent: 12.5,
    currentStreak: 5,
  });

  const handleStartSimulation = (scenario: any) => {
    setSelectedScenario(scenario);
    setIsSimulationActive(true);
  };

  const handleEndSimulation = () => {
    setIsSimulationActive(false);
    setSelectedScenario(null);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-500" />
                KI-Simulator
                <Badge className="bg-purple-500 text-white">NEU</Badge>
              </h1>
              <p className="text-sm text-muted-foreground">
                Üben Sie realistische Kundengespräche mit fortschrittlicher KI
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Zap className="h-3 w-3" />
                {simulationStats.currentStreak} Tage Streak
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Star className="h-3 w-3" />
                Ø {simulationStats.averageScore}% Score
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Einstellungen
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {!isSimulationActive ? (
            <div className="h-full overflow-auto p-6">
              <div className="max-w-7xl mx-auto space-y-6">
                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-500">
                        {simulationStats.totalSessions}
                      </div>
                      <p className="text-sm text-muted-foreground">Simulationen</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-500">
                        {simulationStats.averageScore}%
                      </div>
                      <p className="text-sm text-muted-foreground">Ø Bewertung</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-500">
                        {simulationStats.bestScore}%
                      </div>
                      <p className="text-sm text-muted-foreground">Beste Bewertung</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-500">
                        {simulationStats.hoursSpent}h
                      </div>
                      <p className="text-sm text-muted-foreground">Übungszeit</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-500">
                        {simulationStats.currentStreak}
                      </div>
                      <p className="text-sm text-muted-foreground">Tage Streak</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Mode Selection */}
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Simulationsmodus wählen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {simulationModes.map((mode) => (
                        <Button
                          key={mode.id}
                          variant={currentMode === mode.id ? "secondary" : "outline"}
                          className="h-auto p-4 flex flex-col items-center gap-3"
                          onClick={() => setCurrentMode(mode.id)}
                        >
                          <div className={`p-3 rounded-full ${mode.bgColor}`}>
                            <mode.icon className={`h-6 w-6 ${mode.color}`} />
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{mode.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {mode.description}
                            </p>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {mode.difficulty}
                            </Badge>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Main Content Tabs */}
                <Tabs defaultValue="scenarios" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="scenarios">
                      Szenarien
                    </TabsTrigger>
                    <TabsTrigger value="analytics">
                      Leistung
                    </TabsTrigger>
                    <TabsTrigger value="history">
                      Verlauf
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                      Einstellungen
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="scenarios" className="space-y-6">
                    <ScenarioSelection 
                      mode={currentMode}
                      onStartSimulation={handleStartSimulation}
                    />
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-6">
                    <PerformanceAnalytics 
                      stats={simulationStats}
                    />
                  </TabsContent>

                  <TabsContent value="history" className="space-y-6">
                    <SimulationHistory />
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-6">
                    <SimulationSettings />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ) : (
            <div className="h-full flex">
              <div className="flex-1">
                <SimulatorInterface 
                  scenario={selectedScenario}
                  mode={currentMode}
                  onEndSimulation={handleEndSimulation}
                />
              </div>
              <div className="w-80 border-l border-border">
                <LiveFeedback 
                  scenario={selectedScenario}
                  mode={currentMode}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}