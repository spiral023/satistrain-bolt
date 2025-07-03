'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/navigation/sidebar';
import { CourseHeader } from '@/components/courses/course-header';
import { CourseContent } from '@/components/courses/course-content';
import { CourseProgress } from '@/components/courses/course-progress';
import { CourseSidebar } from '@/components/courses/course-sidebar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/hooks/use-auth';
import { coursesApi } from '@/lib/api/courses';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<any>(null);

  const loadCourseData = useCallback(async () => {
    if (!user || !id) return;
    try {
      setLoading(true);
      
      const [courseDetails, userEnrollments, courseProgress] = await Promise.all([
        coursesApi.getCourseDetails(id as string),
        coursesApi.getUserEnrollments(user.id),
        coursesApi.getCourseProgress(user.id, id as string),
      ]);

      setCourse(courseDetails);
      setProgress(courseProgress);
      
      const userEnrollment = userEnrollments.find(e => e.course_id === id);
      setEnrollment(userEnrollment);

      // Set first lesson as current if no progress exists
      if (courseDetails?.module?.[0]?.lesson?.[0] && courseProgress.length === 0) {
        setCurrentLesson(courseDetails.module[0].lesson[0]);
      } else if (courseProgress.length > 0) {
        // Find the next incomplete lesson or the last completed one
        const lastProgress = courseProgress[courseProgress.length - 1];
        setCurrentLesson(lastProgress.lesson);
      }
    } catch (error) {
      console.error('Error loading course data:', error);
    } finally {
      setLoading(false);
    }
  }, [user, id]);

  useEffect(() => {
    loadCourseData();
  }, [loadCourseData]);

  const handleLessonComplete = async (lessonId: string, score?: number) => {
    if (!user) return;
    
    try {
      await coursesApi.updateLessonProgress(user.id, lessonId, score, 300); // 5 minutes default
      await loadCourseData(); // Reload to update progress
    } catch (error) {
      console.error('Error updating lesson progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!course || !enrollment) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Kurs nicht gefunden</h2>
            <p className="text-muted-foreground mb-4">
              Sie sind nicht in diesem Kurs eingeschrieben oder der Kurs existiert nicht.
            </p>
            <button 
              onClick={() => router.push('/courses')}
              className="text-primary hover:underline"
            >
              Zurück zu den Kursen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
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
    </div>
  );
}
