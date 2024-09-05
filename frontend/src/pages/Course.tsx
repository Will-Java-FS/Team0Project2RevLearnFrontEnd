import { useEffect, useState } from "react";
import AxiosCourseService from "../components/AxiosCourseService"; // Adjust import path

interface Lesson {
    courseId: string;
    courseName: string;
    description: string;
}

export default function Course() {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch courses using AxiosCourseService
        AxiosCourseService.getAll()
            .then(data => {
                if (data) {
                    setLessons(data);
                }
            })
            .catch(error => setError(error.message));
    }, []);

    return (
        <>
            <h1>List of your courses</h1>
            {error && <p>Error: {error}</p>}
            <ul>
                {lessons.map(lesson => (
                    <li key={lesson.courseId}>
                        <h2>{lesson.courseName}</h2>
                        <p>{lesson.description}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}