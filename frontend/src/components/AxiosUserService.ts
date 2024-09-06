import axiosInstance from "../components/AxiosConfig"; // Import your axios instance
import axios from "axios"; // Import axios and AxiosError for type safety
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

class AxiosUserService {
    async loginUser(username: string, password: string): Promise<LoginResult> {
        try {
            // Ensure that you're sending the right payload and headers
            const response = await axiosInstance.post(
                "/user/login",
                { username, passwordHash: password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Extract the response data
            const { token, userId, username: responseUsername, role, programId } = response.data;

            // Store the user details using AuthService
            AuthService.login(userId, responseUsername, role, programId, token);

            return { success: true, token };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const errorMessage: string = (error.response.data as { message?: string }).message || "Invalid credentials";
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

            const response = await axiosInstance.post("/user/register", payload);

            if (response.status === 201) {
                console.log("Registration response:", response.data);
                return { success: true, message: "Registration successful!" };
            }

            return { success: false, message: "Unexpected response status during registration." };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const errorMessage: string = (error.response.data as { message?: string }).message || "An error occurred during registration.";
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
}

export default new AxiosUserService();