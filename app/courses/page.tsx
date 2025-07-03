'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { CourseGrid } from '@/components/courses/course-grid';
import { CourseFilters } from '@/components/courses/course-filters';
import { CourseSearch } from '@/components/courses/course-search';
import { EnrollmentStats } from '@/components/courses/enrollment-stats';
import { RecommendedCourses } from '@/components/courses/recommended-courses';
import { LearningPath } from '@/components/courses/learning-path';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { coursesApi, EnrollmentWithCourse } from '@/lib/api/courses';
import { Database } from '@/lib/database.types';
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  TrendingUp,
  Filter,
  Search,
  Plus,
} from 'lucide-react';

type Course = Database['public']['Tables']['course']['Row'];

export default function CoursesPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [userEnrollments, allCourses] = await Promise.all([
        coursesApi.getUserEnrollments(user!.id),
        coursesApi.getCourses(),
      ]);

      setEnrollments(userEnrollments);

      // Filter out courses user is already enrolled in
      const enrolledCourseIds = userEnrollments.map(e => e.course.id);
      const available = allCourses.filter(course => !enrolledCourseIds.includes(course.id));
      setAvailableCourses(available);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) return;
    
    try {
      await coursesApi.enrollInCourse(user.id, courseId);
      await loadData(); // Reload data to update UI
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         enrollment.course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && enrollment.status === selectedFilter;
  });

  const filteredAvailableCourses = availableCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Meine Kurse</h1>
              <p className="text-sm text-muted-foreground">
                Verwalten Sie Ihre Lernreise und entdecken Sie neue Kurse
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Kurs hinzufügen
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Overview */}
            <EnrollmentStats enrollments={enrollments} />

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <CourseSearch 
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
              <CourseFilters 
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
              />
            </div>

            {/* Course Tabs */}
            <Tabs defaultValue="enrolled" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="enrolled">
                  Eingeschrieben ({enrollments.length})
                </TabsTrigger>
                <TabsTrigger value="available">
                  Verfügbar ({availableCourses.length})
                </TabsTrigger>
                <TabsTrigger value="path">
                  Lernpfad
                </TabsTrigger>
                <TabsTrigger value="recommended">
                  Empfohlen
                </TabsTrigger>
              </TabsList>

              <TabsContent value="enrolled" className="space-y-6">
                {loading ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                          <div className="h-2 bg-muted rounded w-full mb-2"></div>
                          <div className="h-8 bg-muted rounded w-full"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <CourseGrid 
                    enrollments={filteredEnrollments}
                    type="enrolled"
                  />
                )}
              </TabsContent>

              <TabsContent value="available" className="space-y-6">
                <CourseGrid 
                  courses={filteredAvailableCourses}
                  type="available"
                  onEnroll={handleEnroll}
                />
              </TabsContent>

              <TabsContent value="path" className="space-y-6">
                <LearningPath enrollments={enrollments} />
              </TabsContent>

              <TabsContent value="recommended" className="space-y-6">
                <RecommendedCourses 
                  enrollments={enrollments}
                  onEnroll={handleEnroll}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
