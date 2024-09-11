import { ReactNode } from "react";

export interface RegisterResult {
  success: boolean;
  message?: string;
}

export interface LoginResult {
  success: boolean;
  message?: string;
  token?: string;
  username?: string; // Updated to match the AuthResponse class
  userId?: number;
  role?: string;
  program?: {
    programId: number;
    programName: string;
  };
  error?: string; // Optional: Include error messages if necessary
}
export interface Program {
  programId: number;
  programName: string;
}

export interface User {
  profilePicture: string;
  title: ReactNode;
  userId: number;
  email: string;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  userCreatedAt: string;
  role: string;
  userUpdatedAt: string;
  program: Program;
}

export interface AuthResponse {
  token: string;
  username: string;
  userId: number;
  role: string;
  program: Program;
}

export interface UserForm {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  program: Program;
}
export interface UserEditForm {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  program: Program;
}
export interface UserCardProps {
  user: User;
}
export interface UserEditFormProps {
  user: User;
}
export interface CardProps {
  title: string;
  description: string;
  link: string;
}
