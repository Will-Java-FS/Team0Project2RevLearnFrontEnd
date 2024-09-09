import React, { useState } from "react";
import AuthService from "./AuthService";
import AxiosCourseService from "./AxiosCourseService";

export interface Course {
    course_id: number;
    courseName: string;
    description: string;
    teacherId: number;
    course_created_at: string;
    course_updated_at: string;
    lessons: Lesson[] | [];
}
  
export interface Lesson {
    lesson_plan_id: number;
    title: string;
    content: string;
    lp_created_at: string;
    lp_updated_at: string;
}

const CourseCard: React.FC<{ course: Course; }> = ({ course }) => {
    const [showAllLessons, setShowAllLessons] = useState(false);
    const [showLessonForm, setShowLessonForm] = useState(false);

    const toggleShowAllLessons = () => {
        setShowAllLessons(!showAllLessons);
    };

    const toggleLessonForm = () => {
        setShowLessonForm(!showLessonForm);
    };

    const handleDeleteCourse = () => {
        AxiosCourseService.delete(course.course_id)
        console.log("Delete course:", course.course_id);
    };

    return (
        <div className="course-card">
            <h2>{course.courseName}</h2>
            <p>{course.description}</p>
            <h3>Lessons</h3>
            <ul>
                {(showAllLessons ? course.lessons : course.lessons.slice(0, 1)).map((lesson) => (
                    <li key={lesson.lesson_plan_id}>
                        <h4>{lesson.title}</h4>
                        <p>{lesson.content}</p>
                    </li>
                ))}
            </ul>
            {course.lessons.length > 1 && (
                <button onClick={toggleShowAllLessons}>
                    {showAllLessons ? "Show Less" : "Show All"}
                </button>
            )}
            
            {/* {AuthService.isLoggedInTeacher() && ( */}
            {true && (
                <div>
                    <button onClick={toggleLessonForm}>
                        {showLessonForm ? "Cancel" : "Create New Lesson"}
                    </button>
                    {showLessonForm && (
                        <form>
                            {/* Implement the form to create a new lesson */}
                            <input type="text" placeholder="Lesson Title" />
                            <textarea placeholder="Lesson Content"></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                    <button onClick={handleDeleteCourse}>Delete Course</button>
                </div>
            )}
        </div>
    );
};
export default CourseCard;