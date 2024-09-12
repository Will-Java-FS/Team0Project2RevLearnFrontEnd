import axios from "./AxiosConfig";
import AuthService from "./AuthService";

class AxiosProgramService {
  // Function to get all programs
  async getAll(): Promise<any | null> {
    try {
      const response = await axios.get("/programs");
      if (response.status === 200) {
        console.log("Fetched programs:", response.data);
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error getting all programs!", error);
      return null;
    }
  }

  // Function to get a program by ID
  async getById(id: number): Promise<any | null> {
    try {
      const response = await axios.get(`/programs/${id}`);
      if (response.status === 200) {
        console.log("Fetched program:", response.data);
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error(`Error getting program ${id}!`, error);
      return null;
    }
  }

  // Function to get all courses associated with a program
  async getCoursesByProgramId(programId: number): Promise<any | null> {
    try {
      const response = await axios.get(`/programs/${programId}/courses`);
      if (response.status === 200) {
        console.log("Fetched courses for program:", response.data);
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error(`Error getting courses for program ${programId}!`, error);
      return null;
    }
  }

  // Function to create a new program
  async create(
    programName: string,
    programDescription: string,
  ): Promise<any | null> {
    try {
      const response = await axios.post("/programs", {
        programName,
        description: programDescription,
        programOwner: AuthService.getLoggedInUserId(), // Assuming the logged-in user is the owner
      });
      if (response.status === 201) {
        console.log("Created program:", response.data);
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error on program creation attempt!", error);
      return null;
    }
  }

  // Function to update a program by ID
  async update(programId: number, programData: any): Promise<any | null> {
    try {
      const response = await axios.put(`/programs/${programId}`, programData);
      if (response.status === 200) {
        console.log("Updated program:", response.data);
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error(`Error updating program ${programId}!`, error);
      return null;
    }
  }

  // Function to delete a program by ID
  async delete(programId: number): Promise<boolean> {
    try {
      const response = await axios.delete(`/programs/${programId}`);
      if (response.status === 204) {
        console.log(`Program ${programId} deleted successfully.`);
        return true;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error(`Error deleting program ${programId}!`, error);
      return false;
    }
  }

  // Function to enroll a user in a program
  async enrollUserInProgram(
    userId: number,
    programId: number,
  ): Promise<any | null> {
    try {
      const response = await axios.put(`/user/${userId}/enroll/${programId}`);
      if (response.status === 200) {
        console.log(
          `User ${userId} enrolled in program ${programId} successfully.`,
        );
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error(
        `Error enrolling user ${userId} in program ${programId}!`,
        error,
      );
      return null;
    }
  }
}

export default new AxiosProgramService();
