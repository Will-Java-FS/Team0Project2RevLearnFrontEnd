import { useEffect, useState } from "react";
import AxiosCourseService from "./AxiosCourseService";
<<<<<<< HEAD
import UserCard from "./UserCard"; // Import the updated UserCard
import axios from "axios";
import AuthService from "./AuthService"; // Import AuthService to get session ID
=======
import UserCard from './UserCard'; // Import the updated UserCard component
import axios from "axios";
import AuthService from "./AuthService";
>>>>>>> Drew

// User interface definition
interface User {
  id: number;
  email: string;
  username: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  title: string;
  role: string;
  userCreatedAt: string;
  program: {
    programName: string;
  };
}

<<<<<<< HEAD
export default function UserDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
=======
// Course interface definition
interface Course {
  course_id: number;
  courseName: string;
  description: string;
  teacherId: number;
  course_created_at: string;
  course_updated_at: string;
}

export default function UserDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
>>>>>>> Drew
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = AuthService.getLoggedInUserId(); // Get the logged-in user ID from AuthService
      if (userId !== -1) {
        const userUrl = `http://localhost:8080/user/${userId}`;
        console.log("Fetching user details from:", userUrl);

        try {
          const response = await axios.get(userUrl);
          setUser(response.data);
          console.log("Fetched user data:", response.data);
        } catch (err) {
          console.error("Failed to fetch user details:", err);
          setError("Failed to fetch user details.");
        } finally {
<<<<<<< HEAD
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setError("User not logged in.");
        setLoading(false);
=======
          setLoadingUser(false);
        }
      } else {
        setLoadingUser(false);
>>>>>>> Drew
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
<<<<<<< HEAD
        setLoading(false); // Set loading to false after fetching
=======
        setLoadingCourses(false);
>>>>>>> Drew
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
<<<<<<< HEAD
      {loading && <p>Loading data...</p>}
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
        !loading && <p>No courses available.</p>
      )}
=======
      {loadingUser ? <p>Loading user data...</p> : null}
      {!loadingUser && user && <UserCard user={user} />} {/* Use the updated UserCard component */}

      {/* Displaying Course List */}
      <div className="text-center my-4 text-xl font-sans text-red-500">
        {renderCourseList()}
      </div>
>>>>>>> Drew

      {/* Progress Tracker */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl">Progress Tracker</h2>
<<<<<<< HEAD
        {user && <UserCard user={user} />} {/* Render the UserCard if user data is available */}

=======
>>>>>>> Drew
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