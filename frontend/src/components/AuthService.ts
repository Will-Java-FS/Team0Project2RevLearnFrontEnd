class AuthService {
  login(
    id: number,
    username: string,
    role: string,
    programId: number,
    token: string,
  ) {
    // Store the token and other details provided by the server
    sessionStorage.setItem("authenticatedUserId", id.toString());
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("programId", programId.toString());
    localStorage.setItem("token", `Bearer ${token}`); // Use the token returned from the server

    console.log(
      `User ${username} logged in successfully with role ${role} and token ${token}`,
    );
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
    console.log("User logged out successfully");
  }

  getLoggedInUsername(): string {
    return sessionStorage.getItem("authenticatedUser") || "NO LOGGED IN USER";
  }

  getLoggedInUserId(): number {
    const id = sessionStorage.getItem("authenticatedUserId");
    return id ? Number(id) : -1;
  }

  getLoggedInUserProgramId(): number {
    const id = sessionStorage.getItem("programId");
    return id ? Number(id) : -1;
  }

  getLoggedInUserRole(): string {
    return sessionStorage.getItem("role") || "";
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem("role");
  }

  isLoggedInStudent(): boolean {
    return this.getLoggedInUserRole() === "student";
  }

  isLoggedInTeacher(): boolean {
    return this.getLoggedInUserRole() === "teacher";
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  // Add a method to check for token expiry (assuming the token is a JWT)
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const [, payload] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.exp < Date.now() / 1000;
    } catch (error) {
      console.error("Error parsing token:", error);
      return true;
    }
  }
}

export default new AuthService();
