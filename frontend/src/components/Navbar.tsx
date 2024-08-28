import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle component

const Navbar = () => {
  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-4">
      {/* Navigation Links */}
      <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center">
        <li>
          <Link to="/" className="text-secondary hover:text-secondary">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-primary hover:text-secondary">
            About
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-primary hover:text-secondary">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="text-primary hover:text-secondary">
            Register
          </Link>
        </li>
        <li>
          <Link to="/allprograms" className="text-primary hover:text-secondary">
            All Programs
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-primary hover:text-secondary">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/allcourses" className="text-primary hover:text-secondary">
            All Courses
          </Link>
        </li>
        <li>
          <Link to="/course" className="text-primary hover:text-secondary">
            Course
          </Link>
        </li>
        <li>
          <Link to="/lesson" className="text-primary hover:text-secondary">
            Lesson
          </Link>
        </li>
        <li>
          <Link to="/forum" className="text-primary hover:text-secondary">
            Forum
          </Link>
        </li>
        <li>
          <Link to="/forumpost" className="text-primary hover:text-secondary">
            Forum Post
          </Link>
        </li>
      </ul>

      {/* Theme Toggle Button at the end of the Navbar */}
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
