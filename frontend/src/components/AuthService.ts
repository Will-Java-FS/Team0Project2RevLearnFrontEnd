class AuthService {
    login(id: number, username: string, role: string, programId: number, token: string) {
        // Store the token and other details provided by the server
        sessionStorage.setItem("authenticatedUserId", id.toString());
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("programId", programId.toString());
        localStorage.setItem("token", "Bearer " + token); // Use the token returned from the server

        console.log(`User ${username} logged in successfully with role ${role} and token ${token}`);
    }

    logout() {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();

        console.log("User logged out successfully");
    }

    loggedInUsername() {
        const username = sessionStorage.getItem("authenticatedUser");
        return username ? username : "NO LOGGED IN USER";
    }

    loggedInUserId() {
        const id = sessionStorage.getItem("authenticatedUserId");
        return id ? Number(id) : -1;
    }

    loggedInUserProgramId() {
        const id = sessionStorage.getItem("programId");
        return id ? Number(id) : -1;
    }

    loggedInUserRole() {
        return sessionStorage.getItem("role") ?? '';
    }

    isLoggedIn() {
        return !!sessionStorage.getItem("role");
    }

    isLoggedInStudent() {
        return sessionStorage.getItem("role") === "student";
    }

    isLoggedInTeacher() {
        return sessionStorage.getItem("role") === "teacher";
    }
}

export default new AuthService();