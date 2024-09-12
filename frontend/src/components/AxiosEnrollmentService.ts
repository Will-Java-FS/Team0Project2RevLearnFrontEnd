import axios from "./AxiosConfig";
import AuthService from "./AuthService";
import { EnrollmentPayload, Course, User } from "../utils/types";

class AxiosEnrollmentService {
  getUserById(userId: number): User | PromiseLike<User | null> | null {
    throw new Error('Method not implemented.');
  }
  // Function to get all enrollments for a student
  async getEnrollments(studentId: number): Promise<EnrollmentPayload[]> {
    try {
      const response = await axios.get(`/enrollments/courses/${studentId}`);
      if (response.status === 200) {
        console.log("Enrollments data fetched:", response.data);
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return [];
      }
    } catch (error) {
      console.error("Error getting student enrollments!", error);
      return [];
    }
  }

  // Function to enroll in a course
  async enrollInCourse(
    studentId: number = AuthService.getLoggedInUserId(),
    courseId: number,
    enrollmentStatus: string
  ): Promise<boolean> {
    try {
      const response = await axios.post(`/enrollments`, {
        user: { userId: studentId }, // Assuming the request body expects the user object
        course: { course_id: courseId },
        enrollment_status: enrollmentStatus,
        payment_status: "Pending", // Assuming default payment status
      });
      console.log("Enrollment response:", response.data);
      return response.status === 200;
    } catch (error) {
      console.error(`Error enrolling student ${studentId} to course ${courseId}!`, error);
      return false;
    }
  }

  // Function to enroll in a course with detailed payload
  async enrollInCourseWithDetails(payload: EnrollmentPayload): Promise<boolean> {
    try {
      const response = await axios.post(`/enrollments`, payload);
      console.log("Enrollment response with details:", response.data);
      return response.status === 200;
    } catch (error) {
      console.error("Error enrolling with detailed payload!", error);
      return false;
    }
  }

  // Function to pay for a course
  async payForCourse(
    studentId: number = AuthService.getLoggedInUserId(),
    courseId: number
  ): Promise<boolean> {
    try {
      const response = await axios.post(`/course/${courseId}/pay/${studentId}`);
      console.log("Payment response:", response.data);
      return response.status === 200;
    } catch (error) {
      console.error(`Error paying for course ${courseId} by student ${studentId}!`, error);
      return false;
    }
  }

  // Function to remove a student from a course
  async removeFromCourse(studentId: number, courseId: number): Promise<boolean> {
    try {
      const response = await axios.delete(`/enrollments/${courseId}`, {
        data: { user: { userId: studentId } },
      });
      console.log("Removal response:", response.data);
      return response.status === 200;
    } catch (error) {
      console.error(`Error removing student ${studentId} from course ${courseId}!`, error);
      return false;
    }
  }

  // Function to get completed enrollments by student ID
  async getCompletedEnrollmentsByStudentID(studentId: number): Promise<EnrollmentPayload[]> {
    try {
      const response = await axios.get(`/enrollments/completed/${studentId}`);
      if (response.status === 200) {
        console.log("Completed enrollments fetched:", response.data);
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return [];
      }
    } catch (error) {
      console.error("Error getting completed enrollments!", error);
      return [];
    }
  }

  // Function to get all available courses for enrollment
  async getAllAvailableCourses(): Promise<Course[]> {
    try {
      const response = await axios.get(`/enrollments/courses-available`);
      if (response.status === 200) {
        console.log("Available courses fetched:", response.data);
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return [];
      }
    } catch (error) {
      console.error("Error getting available courses!", error);
      return [];
    }
  }

  // Function to get teacher of a course
  async getTeacherOfCourse(courseId: number): Promise<User | null> {
    try {
      const response = await axios.get(`/enrollments/teacher/${courseId}`);
      if (response.status === 200) {
        console.log("Teacher data fetched:", response.data);
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error(`Error getting teacher of course ${courseId}!`, error);
      return null;
    }
  }
}

export default new AxiosEnrollmentService();
