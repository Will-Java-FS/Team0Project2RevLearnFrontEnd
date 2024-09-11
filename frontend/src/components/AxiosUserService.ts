import axios from "axios";
import AuthService from "./AuthService";
import axiosInstance from "./AxiosConfig";
import { RegisterResult, LoginResult } from "../utils/types";

class AxiosUserService {
  // Method for user login
  async loginUser(username: string, passwordHash: string): Promise<LoginResult> {
    try {
      const payload = {
        username,
        passwordHash
      };

      const response = await axiosInstance.post(
        "/user/login",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, username: responseUsername, userId, role, program } = response.data;

      if (!userId || !responseUsername || !role || !program || !token) {
        throw new Error("Missing required fields in response");
      }

      // Use AuthService to store login details
      AuthService.login(userId, responseUsername, role, program.programId, token);

      return { success: true, token, username: responseUsername, userId, role, program };
    } catch (error: unknown) {
      return this.handleError(error, "Invalid credentials");
    }
  }

  // Method for user registration
  async registerUser(
    username: string,
    passwordHash: string,
    email: string,
    role: string,
    last: string,
    first: string,
    programId: number | null
  ): Promise<RegisterResult> {
    try {
      const payload = {
        email,
        username,
        passwordHash,
        firstName: first,
        lastName: last,
        role,
        program: programId ? { programId } : null
      };

      const response = await axiosInstance.post("/user/register", payload);

      return response.status === 201
        ? { success: true, message: "Registration successful!" }
        : { success: false, message: "Unexpected response status during registration." };
    } catch (error: unknown) {
      return this.handleError(error, "An error occurred during registration.");
    }
  }

  // Method to fetch user details
  async fetchUserDetails(userId: number) {
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error; // Re-throw the error for further handling
    }
  }

  // Error handling method
  private handleError(error: unknown, defaultMessage: string): RegisterResult | LoginResult {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage: string = (error.response.data as { message?: string }).message || defaultMessage;
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status); // Log status code
        console.error("Error headers:", error.response.headers); // Log headers
        return { success: false, message: errorMessage, error: error.response.data.error || '' };
      } else if (error.request) {
        console.error("No response received:", error.request);
        return { success: false, message: "No response from server. Please check your connection." };
      }
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
      return { success: false, message: `An unexpected error occurred: ${error.message}` };
    }
    return { success: false, message: "An error occurred. Please try again later." };
  }   
}

export default new AxiosUserService();
