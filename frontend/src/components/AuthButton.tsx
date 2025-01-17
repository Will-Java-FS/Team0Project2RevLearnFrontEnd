import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./AuthService"; // Your auth service

const AuthButton: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (AuthService.isLoggedIn()) {
      // If logged in, log out and redirect to the login page
      AuthService.logout();
      navigate("/");
    } else {
      // If not logged in, simply redirect to the login page
      navigate("/login");
    }
  };

  const isLoggedIn = AuthService.isLoggedIn();

  return (
    <button
      onClick={handleButtonClick}
      className={`btn btn-sm ghost text-white transition duration-300 ${
        isLoggedIn
          ? "hover:bg-red-500 hover:animate-bounce ghost"
          : "hover:bg-emerald-500 hover:translate-y-[-2px]"
      }`}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
};

export default AuthButton;
