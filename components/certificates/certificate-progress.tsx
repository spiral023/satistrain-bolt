'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  Clock,
  Star,
  TrendingUp,
  Calendar,
  Award,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Zap,
} from 'lucide-react';

const progressData = [
  {
    id: 'digital-comm',
    title: 'Digitale Kommunikation',
    category: 'Kurs-Zertifikat',
    progress: 75,
    currentStep: 'Modul 3: Social Media Kommunikation',
    totalSteps: 4,
    completedSteps: 3,
    estimatedCompletion: '2024-02-15',
    requirements: [
      { name: 'Alle Module abschließen', completed: true },
      { name: 'Abschlussprüfung bestehen (80%+)', completed: false },
      { name: 'Praxisprojekt einreichen', completed: false },
    ],
    nextMilestone: 'Abschlussprüfung',
    timeToComplete: '5 Tage',
    icon: Target,
    color: 'text-blue-500',
  },
  {
    id: 'leadership',
    title: 'Führungskompetenzen',
    category: 'Fähigkeiten-Zertifikat',
    progress: 45,
    currentStep: 'Modul 2: Teamführung',
    totalSteps: 5,
    completedSteps: 2,
    estimatedCompletion: '2024-03-01',
    requirements: [
      { name: 'Führungstheorie verstehen', completed: true },
      { name: 'Praktische Übungen absolvieren', completed: true },
      { name: 'Peer-Feedback sammeln', completed: false },
      { name: 'Führungsprojekt leiten', completed: false },
      { name: 'Abschlusspräsentation halten', completed: false },
    ],
    nextMilestone: 'Peer-Feedback Phase',
    timeToComplete: '3 Wochen',
    icon: Star,
    color: 'text-purple-500',
  },
  {
    id: 'data-analysis',
    title: 'Datenanalyse im Kundenservice',
    category: 'Experten-Zertifikat',
    progress: 20,
    currentStep: 'Modul 1: Grundlagen der Datenanalyse',
    totalSteps: 6,
    completedSteps: 1,
    estimatedCompletion: '2024-04-10',
    requirements: [
      { name: 'Grundlagen erlernen', completed: true },
      { name: 'Tools beherrschen', completed: false },
      { name: 'Fallstudien bearbeiten', completed: false },
      { name: 'Eigene Analyse durchführen', completed: false },
      { name: 'Präsentation erstellen', completed: false },
      { name: 'Peer-Review bestehen', completed: false },
    ],
    nextMilestone: 'Tool-Training',
    timeToComplete: '8 Wochen',
    icon: TrendingUp,
    color: 'text-green-500',
  },
];

const upcomingDeadlines = [
  {
    title: 'Digitale Kommunikation - Abschlussprüfung',
    date: '2024-02-10',
    daysLeft: 5,
    priority: 'high',
  },
  {
    title: 'Führungskompetenzen - Peer-Feedback',
    date: '2024-02-20',
    daysLeft: 15,
    priority: 'medium',
  },
  {
    title: 'Datenanalyse - Tool-Assessment',
    date: '2024-03-01',
    daysLeft: 24,
    priority: 'low',
  },
];

const achievements = [
  {
    title: 'Schneller Lerner',
    description: 'Kurs 25% schneller als geplant abgeschlossen',
    earned: '2024-01-20',
    icon: Zap,
    color: 'text-yellow-500',
  },
  {
    title: 'Perfektionist',
    description: 'Alle Prüfungen mit 95%+ bestanden',
    earned: '2024-01-15',
    icon: Star,
    color: 'text-purple-500',
  },
  {
    title: 'Ausdauer',
    description: '30 Tage kontinuierliches Lernen',
    earned: '2024-01-10',
    icon: Target,
    color: 'text-green-500',
  },
];

const priorityColors = {
  high: 'text-red-500 bg-red-500/10',
  medium: 'text-orange-500 bg-orange-500/10',
  low: 'text-green-500 bg-green-500/10',
};

export function CertificateProgress() {
  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">3</div>
            <p className="text-sm text-muted-foreground">In Bearbeitung</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">47%</div>
            <p className="text-sm text-muted-foreground">Ø Fortschritt</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">6</div>
            <p className="text-sm text-muted-foreground">Wochen verbleibend</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Certifications */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Aktive Zertifizierungen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {progressData.map((cert) => (
              <div key={cert.id} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${cert.color.split('-')[1]}-500/10`}>
                      <cert.icon className={`h-5 w-5 ${cert.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.category}</p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {cert.completedSteps}/{cert.totalSteps} Module
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Fortschritt</span>
                    <span>{cert.progress}%</span>
                  </div>
                  <Progress value={cert.progress} className="h-2" />
                  
                  <div className="text-sm text-muted-foreground">
                    Aktuell: {cert.currentStep}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Nächster Meilenstein: </span>
                      <span className="font-medium">{cert.nextMilestone}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {cert.timeToComplete}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Anforderungen:</h4>
                  <div className="space-y-1">
                    {cert.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {req.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                        )}
                        <span className={req.completed ? 'line-through text-muted-foreground' : ''}>
                          {req.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Fortsetzen
                  </Button>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Deadlines */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              Anstehende Termine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                  <div>
                    <h4 className="font-medium">{deadline.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(deadline.date).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={priorityColors[deadline.priority as keyof typeof priorityColors]}>
                      {deadline.daysLeft} Tage
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Kürzliche Erfolge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                  <div className={`p-2 rounded-full bg-${achievement.color.split('-')[1]}-500/10`}>
                    <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(achievement.earned).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Path Recommendation */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Empfohlener Lernpfad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Basierend auf Ihrem aktuellen Fortschritt empfehlen wir Ihnen, sich auf die 
              Digitale Kommunikation zu konzentrieren, da Sie kurz vor dem Abschluss stehen.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h4 className="font-medium">Nächste Schritte:</h4>
                <ol className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>1. Abschlussprüfung für Digitale Kommunikation vorbereiten</li>
                  <li>2. Peer-Feedback für Führungskompetenzen sammeln</li>
                  <li>3. Tool-Training für Datenanalyse beginnen</li>
                </ol>
              </div>
              <Button>
                Lernplan anzeigen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}