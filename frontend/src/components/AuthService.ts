class AuthService {
    login(id: string, username: string, role:
        string,
        // token: string,
        programId: string): void {
        // Set the temporary token to "generated_token"
        const tempToken = "generated_token";

        sessionStorage.setItem("authenticatedUserId", id);
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("role", role);  // Make sure role is stored correctly
        sessionStorage.setItem("programId", programId);
        localStorage.setItem("token", "Bearer " + tempToken);  // Use the temporary token

        console.log(`User ${username} logged in successfully with role ${role} and token ${tempToken}`);
    };

    logout(): void {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();

        console.log("User logged out successfully");
    };

    loggedInUsername(): string {
        const username = sessionStorage.getItem("authenticatedUser");
        return username ? username : "NO LOGGED IN USER";
    };

    loggedInUserId(): number {
        const id = sessionStorage.getItem("authenticatedUserId");
        return id ? Number(id) : -1;
    };

    loggedInUserProgramId(): number {
        const id = sessionStorage.getItem("programId");
        return id ? Number(id) : -1;
    };

    loggedInUserRole(): string {
        return sessionStorage.getItem("role") ?? '';  // Retrieve role correctly
    }

    isLoggedIn(): boolean {
        return !!sessionStorage.getItem("role");
    };

    isLoggedInStudent(): boolean {
        return sessionStorage.getItem("role") === "student";
    };

    isLoggedInTeacher(): boolean {
        return sessionStorage.getItem("role") === "teacher";
    };
}

export default new AuthService();