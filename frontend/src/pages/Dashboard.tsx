import React, { useEffect, useState } from "react";
import TeacherDashboard from "../components/TeacherDashboard";
import UserDashboard from "../components/UserDashboard";
import AuthService from "../components/AuthService";

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<string | null>(null); // Use null as the initial state
  const [loading, setLoading] = useState<boolean>(true); // State to control loading animation

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRole = await AuthService.getLoggedInUserRole(); // Assuming this is an async call
        setRole(userRole);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole("guest"); // Fallback role or handle error state
      } finally {
        // Stop loading after 5 seconds or when the role is fetched
        const timer = setTimeout(() => {
          setLoading(false);
        }, 5000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-ball loading-lg text-accent animate-bounce delay-[100ms]"></div>
        <div className="loading loading-ball loading-lg text-secondary animate-bounce delay-[300ms]"></div>
        <div className="loading loading-ball loading-lg text-primary animate-bounce delay-[500ms]"></div>
      </div>
    );
  }

  if (role === "student") {
    return <UserDashboard />;
  } else if (role === "teacher") {
    return <TeacherDashboard />;
  } else {
    // Fallback for unexpected roles
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-center text-red-500">
          Unauthorized or unknown role
        </h1>
      </div>
    );
  }
};

export default Dashboard;
