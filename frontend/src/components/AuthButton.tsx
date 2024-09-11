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
      className={`btn mx-4 btm-sm ${
        isLoggedIn ? "btn-error text-white" : "btn-success"
      }`}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
};

export default AuthButton;
