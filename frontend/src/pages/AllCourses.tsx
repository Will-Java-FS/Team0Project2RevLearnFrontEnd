import React, { useEffect, useState } from "react";
import AxiosEnrollmentService from "../components/AxiosEnrollmentService";
import AuthService from "../components/AuthService";
import CourseCard from "../components/CourseCard";
import { Course, EnrollmentPayload } from "../utils/types";

const AllCourses: React.FC = () => {
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        const availableCoursesData =
          await AxiosEnrollmentService.getAllAvailableCourses();
        setAvailableCourses(availableCoursesData);
      } catch (error) {
        console.error("Error fetching available courses:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAvailableCourses();
  }, []);

  const handleEnrollCourse = async (courseId: number) => {
    try {
      const userId = AuthService.getLoggedInUserId();
      const user = AuthService.getLoggedInUserDetails();

      if (!user) {
        alert("User details not found.");
        return;
      }

      const course = availableCourses.find(
        (course) => course.course_id === courseId,
      );

      if (!course) {
        alert("Selected course not found.");
        return;
      }

      const enrollmentPayload: EnrollmentPayload = {
        enroll_id: 0,
        user,
        course,
        enrollment_status: "Enrolled",
        payment_status: "Pending",
      };

      const result =
        await AxiosEnrollmentService.enrollInCourseWithDetails(
          enrollmentPayload,
        );

      if (result) {
        alert("Enrollment successful!");

        // Remove the enrolled course from the available courses list
        setAvailableCourses((prevCourses) =>
          prevCourses.filter((c) => c.course_id !== courseId),
        );
      } else {
        alert("Enrollment failed.");
      }
    } catch (error) {
      setError("Failed to enroll in course");
      console.error("Enrollment error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      {loading ? (
        <p>Loading available courses...</p> // Show loading message
      ) : (
        <>
          {/* Display available courses */}
          {availableCourses.length > 0 ? (
            <div className="w-full gap-5">
              <h2 className="text-2xl font-bold mb-4">
                Available Courses for Enrollment
              </h2>
              <div className="grid min-w-min grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
                {availableCourses.map((course) => (
                  <CourseCard
                    key={course.course_id}
                    course={{ ...course, lessons: course.lessons ?? [] }}
                    onRemoveCourse={() => {}} // No action needed for removing manually here
                    onEnrollCourse={() => handleEnrollCourse(course.course_id)} // Use the enroll handler
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-lg mb-4">No available courses for enrollment.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AllCourses;
