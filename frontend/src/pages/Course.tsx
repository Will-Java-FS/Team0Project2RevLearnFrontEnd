import { useEffect, useState } from "react";
import AxiosCourseService from "../components/AxiosCourseService"; // Adjust import path
import CourseCard, { Lesson, Course } from "../components/CourseCard";
import AxiosLessonService from "../components/AxiosLessonService";
import AxiosEnrollmentService from "../components/AxiosEnrollmentService";
import AuthService from "../components/AuthService";

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // const enrollmentsData = await AxiosEnrollmentService.getEnrollments(1);
        const enrollmentsData = await AxiosEnrollmentService.getEnrollments(AuthService.loggedInUserId());
        const courseData = enrollmentsData.map((enrollment: { course: Course }) => enrollment.course);
        const courseWithLessonsData = await Promise.all(
          courseData.map(async (course: Course) => {
            const lessonsData = await AxiosLessonService.getAllByCourse(course.course_id);
            return {
              ...course,
              lessons: lessonsData || [],
            };
          })
        );
        
        setCourses(courseWithLessonsData);
        // console.log(dummyLessons);
        // console.log(lessonsData);
        
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError((error as Error).message)
      }
    };

    // if (AuthService.isLoggedIn()) 
    fetchCourseData();
  }, []);

  if (!AuthService.isLoggedIn()) {
    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            <h1>Please log in to view your courses</h1>
            <button onClick={() => window.location.href = "/login"} className="btn btn-nav-sm bg-primary text-white font-light text-left hover:text-secondary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300">Login</button>
        </div>
    );
  }

  if (courses.length === 0) {
    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            <h1>Unlock your potential today</h1>
            <button onClick={() => window.location.href = "/allprograms"}
              className="btn text-white bg-primary glass hover:bg-accent transition duration-300 py-2.5 px-5 rounded shadow-md hover:translate-y-[-2px]">
                Our Programs
            </button>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1>List of your courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {error && <p>Error: {error}</p>}
        {courses.map((course) => (
          <CourseCard
            key={course.course_id}
            course={course}
          />
        ))}
      </div>
    </div>
  );
}
