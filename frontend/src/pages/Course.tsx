import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard"; // Assuming the CourseCard component is imported correctly
import AxiosEnrollmentService from "../components/AxiosEnrollmentService";
import AuthService from "../components/AuthService";
import { Course } from "../utils/types"; // Adjust the path based on your project structure
import AxiosLessonService from "../components/AxiosLessonService";

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const enrollmentsData = await AxiosEnrollmentService.getEnrollments(
          AuthService.getLoggedInUserId(),
        );
        const courseData = enrollmentsData.map(
          (enrollment: { course: Course }) => enrollment.course,
        );

        // Fetch lessons for each course
        const courseWithLessonsData = await Promise.all(
          courseData.map(async (course: Course) => {
            const lessonsData = await AxiosLessonService.getAllByCourse(
              course.course_id,
            );
            return {
              ...course,
              lessons: lessonsData || [],
            };
          }),
        );
        setCourses(courseWithLessonsData);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (AuthService.isLoggedIn()) {
      fetchCourseData();
    }
  }, []);

  const handleRemoveCourse = (courseId: number) => {
    setCourses(courses.filter((course) => course.course_id !== courseId));
  };

  if (!AuthService.isLoggedIn()) {
    return (
      <div className="flex flex-col items-center min-h-screen p-6">
        <h1>Please log in to view your courses</h1>
        <button
          onClick={() => (window.location.href = "/login")}
          className="btn btn-nav-sm bg-primary text-white font-light text-left hover:text-secondary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center min-h-screen p-6">
        Loading your courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center min-h-screen p-6">
        <h1>Error</h1>
        <p>{error}</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="btn btn-nav-sm bg-primary text-white font-light text-left hover:text-secondary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center min-h-screen p-6">
        <h1>You are not enrolled in any courses</h1>
        <button
          onClick={() => (window.location.href = "/allprograms")}
          className="btn text-white bg-primary glass hover:bg-accent transition duration-300 py-2.5 px-5 rounded shadow-md hover:translate-y-[-2px]"
        >
          Explore Our Programs
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-full p-6">
      <h1 className="text-2xl font-bold mb-4">List of Your Courses</h1>
      <div className="flex flex-col space-y-4 w-full max-w-4xl">
        {courses.map((course) => (
          <div
            key={course.course_id}
            className="card bg-base-200 w-full shadow-xl border-b-2 border-gray-300"
          >
            <div className="card-body flex flex-row items-center justify-between">
              <div className="flex flex-col justify-between">
                <h2 className="card-title">{course.courseName}</h2>
                <p>{course.description}</p>
                <p>
                  <strong>Teacher ID:</strong> {course.teacherId}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(course.course_created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(course.course_updated_at).toLocaleString()}
                </p>
              </div>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => console.log(`Course ID: ${course.course_id}`)}
                >
                  Click here
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
