class AuthService {
  // Retrieve the email of the logged-in user (implement this in the future)
  getLoggedInUserEmail(): string {
    // Placeholder for future implementation
    throw new Error('Method not implemented.');
  }

  // Store user details and token in session and local storage
  login(
    userId: number,
    username: string,
    role: string,
    program: number | null,
    token: string
  ): void {
    sessionStorage.setItem('authenticatedUserId', userId.toString());
    sessionStorage.setItem('authenticatedUser', username);
    sessionStorage.setItem('role', role);

    // Store program ID only if it exists
    if (program !== null) {
      sessionStorage.setItem('programId', program.toString());
    } else {
      sessionStorage.removeItem('programId');
    }

    // Store the token in local storage
    localStorage.setItem('token', `Bearer ${token}`);

    console.log(
      `User ${username} logged in successfully with role ${role} and token ${token}`
    );
  }

  // Clear all session and local storage data and optionally reload the page
  logout(): void {
    sessionStorage.clear();
    localStorage.removeItem('token'); // Explicitly remove token
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
  getLoggedInUserProgramId(): number | null {
    const id = sessionStorage.getItem('programId');
    return id ? Number(id) : null;
  }

  // Retrieve the role of the logged-in user
  getLoggedInUserRole(): string {
    return sessionStorage.getItem('role') || '';
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    console.log(!!sessionStorage.getItem('role'));
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
    const token = localStorage.getItem('token');
    return token ? token.replace('Bearer ', '').trim() : null; // Remove 'Bearer' and any extra spaces
  }
  
}

export default new AuthService();
