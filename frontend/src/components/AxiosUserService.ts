import axios from "./AxiosConfig";
import AuthService from "./AuthService";

// Define an interface for the expected login response
interface LoginResponse {
    id: string;
    username: string;
    role: string;
    token: string;
    programId: string;
}

// Define an interface for the result of the login attempt
interface LoginResult {
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
        programId: number
    ): Promise<boolean> {
        try {
            const response = await axios.post("/user/register", {
                username,
                passwordHash: password, // Backend expects `passwordHash` field
                email,
                role,
                firstName: first,
                lastName: last,
                programId
            });
            console.log("Registration response:", response.data);
            return response.status === 201; // Checks if the status code is 201 (Created)
        } catch (error) {
            console.error('Error on user registration attempt:', error);
            return false;
        }
    }

    async login(username: string, password: string): Promise<LoginResult> {
        try {
            const response = await axios.post<LoginResponse>("/user/login", {
                username,
                password
            });

            if (response.status === 200) {
                const { id, username, role, token, programId } = response.data;

                // Store all user information including role and token
                AuthService.login(id, username, role, token, programId);
                return { success: true, message: "Login successful!" };
            }

            if (response.status === 401) {
                return { success: false, message: "Invalid username or password. Please try again." };
            }

            return { success: false, message: "An error occurred. Please try again later." };
        } catch (error: any) {
            console.error('Error on user login attempt:', error);

            // Provide more specific error messaging based on the type of error
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Error status:', error.response.status);
                return { success: false, message: `Error: ${error.response.data}` };
            } else if (error.request) {
                // Request was made but no response received
                console.error('No response received:', error.request);
                return { success: false, message: "No response from server. Please check your connection." };
            } else {
                // Something happened in setting up the request
                console.error('Request setup error:', error.message);
                return { success: false, message: "An error occurred. Please try again later." };
            }
        }
    }

    async setEnrolledProgram(userId: number, programId: number): Promise<boolean> {
        try {
            const response = await axios.patch(`/program/${programId}/enroll/${userId}`);
            console.log("Enroll response:", response.data);
            return response.status === 200; // Checks if the status code is 200 (OK)
        } catch (error) {
            console.error(`Error enrolling user to program ${programId}:`, error);
        }
        return false;
    }
}

export default new AxiosUserService();