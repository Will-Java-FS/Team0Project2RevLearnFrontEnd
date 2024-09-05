/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
// import AxiosCourseService from "./AxiosCourseService";

// Define an interface for courses
interface Course {
  course_id: number;
  program: object; // Adjust this type according to your actual data structure
  courseName: string;
  description: string;
  teacherId: number;
  course_created_at: string;
  course_updated_at: string;
}

export default function UserDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);

  const dummyCourses: Course[] = [
    {
      course_id: 1,
      program: {}, // Add relevant program data
      courseName: "Introduction to Programming",
      description: "Learn the basics of programming using Java.",
      teacherId: 101,
      course_created_at: "2024-09-03T10:00:00Z",
      course_updated_at: "2024-09-03T10:00:00Z",
    },
    {
      course_id: 2,
      program: {}, // Add relevant program data
      courseName: "Advanced Java Concepts",
      description: "Explore advanced topics in Java, including concurrency and JVM internals.",
      teacherId: 102,
      course_created_at: "2024-09-03T10:00:00Z",
      course_updated_at: "2024-09-03T10:00:00Z",
    },
    {
      course_id: 3,
      program: {}, // Add relevant program data
      courseName: "Web Development with Spring Boot",
      description: "Develop full-stack web applications using Spring Boot.",
      teacherId: 103,
      course_created_at: "2024-09-03T10:00:00Z",
      course_updated_at: "2024-09-03T10:00:00Z",
    },
  ];

  useEffect(() => {
    // Example: Fetch courses from API and set them
    // const fetchCourses = async () => {
    //   const data = await AxiosCourseService.getAll();
    //   if (data) setCourses(data);
    // };

    // fetchCourses();
  }, []);

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <h3 className="text-xl">Your Programs</h3>
      </div>

      <div className="flex flex-col space-y-4">
        {dummyCourses.map((course) => (
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
                  <strong>Created At:</strong> {new Date(course.course_created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong> {new Date(course.course_updated_at).toLocaleString()}
                </p>
              </div>

              <div className="card-actions">
                <button className="btn btn-primary">Click here</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl">Progress Tracker</h2>

        <div className="mt-6 w-3/4 mx-auto">
          <h1 className="text-3xl text-primary mb-4">Course Progress</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Course Progress 1", value: 70, color: "text-primary" },
              { name: "Course Progress 2", value: 40, color: "text-secondary" },
              { name: "Course Progress 3", value: 90, color: "text-success" },
            ].map((progress, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-md rounded-lg p-4 flex flex-col items-center justify-center h-40"
              >
                <h2 className="text-lg font-semibold mb-2">{progress.name}</h2>
                <div
                  className={`radial-progress ${progress.color}`}
                  style={{ "--value": progress.value } as React.CSSProperties}
                  role="progressbar"
                >
                  {progress.value}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}