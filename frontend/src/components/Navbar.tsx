import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Icon256.png";
import AuthButton from "./AuthButton";
import Hamburger from "hamburger-react"; // Import Hamburger component from the library

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar sticky top-0 bg-base-300/90 backdrop-blur-md shadow-md py-5 z-50">
      {/* Navbar Start - Logo and Menu Toggle */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="text-accent"
            onClick={toggleMenu}
          >
            {/* Use the HamburgerReact component */}
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content font-poppins font-light border-2 border-primary bg-base-200 rounded-box z-[1] mt-3 w-48 p-2 shadow ${isMenuOpen ? "block" : "hidden"
              }`}
          >
            {/* Menu Links */}
            <li>
              <Link
                to="/"
                className="btn btn-nav-sm btn-ghost font-light text-left hover:text-primary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="btn btn-nav-sm btn-ghost font-light text-left hover:text-primary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="btn btn-nav-sm btn-ghost font-light text-left hover:text-primary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="btn btn-nav-sm btn-ghost font-light text-left hover:text-primary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/allprograms"
                className="btn btn-nav-sm btn-ghost font-light text-left hover:text-primary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
              >
                Programs
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="btn btn-nav-sm btn-ghost font-light text-left hover:text-primary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/allcourses"
                className="btn btn-nav-sm btn-ghost font-light text-left hover:text-primary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/course"
                className="btn btn-nav-sm btn-ghost font-light text-left hover:text-primary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
              >
                My Courses
              </Link>
            </li>
            <li>
              <Link
                to="/forum"
                className="btn btn-nav-sm btn-ghost font-light text-left hover:text-primary hover:shadow-lg hover:shadow-primary/70 transition-shadow duration-300"
              >
                Forum
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar Center - Logo and Title */}
      <div className="navbar-center">
        <Link
          className="drop-shadow-xl text-4xl font-suse font-bold text-primary"
          to={"/"}
        >
          <img
            src={logo}
            alt="logo"
            className="h-12 w-auto inline-block mr-2"
          />
          <p className="align-middle inline-block text-4xl">RevLearn</p>
        </Link>
      </div>

      {/* Navbar End - Actions */}
      <div className="navbar-end gap-2">
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
      <AuthButton />
    </div>
  );
};

export default Navbar;