import React, { useEffect, useState } from "react";
import AxiosEnrollmentService from "../../components/AxiosEnrollmentService";
import AuthService from "../../components/AuthService";
import CourseCard from "../../components/CourseCard";
import { Course } from "../../utils/types";

const UserEnrollment: React.FC = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollmentData = async () => {
      try {
        const userId = AuthService.getLoggedInUserId();
        // Fetch enrolled courses for the user
        const enrollments = await AxiosEnrollmentService.getEnrollments(userId);
        const enrolledCoursesData = enrollments.map(
          (enrollment: { course: Course }) => enrollment.course
        );
        setEnrolledCourses(enrolledCoursesData);

        // If no courses enrolled, fetch available courses
        if (enrolledCoursesData.length === 0) {
          const availableCoursesData = await AxiosEnrollmentService.getAllAvailableCourses();
          setAvailableCourses(availableCoursesData);
        }
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
        setError((error as Error).message);
      }
    };

    fetchEnrollmentData();
  }, []);

  const handleEnrollCourse = async () => {
    if (selectedCourseId === null) {
      alert("Please select a course to enroll.");
      return;
    }

    try {
      const userId = AuthService.getLoggedInUserId();
      const user = AuthService.getLoggedInUserDetails(); // Now this method exists
      const course = availableCourses.find(course => course.course_id === selectedCourseId);

      if (!course) {
        alert("Selected course not found.");
        return;
      }

      const enrollmentPayload = {
        enroll_id: 0,
        user: {
          userId: user.userId,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          userCreatedAt: user.userCreatedAt,
          userUpdatedAt: user.userUpdatedAt,
          role: user.role,
          program: user.program,
        },
        course: course,
        enrollment_status: "Enrolled",
        payment_status: "Pending",
      };

      const result = await AxiosEnrollmentService.enrollInCourse(
        userId,
        selectedCourseId.toString(),
        enrollmentPayload
      );

      if (result) {
        alert("Enrollment successful!");
        const updatedEnrollments = await AxiosEnrollmentService.getEnrollments(userId);
        setEnrolledCourses(updatedEnrollments.map((enrollment: { course: Course }) => enrollment.course));
      } else {
        alert("Enrollment failed.");
      }
    } catch (error) {
      setError("Failed to enroll in course");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Display enrolled courses */}
      {enrolledCourses.length > 0 ? (
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Your Enrolled Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.course_id} course={course} onRemoveCourse={() => {}} onSelectCourse={() => {}} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg mb-4">You are not enrolled in any courses yet.</p>
      )}

      {/* Display available courses if user is not enrolled */}
      {availableCourses.length > 0 && (
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
          <select
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
          >
            <option value="">Select a course</option>
            {availableCourses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.courseName}
              </option>
            ))}
          </select>
          <button onClick={handleEnrollCourse} className="btn bg-primary text-white mt-2">
            Enroll
          </button>
        </div>
      )}
    </div>
  );
};

export default UserEnrollment;
