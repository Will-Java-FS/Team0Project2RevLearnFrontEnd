import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { Course } from "../utils/types";
import AxiosCourseService from "../components/AxiosCourseService";
import AxiosEnrollmentService from "../components/AxiosEnrollmentService";
import AuthService from "../components/AuthService";

export default function AllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState<string>('Enrolled'); // Set a default status
  const itemsPerPage = 4; // Number of card components per page
  const totalPages = Math.ceil(totalCards / itemsPerPage);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        console.log('Fetching course data...');
        const userId = AuthService.getLoggedInUserId();
        let courseData: Course[] = [];

        if (AuthService.isLoggedInTeacher()) {
          // Fetch all courses for teachers
          courseData = (await AxiosCourseService.getAll()) || [];
        } else {
          // Fetch courses the student is enrolled in
          const enrollmentsData = await AxiosEnrollmentService.getEnrollments(userId);
          if (enrollmentsData.length === 0) {
            // If no enrollments, fetch all available courses for students to choose from
            const allCoursesData = (await AxiosCourseService.getAll()) || [];
            setAllCourses(allCoursesData);
          } else {
            // If enrolled, show only the courses the student is enrolled in
            courseData = enrollmentsData.map((enrollment: { course: Course }) => enrollment.course);
          }
        }

        console.log('Course data fetched:', courseData);
        setTotalCards(courseData.length);
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError((error as Error).message);
      }
    };

    if (AuthService.isLoggedIn()) {
      fetchCourseData();
    }
  }, []);

  const handleEnrollCourse = async () => {
    if (selectedCourseId === null) {
      alert("Please select a course to enroll.");
      return;
    }

    try {
      const result = await AxiosEnrollmentService.enrollInCourse(
        AuthService.getLoggedInUserId(),
        selectedCourseId,
        enrollmentStatus
      );

      if (result) {
        alert("Enrollment successful!");
        // Refresh courses
        const enrolledCourse = allCourses.find(course => course.course_id === selectedCourseId);
        if (enrolledCourse) {
          setCourses([...courses, enrolledCourse]);
          setAllCourses(allCourses.filter(course => course.course_id !== selectedCourseId));
        }
      } else {
        alert("Enrollment failed.");
      }
    } catch (error) {
      setError("Failed to enroll in course");
      console.error(error);
    }
  };

  const handleAddCourse = (courseId: number) => {
    setSelectedCourseId(courseId);
  };

  const currentCards = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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

  if (courses.length === 0 && allCourses.length === 0) {
    return (
      <div className="flex flex-col items-center min-h-screen p-6">
        <h5>Unlock your potential today</h5>
        <button onClick={() => window.location.href = "/allprograms"} className="btn text-white bg-primary glass hover:bg-accent transition duration-300 py-2.5 px-5 rounded shadow-md hover:translate-y-[-2px]">
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
            onRemoveCourse={() => {}}
            onSelectCourse={() => handleAddCourse(course.course_id)}
          />
        ))}
      </div>
      {allCourses.length > 0 && (
        <div className="flex flex-col items-center mb-4">
          <h3>Available Courses:</h3>
          <select
            id="availableCourses"
            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
          >
            <option value="">Select a course</option>
            {allCourses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.courseName}
              </option>
            ))}
          </select>
          <button onClick={handleEnrollCourse} className="btn bg-primary text-white mt-2">
            Add Course
          </button>
        </div>
      )}
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
