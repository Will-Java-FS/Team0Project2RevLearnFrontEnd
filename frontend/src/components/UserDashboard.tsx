import { useEffect, useState } from "react";
import AuthService from "./AuthService";
import AxiosCourseService from "./AxiosCourseService";
import axiosInstance from "./AxiosConfig";
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
  } | null;
}

// Course interface definition
interface Course {
  course_id: number;
  courseName: string;
  description: string;
  teacherId: number;
  course_created_at: string;
  course_updated_at: string;
}

// UserCard Component
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const title = `${user.firstName} ${user.lastName} (${user.role})`;
  const description = `Username: ${user.username}\nEmail: ${user.email}\nProgram: ${
    user.program?.programName || "No program assigned"
  }`;
  const link = `/users/${user.userId}`;

  return <Card title={title} description={description} link={link} />;
};

export default function UserDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = AuthService.getLoggedInUserId();
      if (userId !== -1) {
        try {
          const response = await axiosInstance.get<User>(`/user/${userId}`);
          setUser(response.data);
        } catch (err) {
          console.error("Failed to fetch user details:", err);
          setError("Failed to fetch user details.");
        } finally {
          setLoadingUser(false);
        }
      } else {
        setLoadingUser(false);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const response = await AxiosCourseService.getAll();
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch courses.");
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const renderCourseList = () => {
    if (loadingCourses) return <p>Loading courses...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!courses || courses.length === 0) return <p>No courses available.</p>;

    return (
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
    );
  };

  return (
    <>
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold mb-2">
          {user ? `${user.firstName} ${user.lastName}` : "Guest"} Dashboard
        </h1>
        <h3 className="text-xl">Your Programs</h3>
      </div>

      {/* Loading and Error States */}
      {loadingUser ? <p>Loading user data...</p> : null}
      {!loadingUser && user && <UserCard user={user} />}

      {/* Displaying Course List */}
      <div className="text-center my-4 text-xl font-sans text-red-500">
        {renderCourseList()}
      </div>

      {/* Progress Tracker */}
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
    </>
  );
}
