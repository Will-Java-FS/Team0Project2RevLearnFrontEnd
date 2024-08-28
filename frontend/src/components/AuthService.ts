class AuthService {
    login(id:string, username:string, role:string, token:string): void {
        sessionStorage.setItem("authenticatedUserId", id);
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("role", role);
        localStorage.setItem("token", "Bearer " + token);

        console.log("User " + username + " logged in successfully");
    };

    logout(): void {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();

        console.log("User logged out successfully");
    };

	loggedInUsername(): string {
        let username = sessionStorage.getItem("authenticatedUser");
		if (username == null) {
            return "NO LOGGED IN USER";
        };
        return username;
	};

    loggedInUserId(): number {
        let id = sessionStorage.getItem("authenticatedUserId");
        if (id == null) {
            return -1;
        };
		return Number(id);
	};

    isLoggedIn(): boolean {
        return sessionStorage.getItem("role") == "student" || sessionStorage.getItem("role") == "teacher";
    };

    isLoggedInStudent(): boolean {
        return sessionStorage.getItem("role") == "student";
    };

    isLoggedInTeacher(): boolean {
        return sessionStorage.getItem("role") == "teacher";
    };
}

export default new AuthService();