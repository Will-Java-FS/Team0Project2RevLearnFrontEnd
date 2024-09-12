import axios from "./AxiosConfig";
import AuthService from "./AuthService";
import { Course } from "../utils/types";

class AxiosCourseService {
  async getAll(): Promise<Course[] | null> {
    try {
      const response = await axios.get("/courses");
      if (response.status === 200) {
        return response.data as Course[]; // Ensure it matches the Course interface
      }
    } catch (error) {
      console.error("Error getting all courses!", error);
      throw error; // Ensure errors are propagated
    }
    return null;
  }

  async getById(id: number) {
    try {
      const response = await axios.get(`/courses/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Error getting course ${id}!`, error);
      throw error;
    }
    return null;
  }

  async getStudents(id: number) {
    try {
      const response = await axios.get(`/courses/${id}/students`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Error getting students for course ${id}!`, error);
      throw error;
    }
    return null;
  }

  async create(courseName: string, description: string, programId: number) {
    try {
      const response = await axios.post("/courses", {
        courseName,
        description,
        teacherId: AuthService.getLoggedInUserId(),
        programId,
      });
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error("Error on course creation attempt!", error);
      throw error;
    }
    return null;
  }

  // New method to add a course for the logged-in student
  async addCourseForLoggedInStudent(courseName: string, description: string) {
    try {
      const userId = AuthService.getLoggedInUserId(); // Get the logged-in user ID
      const response = await axios.post(`/courses/add/${userId}`, {
        courseName,
        description,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error adding course for the logged-in student!", error);
      throw error;
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    try {
      const response = await axios.delete(`/courses/${id}`);
      if (response.status === 204) {
        return true;
      }
    } catch (error) {
      console.error(`Error deleting course ${id}!`, error);
      throw error;
    }
    return false;
  }
}

export default new AxiosCourseService();
