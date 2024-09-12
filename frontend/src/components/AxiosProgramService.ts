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

  // Function to get students in a program
  async getStudents(id: number): Promise<any | null> {
    try {
      const response = await axios.get(`/programs/${id}/students`);
      if (response.status === 200) {
        console.log("Fetched students:", response.data);
        return response.data;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error(`Error getting students for program ${id}!`, error);
      return null;
    }
  }

  // Function to create a new program
  async create(programName: string): Promise<any | null> {
    try {
      const response = await axios.post("/programs", {
        program_name: programName,
        program_owner: AuthService.getLoggedInUserId(),
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

  // Function to delete a program by ID
  async delete(id: number): Promise<boolean> {
    try {
      const response = await axios.delete(`/programs/${id}`);
      if (response.status === 204) {
        console.log(`Program ${id} deleted successfully.`);
        return true;
      } else {
        console.warn(`Unexpected status code: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error(`Error deleting program ${id}!`, error);
      return false;
    }
  }
}

export default new AxiosProgramService();
