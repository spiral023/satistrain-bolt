'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  Volume2,
  Mic,
  Brain,
  Clock,
  Target,
  MessageSquare,
  Zap,
  Eye,
  Bell,
  Shield,
} from 'lucide-react';

export function SimulationSettings() {
  const [settings, setSettings] = useState({
    // Audio Settings
    soundEnabled: true,
    voiceEnabled: false,
    volume: [75],
    
    // AI Settings
    aiDifficulty: [3],
    responseDelay: [2],
    personalityVariation: true,
    
    // Feedback Settings
    realTimeFeedback: true,
    detailedAnalysis: true,
    scoreVisibility: true,
    
    // Interface Settings
    darkMode: true,
    animations: true,
    notifications: true,
    
    // Privacy Settings
    dataCollection: true,
    analytics: true,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Audio & Voice Settings */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-blue-500" />
            Audio & Sprache
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="sound-enabled">Soundeffekte</Label>
              <p className="text-sm text-muted-foreground">
                Aktiviert Benachrichtigungstöne und Feedback-Sounds
              </p>
            </div>
            <Switch
              id="sound-enabled"
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="voice-enabled">Spracheingabe</Label>
              <p className="text-sm text-muted-foreground">
                Ermöglicht Antworten per Mikrofon
              </p>
              <Badge variant="outline" className="text-xs">
                Beta
              </Badge>
            </div>
            <Switch
              id="voice-enabled"
              checked={settings.voiceEnabled}
              onCheckedChange={(checked) => updateSetting('voiceEnabled', checked)}
            />
          </div>

          <div className="space-y-3">
            <Label>Lautstärke: {settings.volume[0]}%</Label>
            <Slider
              value={settings.volume}
              onValueChange={(value) => updateSetting('volume', value)}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* AI Behavior Settings */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            KI-Verhalten
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>
              KI-Schwierigkeit: {
                settings.aiDifficulty[0] === 1 ? 'Einfach' :
                settings.aiDifficulty[0] === 2 ? 'Leicht' :
                settings.aiDifficulty[0] === 3 ? 'Mittel' :
                settings.aiDifficulty[0] === 4 ? 'Schwer' : 'Experte'
              }
            </Label>
            <p className="text-sm text-muted-foreground">
              Bestimmt, wie herausfordernd die KI-Kunden reagieren
            </p>
            <Slider
              value={settings.aiDifficulty}
              onValueChange={(value) => updateSetting('aiDifficulty', value)}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>
              Antwortgeschwindigkeit: {
                settings.responseDelay[0] === 1 ? 'Sofort' :
                settings.responseDelay[0] === 2 ? 'Schnell' :
                settings.responseDelay[0] === 3 ? 'Normal' :
                settings.responseDelay[0] === 4 ? 'Langsam' : 'Sehr langsam'
              }
            </Label>
            <p className="text-sm text-muted-foreground">
              Wie schnell die KI auf Ihre Nachrichten antwortet
            </p>
            <Slider
              value={settings.responseDelay}
              onValueChange={(value) => updateSetting('responseDelay', value)}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="personality-variation">Persönlichkeits-Variation</Label>
              <p className="text-sm text-muted-foreground">
                KI zeigt unterschiedliche Persönlichkeiten und Stimmungen
              </p>
            </div>
            <Switch
              id="personality-variation"
              checked={settings.personalityVariation}
              onCheckedChange={(checked) => updateSetting('personalityVariation', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Feedback Settings */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Feedback & Bewertung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="realtime-feedback">Echtzeit-Feedback</Label>
              <p className="text-sm text-muted-foreground">
                Zeigt sofortiges Feedback während der Simulation
              </p>
            </div>
            <Switch
              id="realtime-feedback"
              checked={settings.realTimeFeedback}
              onCheckedChange={(checked) => updateSetting('realTimeFeedback', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="detailed-analysis">Detaillierte Analyse</Label>
              <p className="text-sm text-muted-foreground">
                Umfassende Bewertung nach jeder Simulation
              </p>
            </div>
            <Switch
              id="detailed-analysis"
              checked={settings.detailedAnalysis}
              onCheckedChange={(checked) => updateSetting('detailedAnalysis', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="score-visibility">Bewertungen anzeigen</Label>
              <p className="text-sm text-muted-foreground">
                Zeigt Punktzahlen während der Simulation
              </p>
            </div>
            <Switch
              id="score-visibility"
              checked={settings.scoreVisibility}
              onCheckedChange={(checked) => updateSetting('scoreVisibility', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Interface Settings */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-orange-500" />
            Benutzeroberfläche
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="animations">Animationen</Label>
              <p className="text-sm text-muted-foreground">
                Aktiviert Übergangsanimationen und Effekte
              </p>
            </div>
            <Switch
              id="animations"
              checked={settings.animations}
              onCheckedChange={(checked) => updateSetting('animations', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="notifications">Benachrichtigungen</Label>
              <p className="text-sm text-muted-foreground">
                Zeigt Erfolge und wichtige Updates
              </p>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting('notifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Datenschutz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="data-collection">Datensammlung</Label>
              <p className="text-sm text-muted-foreground">
                Erlaubt die Sammlung von Leistungsdaten zur Verbesserung
              </p>
            </div>
            <Switch
              id="data-collection"
              checked={settings.dataCollection}
              onCheckedChange={(checked) => updateSetting('dataCollection', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="analytics">Nutzungsanalyse</Label>
              <p className="text-sm text-muted-foreground">
                Hilft bei der Verbesserung der Plattform durch anonyme Daten
              </p>
            </div>
            <Switch
              id="analytics"
              checked={settings.analytics}
              onCheckedChange={(checked) => updateSetting('analytics', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1">
          Einstellungen speichern
        </Button>
        <Button variant="outline">
          Auf Standard zurücksetzen
        </Button>
      </div>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-500 mb-1">Optimierungstipps</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Aktivieren Sie Echtzeit-Feedback für schnelleres Lernen</li>
                <li>• Erhöhen Sie die KI-Schwierigkeit schrittweise</li>
                <li>• Nutzen Sie Spracheingabe für realistischere Übung</li>
                <li>• Deaktivieren Sie Bewertungen für stressfreies Üben</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}