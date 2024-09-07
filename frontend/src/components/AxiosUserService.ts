/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "../components/AxiosConfig"; // Import your axios instance
import axios, { AxiosError } from "axios"; // Import axios and AxiosError for type safety
import AuthService from "./AuthService"; // Import AuthService to store login details

// Define an interface for the result of the registration attempt
interface RegisterResult {
    success: boolean;
    message?: string;
}

// Define an interface for the result of the login attempt
interface LoginResult {
    success: boolean;
    message?: string;
    token?: string;
    userId?: number;
    role?: string;
    programId?: number;
    error?: string; // Optional: Include error messages if necessary
}

// Define the expected response structure for login
interface LoginResponseData {
    token: string;
    userId: number;
    username: string;
    role: string;
    programId: number;
}

// Define the expected response structure for registration
interface RegisterResponseData {
    message?: string;
}

class AxiosUserService {
    async loginUser(username: string, password: string): Promise<LoginResult> {
        try {
            // Use the generic type to specify the expected response structure
            const response = await axiosInstance.post<LoginResponseData>(
                "/user/login",
                { username, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // TypeScript now knows the type of response.data
            const { token, userId, username: responseUsername, role, programId } = response.data;

            // Store the user details using AuthService
            AuthService.login(userId, responseUsername, role, programId, token);

            return { success: true, token, userId, role, programId };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data) {
                    const errorData = error.response.data as RegisterResponseData;
                    const errorMessage = errorData.message || "Invalid credentials";
                    console.error("Error response data:", errorData);
                    return { success: false, message: errorMessage };
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

    async registerUser(
        username: string,
        password: string,
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
                passwordHash: password,
                firstName: first,
                lastName: last,
                role,
                program: programId ? { programId } : null,
            };

            console.log("Sending registration payload:", payload);

            const response = await axiosInstance.post<RegisterResponseData>("/user/register", payload);

            if (response.status === 201) {
                console.log("Registration response:", response.data);
                return { success: true, message: "Registration successful!" };
            }

            return { success: false, message: "Unexpected response status during registration." };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data) {
                    const errorData = error.response.data as RegisterResponseData;
                    const errorMessage = errorData.message || "An error occurred during registration.";
                    console.error("Error response data:", errorData);
                    return { success: false, message: errorMessage };
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
}

export default new AxiosUserService();