import { ReactNode } from "react";

// Result types for registration and login
export interface RegisterResult {
  success: boolean;
  message?: string;
}

export interface LoginResult {
  success: boolean;
  message?: string;
  token?: string;
  username?: string;
  userId?: number;
  role?: string;
  program?: Program;
  error?: string; // Optional: Include error messages if necessary
}

// Basic Program interface
export interface Program {
  programId: number;
  programName: string;
}

// Basic User interface
export interface User {
  userId: number;
  email: string;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  userCreatedAt: string;
  role: string;
  userUpdatedAt: string;
  program: Program | null;}

export interface FetchUsrs{
  id: number;
  username: string;
  email: string;
  role: string;
  program: Program;
  createdAt: string;
  updatedAt: string;
}
// Auth response interface
export interface AuthResponse {
  token: string;
  username: string;
  userId: number;
  role: string;
  program: Program;
}

// User form interfaces
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

type Props = {
  users?: User[];
};
// User card props
export interface UserCardProps {
  user: User;
}

// User edit form props
export interface UserEditFormProps {
  user: User;
}

// Card props
export interface CardProps {
  title: string;
  description: string;
  link: string;
}

// Course interface
export interface Course {
  program: any;
  course_id: number;
  courseName: string;
  description: string;
  teacherId: number;
  course_created_at: string;
  course_updated_at: string;
  lessons: Lesson[];
}

// Lesson interface
export interface Lesson {
  lesson_plan_id: number;
  title: string;
  content: string;
  lp_created_at: string;
  lp_updated_at: string;
}

// Enrollment payload interface
export interface EnrollmentPayload {
  enroll_id: number; // Optional or could be null if not needed
  user: User; // Ensure User includes profilePicture and title
  course: Course;
  enrollment_status: string;
  payment_status: string;
}
