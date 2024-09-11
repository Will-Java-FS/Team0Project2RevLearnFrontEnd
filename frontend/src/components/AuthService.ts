import axios from "axios";

class AuthService {
  // Retrieve the email of the logged-in user. Implementation required.
  getLoggedInUserEmail(): string {
    throw new Error('Method not implemented.');
  }

  // Store user details, token, and refresh token in session and local storage
  login(
    id: number,
    username: string,
    role: string,
    programId: number,
    token: string,
    refreshToken: string // Added refresh token parameter
  ): void {
    sessionStorage.setItem('authenticatedUserId', id.toString());
    sessionStorage.setItem('authenticatedUser', username);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('programId', programId.toString());
    localStorage.setItem('token', `Bearer ${token}`);
    localStorage.setItem('refreshToken', refreshToken); // Store refresh token

    console.log(
      `User ${username} logged in successfully with role ${role} and token ${token}`
    );
  }

  // Clear all session and local storage data and optionally reload the page
  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload(); // Optional: reload the page to clear any cached state

    console.log('User logged out successfully');
  }

  // Retrieve the username of the logged-in user
  getLoggedInUsername(): string {
    return sessionStorage.getItem('authenticatedUser') || 'NO LOGGED IN USER';
  }

  // Retrieve the user ID of the logged-in user
  getLoggedInUserId(): number {
    const id = sessionStorage.getItem('authenticatedUserId');
    return id ? Number(id) : -1;
  }

  // Retrieve the program ID of the logged-in user
  getLoggedInUserProgramId(): number {
    const id = sessionStorage.getItem('programId');
    return id ? Number(id) : -1;
  }

  // Retrieve the role of the logged-in user
  getLoggedInUserRole(): string {
    return sessionStorage.getItem('role') || '';
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('role');
  }

  // Check if the logged-in user is a student
  isLoggedInStudent(): boolean {
    return this.getLoggedInUserRole() === 'student';
  }

  // Check if the logged-in user is a teacher
  isLoggedInTeacher(): boolean {
    return this.getLoggedInUserRole() === 'teacher';
  }

  // Retrieve the stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Retrieve the stored refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // Refresh the token by sending a request to the refresh endpoint
  async refreshToken(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available.');
      }

      const response = await axios.post('/auth/refresh', { refreshToken });

      const { token, newRefreshToken } = response.data;
      if (!token || !newRefreshToken) {
        throw new Error('Invalid response from refresh token endpoint.');
      }

      // Store the new tokens
      localStorage.setItem('token', `Bearer ${token}`);
      localStorage.setItem('refreshToken', newRefreshToken);

      console.log('Token refreshed successfully.');
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.logout(); // Optional: Log out if refresh fails
    }
  }
}

export default new AuthService();
