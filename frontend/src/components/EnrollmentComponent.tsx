import React, { useState, useEffect } from "react";
import AxiosCourseService from "./AxiosCourseService";
import AxiosEnrollmentService from "./AxiosEnrollmentService";
import AuthService from "./AuthService";
import { Course, User, EnrollmentPayload } from "../utils/types";

const EnrollUserForm: React.FC = () => {
  const [userId] = useState<number>(AuthService.getLoggedInUserId());
  const [courseId, setCourseId] = useState<number>(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);

  // Define options for dropdowns
  const enrollmentStatusOptions = ["Enrolled", "Completed", "Pending"];
  const paymentStatusOptions = ["Paid", "Pending", "Overdue"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await AxiosCourseService.getAll();
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setError("Unexpected data format");
        }
      } catch (err) {
        setError("Failed to fetch courses");
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId > 0) {
        try {
          const data: User | null =
            await AxiosEnrollmentService.getUserById(userId);
          if (data !== null) {
            setUserDetails(data);
          } else {
            setError("Failed to fetch user details");
          }
        } catch (err) {
          setError("Failed to fetch user details");
          console.error(err);
        }
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId > 0) {
        try {
          const data = await AxiosCourseService.getById(courseId);
          if (data) {
            setCourseDetails(data);
          } else {
            setError("Failed to fetch course details");
          }
        } catch (err) {
          setError("Failed to fetch course details");
          console.error(err);
        }
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!courseDetails || !userDetails || !enrollmentStatus || !paymentStatus) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Prepare the payload
      const payload: EnrollmentPayload = {
        enroll_id: 0, // Use a proper ID if required by your API
        user: {
          ...userDetails,
          program: {
            programId: userDetails.program ? userDetails.program.programId : 0,
            programName: userDetails.program?.programName ?? "",
          },
        },
        course: {
          ...courseDetails,
          program: {
            programId: courseDetails.program.programId,
            programName: courseDetails.program.programName,
          },
        },
        enrollment_status: enrollmentStatus,
        payment_status: paymentStatus,
      };

      // Send request
      const result =
        await AxiosEnrollmentService.enrollInCourseWithDetails(payload);

      if (result) {
        alert("Enrollment successful!");
        // Optionally reset form or redirect user
      } else {
        alert("Enrollment failed.");
      }
    } catch (err) {
      setError("Failed to enroll in course");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Enroll in a Course</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="course">Course:</label>
        <select
          id="course"
          value={courseId}
          onChange={(e) => setCourseId(Number(e.target.value))}
          required
        >
          <option value={0}>Select a course</option>
          {courses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.courseName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="enrollmentStatus">Enrollment Status:</label>
        <select
          id="enrollmentStatus"
          value={enrollmentStatus}
          onChange={(e) => setEnrollmentStatus(e.target.value)}
          required
        >
          <option value="">Select status</option>
          {enrollmentStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="paymentStatus">Payment Status:</label>
        <select
          id="paymentStatus"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          required
        >
          <option value="">Select status</option>
          {paymentStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Enroll</button>
    </form>
  );
};

export default EnrollUserForm;
