'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  CheckCircle,
  Play,
  Lock,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Video,
  Headphones,
} from 'lucide-react';
import { useState } from 'react';

interface CourseSidebarProps {
  course: any;
  progress: any[];
  currentLesson: any;
  onLessonSelect: (lesson: any) => void;
}

const contentTypeIcons = {
  video: Video,
  text: FileText,
  audio: Headphones,
};

export function CourseSidebar({ course, progress, currentLesson, onLessonSelect }: CourseSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getLessonProgress = (lessonId: string) => {
    return progress.find(p => p.lesson_id === lessonId);
  };

  const isLessonCompleted = (lessonId: string) => {
    const lessonProgress = getLessonProgress(lessonId);
    return lessonProgress?.completed_at;
  };

  const isLessonCurrent = (lesson: any) => {
    return currentLesson?.id === lesson.id;
  };

  return (
    <div className="w-80 border-l border-border bg-card/30 backdrop-blur-sm">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Kursinhalt</h3>
        <p className="text-sm text-muted-foreground">
          {course.module?.length || 0} Module • {
            course.module?.reduce((sum: number, module: any) => 
              sum + (module.lesson?.length || 0), 0) || 0
          } Lektionen
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {course.module?.map((module: any, moduleIndex: number) => {
            const moduleProgress = module.lesson?.filter((lesson: any) => 
              isLessonCompleted(lesson.id)
            ).length || 0;
            const totalLessons = module.lesson?.length || 0;
            const isExpanded = expandedModules.includes(module.id);
            
            return (
              <Collapsible key={module.id} open={isExpanded}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-3 h-auto"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <div className="text-left">
                        <div className="font-medium">
                          {moduleIndex + 1}. {module.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {moduleProgress}/{totalLessons} Lektionen
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {Math.round((moduleProgress / totalLessons) * 100)}%
                    </Badge>
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-1 ml-4">
                  {module.lesson?.map((lesson: any, lessonIndex: number) => {
                    const completed = isLessonCompleted(lesson.id);
                    const current = isLessonCurrent(lesson);
                    const ContentIcon = contentTypeIcons[lesson.content_type as keyof typeof contentTypeIcons] || FileText;
                    
                    return (
                      <Button
                        key={lesson.id}
                        variant={current ? "secondary" : "ghost"}
                        className={`w-full justify-start p-3 h-auto ${
                          current ? 'bg-primary/10 border border-primary/20' : ''
                        }`}
                        onClick={() => onLessonSelect(lesson)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0">
                            {completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : current ? (
                              <Play className="h-4 w-4 text-primary" />
                            ) : (
                              <ContentIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm">
                              {lessonIndex + 1}. {lesson.title}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {lesson.estimated_minutes} Min.
                              {completed && (
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  ✓
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}