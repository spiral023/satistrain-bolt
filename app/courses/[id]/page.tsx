'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/navigation/sidebar';
import { CourseHeader } from '@/components/courses/course-header';
import { CourseContent } from '@/components/courses/course-content';
import { CourseProgress } from '@/components/courses/course-progress';
import { CourseSidebar } from '@/components/courses/course-sidebar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingOverlay } from '@/components/ui/loading-states';
import { useAuth } from '@/hooks/use-auth';
import { coursesApi } from '@/lib/api/courses';
import { Database } from '@/lib/database.types';
import { LEARNING } from '@/lib/constants';

type Course = Database['public']['Tables']['course']['Row'] & {
  module?: Array<{
    id: string;
    title: string;
    lesson?: Array<{
      id: string;
      title: string;
      content_type: string;
      estimated_minutes: number;
    }>;
  }>;
};

type Enrollment = Database['public']['Tables']['enrollment']['Row'];
type Progress = Database['public']['Tables']['progress']['Row'] & {
  lesson?: Lesson;
};
type Lesson = {
  id: string;
  title: string;
  content_type: string;
  estimated_minutes: number;
};

/**
 * Determines the current lesson a student should be working on
 * @param course - The course data with modules and lessons
 * @param progress - Array of completed lesson progress records
 * @returns The lesson to display, or null if no lessons available
 */
const determineCurrentLesson = (course: Course, progress: Progress[]): Lesson | null => {
  // Return null if course has no lessons
  if (!course?.module?.[0]?.lesson?.[0]) return null;
  
  // If no progress exists, start with the first lesson
  if (progress.length === 0) {
    return course.module[0].lesson[0];
  }
  
  // Return the lesson from the most recent progress entry
  const lastProgress = progress[progress.length - 1];
  return lastProgress.lesson || null;
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const loadCourseData = useCallback(async () => {
    if (!user || !id) return;
    try {
      setLoading(true);
      
      const [courseResult, enrollmentsResult, progressResult] = await Promise.allSettled([
        coursesApi.getCourseDetails(id as string),
        coursesApi.getUserEnrollments(user.id),
        coursesApi.getCourseProgress(user.id, id as string),
      ]);

      const courseDetails = courseResult.status === 'fulfilled' ? courseResult.value : null;
      const userEnrollments = enrollmentsResult.status === 'fulfilled' ? enrollmentsResult.value : [];
      const courseProgress = progressResult.status === 'fulfilled' ? progressResult.value : [];

      if (!courseDetails) {
        throw new Error('Kurs konnte nicht geladen werden');
      }

      setCourse(courseDetails);
      setProgress(courseProgress);
      
      const userEnrollment = userEnrollments.find(e => e.course_id === id);
      setEnrollment(userEnrollment || null);

      // Set current lesson based on progress
      const currentLesson = determineCurrentLesson(courseDetails, courseProgress);
      setCurrentLesson(currentLesson);
    } catch (error) {
      console.error('Error loading course data:', error);
    } finally {
      setLoading(false);
    }
  }, [user, id]);

  useEffect(() => {
    loadCourseData();
  }, [loadCourseData]);

  /**
   * Handles lesson completion with optimistic UI updates
   * @param lessonId - The ID of the completed lesson
   * @param score - Optional score for the lesson
   */
  const handleLessonComplete = async (lessonId: string, score?: number) => {
    if (!user) return;
    
    setUpdating(true);
    try {
      const updatedProgress = await coursesApi.updateLessonProgress(user.id, lessonId, score, LEARNING.DEFAULT_LESSON_TIME_SECONDS);
      
      // Update local state instead of reloading all data (optimistic update)
      setProgress(prev => {
        const existingIndex = prev.findIndex(p => p.lesson_id === lessonId);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = updatedProgress;
          return updated;
        }
        return [...prev, updatedProgress];
      });
    } catch (error) {
      console.error('Error updating lesson progress:', error);
      // Only reload if update fails to ensure UI stays in sync
      await loadCourseData();
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <ErrorBoundary>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <LoadingSpinner size="lg" />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Kurs wird geladen...</h2>
                <p className="text-muted-foreground">Bitte warten Sie einen Moment.</p>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  if (!course || !enrollment) {
    return (
      <ErrorBoundary>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-6">
              <div className="mb-4">
                <svg 
                  className="w-16 h-16 mx-auto text-muted-foreground"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Kurs nicht gefunden</h2>
              <p className="text-muted-foreground mb-6">
                Sie sind nicht in diesem Kurs eingeschrieben oder der Kurs existiert nicht.
              </p>
              <button 
                onClick={() => router.push('/courses')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Zurück zu den Kursen
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-background">
        <Sidebar />
        
        <LoadingOverlay isLoading={updating} loadingText="Fortschritt wird gespeichert...">
          <div className="flex-1 flex flex-col overflow-hidden">
            <CourseHeader 
              course={course} 
              enrollment={enrollment}
              progress={progress}
            />
            
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 flex flex-col">
                <CourseProgress 
                  course={course}
                  progress={progress}
                />
                
                <div className="flex-1 overflow-auto">
                  <CourseContent 
                    lesson={currentLesson}
                    onComplete={handleLessonComplete}
                  />
                </div>
              </div>
              
              <CourseSidebar 
                course={course}
                progress={progress}
                currentLesson={currentLesson}
                onLessonSelect={setCurrentLesson}
              />
            </div>
          </div>
        </LoadingOverlay>
      </div>
    </ErrorBoundary>
  );
}
