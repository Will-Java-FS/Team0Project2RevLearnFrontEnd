import axios from "axios";
import AuthService from "./AuthService";
import axiosInstance from "./AxiosConfig";

// Define interfaces for login and registration
interface RegisterResult {
    success: boolean;
    message?: string;
}

interface LoginResult {
    success: boolean;
    message?: string;
    token?: string;
    userId?: number;
    role?: string;
    programId?: number;
    error?: string; // Optional: Include error messages if necessary
}

class AxiosUserService {
    // Method for user login
    async loginUser(username: string, password: string): Promise<LoginResult> {
        try {
            const response = await axiosInstance.post(
                "/user/login",
                { username, passwordHash: password }, // Send 'passwordHash' field to match the backend expectation
                { headers: { "Content-Type": "application/json" } }
            );

            const { token, userId, username: responseUsername, role, program } = response.data;

            // Check if the required data is defined before calling any method on them
            if (!userId || !responseUsername || !role || !program || !token) {
                throw new Error("Missing required fields in response");
            }

            AuthService.login(userId, responseUsername, role, program.programId, token);

            return { success: true, token };
        } catch (error: unknown) {
            return this.handleError(error, "Invalid credentials");
        }
    }

    // Method for user registration
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

            const response = await axiosInstance.post("/user/register", payload);
            return response.status === 201
                ? { success: true, message: "Registration successful!" }
                : { success: false, message: "Unexpected response status during registration." };
        } catch (error: unknown) {
            return this.handleError(error, "An error occurred during registration.");
        }
    }

    // Error handling method
    private handleError(error: unknown, defaultMessage: string): RegisterResult | LoginResult {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorMessage: string = (error.response.data as { message?: string }).message || defaultMessage;
                console.error("Error response data:", error.response.data);
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

export default new AxiosUserService();
