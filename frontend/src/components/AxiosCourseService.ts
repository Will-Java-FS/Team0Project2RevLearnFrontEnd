import axios from "./AxiosConfig";
import AuthService from "./AuthService";

class AxiosCourseService {
  async getAll() {
    try {
      const response = await axios.get("/course");
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error getting all courses!", error);
      throw error; // Ensure errors are propagated
    }
    return null;
  }

  async getAllByProgram(programId: number) {
    try {
      const response = await axios.get(`/programs/${programId}/courses`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(
        `Error getting all courses for program ${programId}!`,
        error,
      );
      throw error;
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
