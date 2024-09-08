import { useEffect, useState } from "react";
import CourseCard, { Lesson, Course } from "../components/CourseCard"; // Adjust the path to where the Card component is located
import AxiosCourseService from "../components/AxiosCourseService";
import AxiosLessonService from "../components/AxiosLessonService";

// Show all courses for the user's program and be able to select one and go it's page
// If user is teacher show a form to create a new course
// Use authService to get logged in user's info, use the axios services for http requests
export default function AllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<{ [key: number]: Lesson[] }>({}); // Store lessons for each course
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    // Fetch courses and lessons data
    const fetchCourseData = async () => {
      try {
        const courseData = await AxiosCourseService.getAll();
        setCourses(courseData);

        const lessonsData: { [key: number]: Lesson[] } = {};
        for (const course of courseData) {
          const courseLessons = await AxiosLessonService.getAllByCourse(course.course_id);
          lessonsData[course.course_id] = courseLessons || [];
        }
        setLessons(lessonsData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, []);

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

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {currentCards.map((course) => (
          <CourseCard
            key={course.course_id}
            course={course} 
            lessons={lessons[course.course_id] || []}
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
