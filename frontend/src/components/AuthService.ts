class AuthService {
  getLoggedInUserEmail(): string {
    // Example method to get logged-in user's email, implementation needed
    throw new Error('Method not implemented.');
  }

  login(
    id: number,
    username: string,
    role: string,
    programId: number,
    token: string
  ): void {
    // Store the token and other details provided by the server
    sessionStorage.setItem('authenticatedUserId', id.toString());
    sessionStorage.setItem('authenticatedUser', username);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('programId', programId.toString());
    localStorage.setItem('token', `Bearer ${token}`); // Properly store the token with 'Bearer' prefix

    console.log(
      `User ${username} logged in successfully with role ${role} and token ${token}`
    );
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload(); // Optional, reload the page to clear any cached state

    console.log('User logged out successfully');
  }

  getLoggedInUsername(): string {
    return sessionStorage.getItem('authenticatedUser') || 'NO LOGGED IN USER';
  }

  getLoggedInUserId(): number {
    const id = sessionStorage.getItem('authenticatedUserId');
    return id ? Number(id) : -1;
  }

  getLoggedInUserProgramId(): number {
    const id = sessionStorage.getItem('programId');
    return id ? Number(id) : -1;
  }

  getLoggedInUserRole(): string {
    return sessionStorage.getItem('role') || '';
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('role');
  }

  isLoggedInStudent(): boolean {
    return sessionStorage.getItem('role') === 'student';
  }

  isLoggedInTeacher(): boolean {
    return sessionStorage.getItem('role') === 'teacher';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export default new AuthService();