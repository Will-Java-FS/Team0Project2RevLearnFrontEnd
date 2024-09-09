import { useEffect, useState } from "react";
import AuthService from "./AuthService";
import AxiosCourseService from "./AxiosCourseService";
import axiosInstance from "./AxiosConfig"; // Import the configured Axios instance
import Card from "./Card";

// User interface definition
interface User {
  userId: number;
  email: string;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  userCreatedAt: string;
  role: string;
  userUpdatedAt: string;
  program: {
    programId: number;
    programName: string;
  };
}

// UserCard Component
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const title = `${user.firstName} ${user.lastName} (${user.role})`;
  const description = `Username: ${user.username}\nEmail: ${user.email}\nProgram: ${user.program.programName}`;
  const link = `/users/${user.userId}`;

  return <Card title={title} description={description} link={link} />;
};

export default function UserDashboard() {
  const [courses, setCourses] = useState<any[]>([]); // Initialize with empty array for actual courses
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user details using the stored user ID from AuthService
    const fetchUserDetails = async () => {
      const userId = AuthService.getLoggedInUserId();
      if (userId !== -1) {
        try {
          const response = await axiosInstance.get<User>(`/user/${userId}`);
          setUser(response.data);
        } catch (err) {
          console.error("Failed to fetch user details:", err);
          setError("Failed to fetch user details.");
        }
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    // Fetch courses data using AxiosCourseService
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await AxiosCourseService.getAll(); // Replace with actual API call
        setCourses(response.data); // Set fetched courses
      } catch (err) {
        setError("Failed to fetch courses.");
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {user ? `${user.firstName} ${user.lastName}` : "Guest"} Dashboard
        </h1>
        <h3 className="text-xl">Your Programs</h3>
      </div>

      {/* Loading and Error States */}
      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Displaying Course List */}
      {!loading && !error && courses.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="card bg-base-200 w-full shadow-xl border-b-2 border-gray-300"
            >
              <div className="card-body flex flex-row items-center justify-between">
                <div className="flex flex-col justify-between">
                  <h2 className="card-title">{course.courseName}</h2>
                  <p>{course.description}</p>
                  <p>
                    <strong>Teacher ID:</strong> {course.teacherId}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(course.course_created_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {new Date(course.course_updated_at).toLocaleString()}
                  </p>
                </div>
                <div className="card-actions">
                  <button className="btn btn-primary">Click here</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses available.</p>
      )}

      {/* Progress Tracker */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl">Progress Tracker</h2>
        {user && <UserCard user={user} />}

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
    </>
  );
}
