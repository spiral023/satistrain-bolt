'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize,
  CheckCircle,
  Clock,
  FileText,
  Video,
  Headphones,
} from 'lucide-react';

interface CourseContentProps {
  lesson: any;
  onComplete: (lessonId: string, score?: number) => void;
}

const contentTypes = {
  video: {
    icon: Video,
    label: 'Video',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  text: {
    icon: FileText,
    label: 'Text',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  audio: {
    icon: Headphones,
    label: 'Audio',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
};

export function CourseContent({ lesson, onComplete }: CourseContentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Keine Lektion ausgewählt
          </h3>
          <p className="text-muted-foreground">
            Wählen Sie eine Lektion aus der Seitenleiste aus, um zu beginnen.
          </p>
        </div>
      </div>
    );
  }

  const contentType = contentTypes[lesson.content_type as keyof typeof contentTypes] || contentTypes.text;
  const ContentIcon = contentType.icon;

  const handleComplete = () => {
    setCompleted(true);
    onComplete(lesson.id, 95); // Mock score
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    
    // Simulate progress
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Lesson Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {lesson.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline" className={`${contentType.color} ${contentType.bgColor}`}>
                <ContentIcon className="h-3 w-3 mr-1" />
                {contentType.label}
              </Badge>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {lesson.estimated_minutes} Min.
              </div>
              {completed && (
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Abgeschlossen
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            {lesson.content_type === 'video' && (
              <div className="aspect-video bg-black rounded-t-lg relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <ContentIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Video-Inhalt</p>
                    <p className="text-sm opacity-75">Klicken Sie auf Play, um zu starten</p>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlayback}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex-1 mx-4">
                      <Progress value={progress} className="h-1" />
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-6">
              {lesson.content_type === 'text' && (
                <div className="prose prose-invert max-w-none">
                  <h3>Grundlagen der empathischen Kommunikation</h3>
                  <p>
                    Empathische Kommunikation ist der Schlüssel zu exzellentem Kundenservice. 
                    In dieser Lektion lernen Sie die wichtigsten Prinzipien und Techniken kennen, 
                    um eine echte Verbindung zu Ihren Kunden aufzubauen.
                  </p>
                  
                  <h4>Die vier Säulen der Empathie</h4>
                  <ol>
                    <li><strong>Aktives Zuhören:</strong> Geben Sie Ihrem Kunden Ihre volle Aufmerksamkeit</li>
                    <li><strong>Perspektivwechsel:</strong> Versetzen Sie sich in die Lage des Kunden</li>
                    <li><strong>Emotionale Validierung:</strong> Erkennen und bestätigen Sie die Gefühle des Kunden</li>
                    <li><strong>Lösungsorientierung:</strong> Fokussieren Sie sich auf konstruktive Lösungen</li>
                  </ol>
                  
                  <h4>Praktische Anwendung</h4>
                  <p>
                    Verwenden Sie Phrasen wie &quot;Ich verstehe, dass das frustrierend für Sie sein muss&quot; oder &quot;Lassen Sie mich sehen, wie ich Ihnen am besten helfen kann&quot;. Diese zeigen Verständnis und Bereitschaft zur Problemlösung.
                  </p>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 my-6">
                    <h5 className="text-blue-400 font-semibold mb-2">💡 Praxis-Tipp</h5>
                    <p className="text-sm">
                      Üben Sie empathische Antworten in unseren KI-Simulationen. 
                      Das System bewertet Ihre Empathie-Fähigkeiten in Echtzeit!
                    </p>
                  </div>
                </div>
              )}
              
              {lesson.content_type === 'audio' && (
                <div className="text-center py-12">
                  <Headphones className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Audio-Lektion</h3>
                  <p className="text-muted-foreground mb-6">
                    Hören Sie sich die Audio-Inhalte an und folgen Sie den Anweisungen.
                  </p>
                  
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                      <Button onClick={togglePlayback}>
                        {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        {isPlaying ? 'Pausieren' : 'Abspielen'}
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(progress)}% abgespielt
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lesson Actions */}
        <div className="flex items-center justify-between">
          <Button variant="outline">
            <SkipBack className="h-4 w-4 mr-2" />
            Vorherige Lektion
          </Button>
          
          <div className="flex items-center gap-4">
            {!completed && progress >= 80 && (
              <Button onClick={handleComplete}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Lektion abschließen
              </Button>
            )}
            
            <Button>
              Nächste Lektion
              <SkipForward className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
