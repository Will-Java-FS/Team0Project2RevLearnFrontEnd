import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-4 bg-stone-200 dark:bg-slate-800 dark:text-white min-h-[50px]">
      {/* Logo */}
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-primary dark:text-amber-600">revpro</h1>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-primary focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <ul
        className={`flex flex-col text-right p-4 sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'block' : 'hidden sm:flex'
        } absolute sm:relative right-0 top-16 sm:top-auto bg-stone-200 dark:bg-slate-800 sm:bg-transparent shadow-md sm:shadow-none w-full sm:w-auto z-10`}
      >
        <li>
          <Link to="/" className="text-secondary hover:text-amber-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-primary hover:text-amber-600">
            About
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-primary hover:text-amber-600">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="text-primary hover:text-amber-600">
            Register
          </Link>
        </li>
        <li>
          <Link to="/allprograms" className="text-primary hover:text-amber-600">
            All Programs
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-primary hover:text-amber-600">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/allcourses" className="text-primary hover:text-amber-600">
            All Courses
          </Link>
        </li>
      </ul>

      {/* ThemeToggle component */}
      {/* <div className="hidden sm:flex items-center ml-auto">
        <ThemeToggle />
      </div> */}
    </nav>
  );
};

export default Navbar;
