'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Database } from '@/lib/database.types';
import {
  BookOpen,
  Clock,
  Star,
  Users,
  TrendingUp,
  Sparkles,
  Target,
  Brain,
} from 'lucide-react';

type Course = Database['public']['Tables']['course']['Row'];
type Enrollment = Database['public']['Tables']['enrollment']['Row'] & {
  course: Course;
};

interface RecommendedCoursesProps {
  enrollments: Enrollment[];
  onEnroll: (courseId: string) => void;
}

const recommendedCourses = [
  {
    id: 'rec-1',
    title: 'KI-gestützte Kundenanalyse',
    description: 'Lernen Sie, wie Sie KI-Tools nutzen, um Kundenbedürfnisse besser zu verstehen und personalisierte Lösungen anzubieten.',
    difficulty: 3,
    estimatedHours: 4,
    rating: 4.9,
    participants: 856,
    category: 'Technologie',
    reason: 'Basierend auf Ihren Simulationsergebnissen',
    trending: true,
    new: true,
  },
  {
    id: 'rec-2',
    title: 'Emotionale Intelligenz im Kundenservice',
    description: 'Entwickeln Sie Ihre emotionale Intelligenz, um schwierige Kundensituationen souverän zu meistern.',
    difficulty: 2,
    estimatedHours: 3,
    rating: 4.8,
    participants: 1240,
    category: 'Soft Skills',
    reason: 'Empfohlen für Ihre Rolle',
    trending: false,
    new: false,
  },
  {
    id: 'rec-3',
    title: 'Omnichannel-Kundenbetreuung',
    description: 'Meistern Sie die nahtlose Kundenbetreuung über alle Kanäle hinweg - von E-Mail bis Social Media.',
    difficulty: 4,
    estimatedHours: 5,
    rating: 4.7,
    participants: 623,
    category: 'Strategie',
    reason: 'Beliebte Wahl in Ihrem Team',
    trending: true,
    new: false,
  },
  {
    id: 'rec-4',
    title: 'Krisenmanagement und Deeskalation',
    description: 'Professionelle Techniken zur Bewältigung von Krisensituationen und zur Deeskalation von Konflikten.',
    difficulty: 3,
    estimatedHours: 4,
    rating: 4.9,
    participants: 945,
    category: 'Krisenmanagement',
    reason: 'Ergänzt Ihre abgeschlossenen Kurse',
    trending: false,
    new: true,
  },
];

const difficultyLabels = {
  1: 'Anfänger',
  2: 'Fortgeschritten',
  3: 'Experte',
  4: 'Profi',
  5: 'Meister',
};

const difficultyColors = {
  1: 'bg-green-500/10 text-green-500',
  2: 'bg-blue-500/10 text-blue-500',
  3: 'bg-yellow-500/10 text-yellow-500',
  4: 'bg-orange-500/10 text-orange-500',
  5: 'bg-red-500/10 text-red-500',
};

const categoryIcons = {
  'Technologie': Brain,
  'Soft Skills': Target,
  'Strategie': TrendingUp,
  'Krisenmanagement': Sparkles,
};

export function RecommendedCourses({ enrollments, onEnroll }: RecommendedCoursesProps) {
  const [loadingEnroll, setLoadingEnroll] = useState<string | null>(null);

  const handleEnroll = async (courseId: string) => {
    setLoadingEnroll(courseId);
    try {
      await onEnroll(courseId);
    } finally {
      setLoadingEnroll(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Empfohlene Kurse</h2>
        <p className="text-muted-foreground">
          Personalisierte Empfehlungen basierend auf Ihrem Lernfortschritt und Ihren Zielen
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {recommendedCourses.map((course) => {
          const CategoryIcon = categoryIcons[course.category as keyof typeof categoryIcons] || BookOpen;
          
          return (
            <Card key={course.id} className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {course.new && (
                        <Badge className="bg-green-500 text-white">NEU</Badge>
                      )}
                      {course.trending && (
                        <Badge variant="outline" className="text-orange-500 border-orange-500">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    
                    <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={difficultyColors[course.difficulty as keyof typeof difficultyColors]}>
                        {difficultyLabels[course.difficulty as keyof typeof difficultyLabels]}
                      </Badge>
                      <Badge variant="outline">
                        <CategoryIcon className="h-3 w-3 mr-1" />
                        {course.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-sm">
                      <CategoryIcon className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.estimatedHours}h
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.participants.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {course.rating}
                  </div>
                </div>

                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Empfohlen:</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.reason}
                  </p>
                </div>

                <Button 
                  onClick={() => handleEnroll(course.id)}
                  disabled={loadingEnroll === course.id}
                  className="w-full"
                >
                  {loadingEnroll === course.id ? 'Einschreiben...' : 'Jetzt einschreiben'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">KI-Empfehlungsengine</h3>
              <p className="text-sm text-muted-foreground">
                Unsere KI analysiert Ihren Lernfortschritt, Ihre Simulationsergebnisse und Teamtrends, 
                um Ihnen die relevantesten Kurse zu empfehlen.
              </p>
            </div>
            <Button variant="outline">
              Mehr erfahren
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}