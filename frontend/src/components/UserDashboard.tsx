import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import AuthService from "./AuthService";
import MyCourses from "../pages/Course"; // Ensure the path is correct based on your project structure

// Define User and Course interfaces
interface User {
  id: number;
  userId: number;
  email: string;
  username: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  title: string;
  role: string;
  userCreatedAt: string;
  userUpdatedAt: string;
  passwordHash: string;
  program: {
    programId: number;
    programName: string;
  };
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = AuthService.getLoggedInUserId(); // Get logged-in user ID from AuthService
      if (userId !== -1) {
        const userUrl = `http://localhost:8080/user/${userId}`; // Construct API URL
        console.log("Fetching user details from:", userUrl);

        try {
          const response = await axios.get(userUrl); // Fetch user data
          setUser(response.data);
          console.log("Fetched user data:", response.data);
        } catch (err) {
          console.error("Failed to fetch user details:", err);
          setError("Failed to fetch user details.");
        } finally {
          setLoadingUser(false); // Stop loading once the fetch is complete
        }
      } else {
        setLoadingUser(false);
      }
    };

    fetchUserDetails(); // Call fetch function when component mounts
  }, []);

  return (
    <div className="w-full min-h-full container">
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold mb-2">
          {user ? `${user.firstName} ${user.lastName}` : "Guest"} Dashboard
        </h1>
      </div>
      {loadingUser && <p>Loading user data...</p>} {/* Display loading state */}
      {!loadingUser && user && <UserCard user={user} />}{" "}
      {/* Display user card */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl">Progress Tracker</h2>
        <div className="mt-6 w-3/4 mx-auto">
          <h1 className="text-3xl text-primary mb-4">Course Progress</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[70, 40, 90].map((progress, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center h-40"
              >
                <h2 className="text-lg font-semibold mb-2">
                  Course Progress {index + 1}
                </h2>
                <div
                  className="radial-progress text-primary"
                  style={{ "--value": progress } as React.CSSProperties}
                  role="progressbar"
                >
                  {progress}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Render MyCourses component */}
      <MyCourses />
      {/* Progress Tracker Section */}
    </div>
  );
}
