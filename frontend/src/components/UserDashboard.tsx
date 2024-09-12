import { useEffect, useState } from "react";
import AxiosEnrollmentService from "./AxiosEnrollmentService";
import UserCard from "./UserCard";
import axios from "axios";
import AuthService from "./AuthService";

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
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4; // Set the number of courses per page
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = AuthService.getLoggedInUserId();
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
          setLoadingUser(false);
        }
      } else {
        setLoadingUser(false);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setLoadingCourses(true);
      try {
        const userId = AuthService.getLoggedInUserId();
        if (userId !== -1) {
          const enrollmentsData = await AxiosEnrollmentService.getEnrollments(userId);
          const courseData = enrollmentsData.map((enrollment: { course: Course }) => enrollment.course);
          setCourses(courseData);
        } else {
          setError("User is not logged in.");
        }
      } catch (err) {
        setError("Failed to fetch enrolled courses.");
        console.error("Failed to fetch enrolled courses:", err);
      } finally {
        setLoadingCourses(false);
      }
    };

    if (AuthService.isLoggedIn()) {
      fetchEnrolledCourses();
    }
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderCourseList = () => {
    if (loadingCourses) return <p>Loading courses...</p>;
    if (error) return <p className="text-xl font-sans text-red-500">{error}</p>;
    if (courses.length === 0) return <p>No courses available.</p>;

    // Calculate the index of courses to show on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCourses = courses.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div className="container flex flex-col space-y-4 w-full max-w-4xl">
        <ul className="list-none p-0">
          {currentCourses.map((course) => (
            <li
              key={course.course_id}
              className="mb-4 bg-base-200 w-full shadow-xl border-b-2 border-gray-300 p-4 rounded-lg"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col justify-between">
                  <h2 className="text-lg font-bold mb-2">{course.courseName}</h2>
                  <p className="mb-2">{course.description}</p>
                  <p className="mb-1">
                    <strong>Teacher ID:</strong> {course.teacherId}
                  </p>
                  <p className="mb-1">
                    <strong>Created At:</strong>{" "}
                    {new Date(course.course_created_at).toLocaleString()}
                  </p>
                  <p className="mb-1">
                    <strong>Updated At:</strong>{" "}
                    {new Date(course.course_updated_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <button className="btn btn-primary">Click here</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="btn btn-secondary"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="btn btn-secondary"
          >
            Next
          </button>
        </div>
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

      {loadingUser ? <p>Loading user data...</p> : null}
      {!loadingUser && user && <UserCard user={user} />}

      <div className="text-center my-4 text-xl font-sans text-red-500">
        {renderCourseList()}
      </div>

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
