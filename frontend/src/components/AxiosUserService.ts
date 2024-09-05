import axiosInstance from "../components/AxiosConfig"; // Import your axios instance
import axios from "axios"; // Import axios for type safety check

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
    error?: string; // Optional: Include error messages if necessary
}

class AxiosUserService {
    async loginUser(username: string, password: string): Promise<LoginResult> {
        try {
            const response = await axiosInstance.post("/user/login", { username, password });
            return { success: true, token: response.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("Error response data:", error.response.data);
                    return { success: false, message: `Error: ${error.response.data}` };
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    return { success: false, message: "No response from server. Please check your connection." };
                }
            } else {
                console.error("Unexpected error:", error);
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
                    console.error("Error response data:", error.response.data);
                    return { success: false, message: `Error: ${error.response.data}` };
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    return { success: false, message: "No response from server. Please check your connection." };
                }
            } else {
                console.error("Unexpected error:", error);
            }
            return { success: false, message: "An error occurred. Please try again later." };
        }
    }
}

export default new AxiosUserService();