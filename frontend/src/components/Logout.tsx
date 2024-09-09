import React from "react";
import AuthService from "./AuthService"; // Your auth service

const Logout: React.FC = () => {
  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-secondary" // Replace with your preferred button style
    >
      Logout
    </button>
  );
};

export default Logout;
