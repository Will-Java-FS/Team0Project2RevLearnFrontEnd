import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import AuthService from "../components/AuthService"; // Import AuthService

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the logged-in user ID from AuthService
    const userId = AuthService.loggedInUserId();

    if (userId !== -1) {
      // Fetch user data from the server using the user ID
      fetch(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"), // Pass the token for authorization
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <UserCard user={user} />
    </div>
  );
};

export default User;
