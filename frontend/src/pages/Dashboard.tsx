
import { useEffect, useState } from "react";
import AxiosCourseService from "../components/AxiosCourseService";
// import AxiosUserService from "components/AxiosUserService";


export default function Dashboard(){
    // const [program, setProgram] = useState("");
    const [courses, setCourses] = useState([]);

    const dummyCourses = [
        {
          course_id: 1,
          program: { /* program object here */ },
          courseName: "Introduction to Programming",
          description: "Learn the basics of programming using Java.",
          teacherId: 101,
          course_created_at: "2024-09-03T10:00:00Z",
          course_updated_at: "2024-09-03T10:00:00Z"
        },
        {
          course_id: 2,
          program: { /* program object here */ },
          courseName: "Advanced Java Concepts",
          description: "Explore advanced topics in Java, including concurrency and JVM internals.",
          teacherId: 102,
          course_created_at: "2024-09-03T10:00:00Z",
          course_updated_at: "2024-09-03T10:00:00Z"
        },
        {
          course_id: 3,
          program: { /* program object here */ },
          courseName: "Web Development with Spring Boot",
          description: "Develop full-stack web applications using Spring Boot.",
          teacherId: 103,
          course_created_at: "2024-09-03T10:00:00Z",
          course_updated_at: "2024-09-03T10:00:00Z"
        }
      ];

    useEffect(() => {
        // setProgram(Axios.something.getProgram)
        // setCourses(AxiosCourseService.getAll());
    }, []);

    return (
        <>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <h3 className="text-xl">Your Programs</h3>
          </div>

          <div className="flex flex-col space-y-4">
            {dummyCourses.map(course => (
              <div key={course.course_id} className="card bg-base-200 w-full shadow-xl border-b-2 border-gray-300">
                <div className="card-body flex flex-row items-center justify-between">
                  <div className="flex flex-col justify-between">
                    <h2 className="card-title">{course.courseName}</h2>
                    <p>{course.description}</p>
                    <p><strong>Teacher ID:</strong> {course.teacherId}</p>
                    <p><strong>Created At:</strong> {new Date(course.course_created_at).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(course.course_updated_at).toLocaleString()}</p>
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
          </div>
        </>
      );

}


