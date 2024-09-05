import axiosInstance from "../components/AxiosConfig"; // Import your axios instance
import axios from "axios"; // Import axios for type safety check

// Define an interface for the result of the registration attempt
interface RegisterResult {
    success: boolean;
    message?: string;
}

class AxiosUserService {
    async registerUser(
        username: string,
        password: string,
        email: string,
        role: string,
        last: string,
        first: string,
        programId: number | null // Accepting programId as number or null
    ): Promise<RegisterResult> {
        try {
            // Construct the request payload to match the expected JSON structure
            const payload = {
                email,
                username,
                passwordHash: password, // Backend expects `passwordHash` field
                firstName: first,
                lastName: last,
                role,
                program: programId ? { programId } : null, // Include `program` as an object if `programId` is provided
            };

            console.log("Sending registration payload:", payload);

            // Use the axios instance for the request
            const response = await axiosInstance.post("/user/register", payload);

            if (response.status === 201) {
                console.log("Registration response:", response.data);
                return { success: true, message: "Registration successful!" };
            }

            return { success: false, message: "Unexpected response status during registration." };
        } catch (error: unknown) {
            // Ensure type safety with TypeScript's type guard
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("Error response data:", error.response.data);
                    return { success: false, message: `Error: ${error.response.data}` };
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    return { success: false, message: "No response from server. Please check your connection." };
                }
            } else {
                // Handle unexpected errors
                console.error("Unexpected error:", error);
            }
            return { success: false, message: "An error occurred. Please try again later." };
        }
    }
}

export default new AxiosUserService();