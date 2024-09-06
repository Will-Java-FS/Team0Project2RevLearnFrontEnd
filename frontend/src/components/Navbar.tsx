import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Icon256.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar bg-base-300 py-5">
      {/* Navbar Start - Logo and Menu Toggle */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow ${isMenuOpen ? 'block' : 'hidden'
              }`}
          >
            <li>
              <Link
                to="/"
                className="text-primary btn btn-nav-sm btn-ghost hover:text-secondary hover:shadow-glow transition-shadow duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-primary btn btn-nav-sm btn-ghost hover:text-secondary hover:shadow-glow transition-shadow duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-primary btn btn-nav-sm btn-ghost hover:text-secondary hover:shadow-glow transition-shadow duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-primary btn btn-nav-sm btn-ghost hover:text-secondary hover:shadow-glow transition-shadow duration-300"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/allprograms"
                className="text-primary btn btn-nav-sm btn-ghost hover:text-secondary hover:shadow-glow transition-shadow duration-300"
              >
                All Programs
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-primary btn btn-nav-sm btn-ghost hover:text-secondary hover:shadow-glow transition-shadow duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/teacher"
                className="text-primary btn btn-nav-sm btn-ghost hover:text-secondary hover:shadow-glow transition-shadow duration-300"
              >
                Teacher Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/allcourses"
                className="text-primary btn btn-nav-sm btn-ghost hover:text-secondary hover:shadow-glow transition-shadow duration-300"
              >
                All Courses
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar Center - Logo and Title */}
      <div className="navbar-center">

        <Link className="drop-shadow-xl text-3xl font-suse font-bold text-primary" to={"/"}>
          <img src={logo} alt="logo" className="h-12 w-auto inline-block mr-2" />
          <p className="align-middle inline-block">RevLearn</p>
        </Link>

      </div>

      {/* Navbar End - Actions */}
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;