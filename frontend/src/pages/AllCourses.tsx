import { useEffect, useState } from "react";
import CourseCard, { Lesson, Course } from "../components/CourseCard"; // Adjust the path to where the Card component is located
import AxiosCourseService from "../components/AxiosCourseService";
import AxiosLessonService from "../components/AxiosLessonService";
import axios from "axios";
import AxiosEnrollmentService from "../components/AxiosEnrollmentService";
import AuthService from "../components/AuthService";

// Show all courses for the user's program and be able to select one and go it's page
// If user is teacher show a form to create a new course
// Use authService to get logged in user's info, use the axios services for http requests
export default function AllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 4; // Number of card components per page
  const totalCards = 30; // Total number of card items
  const totalPages = Math.ceil(totalCards / itemsPerPage);

  // Dummy data for card components
  // const cardData = Array.from({ length: totalCards }, (_, index) => ({
  //   title: `Data Structures & Algorithms ${index + 1}`,
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.",
  //   link: "https://example.com",
  // }));

  const dummyLessons: Lesson[] = [
    { lesson_plan_id: 1, title: "Lesson 1", content: "Content 1", lp_created_at: "2021-09-01", lp_updated_at: "2021-09-01" },
    { lesson_plan_id: 2, title: "Lesson 2", content: "Content 2", lp_created_at: "2021-09-02", lp_updated_at: "2021-09-02" },
    { lesson_plan_id: 3, title: "Lesson 3", content: "Content 3", lp_created_at: "2021-09-03", lp_updated_at: "2021-09-03" }
  ];

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // const enrollmentsData = await AxiosEnrollmentService.getEnrollments(1);
        const enrollmentsData = await AxiosEnrollmentService.getEnrollments(AuthService.getLoggedInUserId());
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


  const handleRemoveCourse = (courseId: number) => {
    setCourses(courses.filter(course => course.course_id !== courseId));
  };

  // Get the card components for the current page
  const currentCards = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!AuthService.isLoggedIn()) {
    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            <h5>Please log in to view your courses</h5>
            <button onClick={() => window.location.href = "/login"} className="btn btn-nav-sm bg-primary text-white font-light text-left hover:text-secondary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300">Login</button>
        </div>
    );
  }

  if (courses.length === 0) {
    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            <h5>Unlock your potential today</h5>
            <button onClick={() => window.location.href = "/allprograms"}
              className="btn text-white bg-primary glass hover:bg-accent transition duration-300 py-2.5 px-5 rounded shadow-md hover:translate-y-[-2px]">
                Our Programs
            </button>
        </div>
    );
  }


  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {error && <p>Error: {error}</p>}
        {currentCards.map((course) => (
          <CourseCard
            key={course.course_id}
            course={course}
            onRemoveCourse={handleRemoveCourse}
          />
        ))}
      </div>
      <div className="flex justify-between items-center w-full max-w-md px-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn-sm hover:glass bg-orange-500/80 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn-sm hover:glass bg-orange-500/80 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
