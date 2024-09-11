import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import AuthService from "../components/AuthService"; // Import AuthService

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the logged-in user ID from AuthService
    const userId = AuthService.getLoggedInUserId();

    if (userId !== -1) {
      // Fetch user data from the server using the user ID
      fetch(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token") ?? "", // Pass the token for authorization or use an empty string as default
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (!user) {
    return <div>No user found</div>; // Handle case where no user is found
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <UserCard user={user} />
    </div>
  );
};

export default User;