import { User } from "../utils/types";

class AuthService {
  // Existing methods...

  // Function to retrieve the email of the logged-in user (future implementation placeholder)
  getLoggedInUserEmail(): string {
    throw new Error("Method not implemented.");
  }

  // Store user details and token in session and local storage
  login(
    userId: number,
    username: string,
    role: string,
    program: number | null,
    token: string
  ): void {
    sessionStorage.setItem("authenticatedUserId", userId.toString());
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);

    // Store program ID only if it exists
    if (program !== null) {
      sessionStorage.setItem("programId", program.toString());
    } else {
      sessionStorage.removeItem("programId");
    }

    // Store the token in local storage
    localStorage.setItem("token", `Bearer ${token}`);

    console.log(
      `User ${username} logged in successfully with role ${role} and token ${token}`
    );
  }

  // Clear all session and local storage data and optionally reload the page
  logout(): void {
    sessionStorage.clear();
    localStorage.removeItem("token");
    window.location.reload();
    console.log("User logged out successfully");
  }

  // Retrieve the username of the logged-in user
  getLoggedInUsername(): string {
    return sessionStorage.getItem("authenticatedUser") || "NO LOGGED IN USER";
  }

  // Retrieve the user ID of the logged-in user
  getLoggedInUserId(): number {
    const id = sessionStorage.getItem("authenticatedUserId");
    return id ? Number(id) : -1;
  }

  // Retrieve the program ID of the logged-in user
  getLoggedInUserProgramId(): number | null {
    const id = sessionStorage.getItem("programId");
    return id ? Number(id) : null;
  }

  // Retrieve the role of the logged-in user
  getLoggedInUserRole(): string {
    return sessionStorage.getItem("role") || "";
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    console.log(!!sessionStorage.getItem("role"));
    return !!sessionStorage.getItem("role");
  }

  // Check if the logged-in user is a student
  isLoggedInStudent(): boolean {
    return this.getLoggedInUserRole() === "student";
  }

  // Check if the logged-in user is a teacher
  isLoggedInTeacher(): boolean {
    return this.getLoggedInUserRole() === "teacher";
  }

  // Retrieve the stored token
  getToken(): string | null {
    const token = localStorage.getItem("token");
    return token ? token.replace("Bearer ", "").trim() : null;
  }

  // Function to get the full details of the logged-in user
  getLoggedInUserDetails(): User | null {
    const userId = this.getLoggedInUserId();
    const username = this.getLoggedInUsername();
    const role = this.getLoggedInUserRole();
    const programId = this.getLoggedInUserProgramId();
    const program = programId ? { programId, programName: "" } : null; // Assuming the program name is empty or will be fetched separately

    if (userId === -1 || username === "NO LOGGED IN USER") {
      return null; // No user is logged in
    }

    return {
      userId,
      email: "", // This will need to be fetched if not stored in session
      username,
      firstName: "", // Placeholder or fetch if necessary
      lastName: "", // Placeholder or fetch if necessary
      role,
      userCreatedAt: "", // Placeholder or fetch if necessary
      userUpdatedAt: "", // Placeholder or fetch if necessary
      program,
    };
  }
}

export default new AuthService();
