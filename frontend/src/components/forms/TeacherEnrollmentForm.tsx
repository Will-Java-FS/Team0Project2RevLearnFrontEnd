  import React, { useState, useEffect } from 'react';
  import AxiosCourseService from '../AxiosCourseService';
  import AxiosEnrollmentService from '../AxiosEnrollmentService';
  import AuthService from '../AuthService';
  import { Course } from '../../utils/types'; // Ensure Course interface is correctly imported

  const TeacherEnrollmentForm: React.FC = () => {
    const [teacherId, setTeacherId] = useState<number>(AuthService.getLoggedInUserId()); // Ensure teacher ID is retrieved from AuthService
    const [studentId, setStudentId] = useState<number>(0); // Input for student ID
    const [courseId, setCourseId] = useState<number>(0);
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');
    const [paymentStatus, setPaymentStatus] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Define options for dropdowns
    const enrollmentStatusOptions = ['Enrolled', 'Completed', 'Pending'];
    const paymentStatusOptions = ['Paid', 'Pending', 'Overdue'];

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

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        // Ensure enrollment is successful by using AxiosEnrollmentService
        const result = await AxiosEnrollmentService.enrollWithCourse(studentId, courseId);

        if (!error) {
          alert("Enrollment successful!");
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
        <h1>Enroll a Student in a Course</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label htmlFor="studentId">Student ID:</label>
          <input
            id="studentId"
            type="number"
            value={studentId}
            onChange={(e) => setStudentId(Number(e.target.value))}
            placeholder="Enter student ID"
            required
          />
        </div>
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
        <button type="submit">Enroll Student</button>
      </form>
    );
  };

  export default TeacherEnrollmentForm;
