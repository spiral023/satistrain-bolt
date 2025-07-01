'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BookOpen,
  Trophy,
  MessageSquare,
  Brain,
  Clock,
  ChevronRight,
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'course_completed',
    title: 'Kurs abgeschlossen',
    description: 'Empathische Kommunikation',
    time: 'vor 2 Stunden',
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 2,
    type: 'badge_earned',
    title: 'Neues Abzeichen erhalten',
    description: 'Kommunikationsexperte 🗣️',
    time: 'vor 3 Stunden',
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    id: 3,
    type: 'simulation_completed',
    title: 'Simulation abgeschlossen',
    description: 'Kundenbeschwerde - Bewertung: 95%',
    time: 'vor 1 Tag',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 4,
    type: 'discussion',
    title: 'Diskussion beigetreten',
    description: 'Beste Praktiken für Deeskalation',
    time: 'vor 2 Tagen',
    icon: MessageSquare,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 5,
    type: 'microlearning',
    title: 'Mikro-Lernen abgeschlossen',
    description: 'Aktives Zuhören in 5 Minuten',
    time: 'vor 3 Tagen',
    icon: Clock,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: 'Team-Quest: Empathie-Woche',
    description: 'Sammle 500 Empathie-Punkte mit deinem Team',
    deadline: '5 Tage verbleibend',
    progress: 60,
    type: 'quest',
  },
  {
    id: 2,
    title: 'Modul 3: Konfliktlösung',
    description: 'Grundlagen der Kundenkommunikation',
    deadline: 'Fällig morgen',
    progress: 80,
    type: 'course',
  },
  {
    id: 3,
    title: 'Wöchentliche Simulation',
    description: 'Übe schwierige Kundengespräche',
    deadline: '2 Tage verbleibend',
    progress: 0,
    type: 'simulation',
  },
];

export function ActivityFeed() {
  return (
    <div className="space-y-6">
      {/* Anstehende Aufgaben */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Anstehende Aufgaben
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {task.deadline}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {task.progress}% abgeschlossen
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Aktivitätsverlauf */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Letzte Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <div className={`p-2 rounded-full ${activity.bgColor}`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}