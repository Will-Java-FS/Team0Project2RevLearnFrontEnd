import React from "react";

export interface Course {
    course_id: number;
    courseName: string;
    description: string;
    teacherId: number;
    course_created_at: string;
    course_updated_at: string;
}
  
export interface Lesson {
    lesson_plan_id: number;
    title: string;
    content: string;
    lp_created_at: string;
    lp_updated_at: string;
}

const CourseCard: React.FC<{ course: Course; lessons: Lesson[] }> = ({ course, lessons }) => {
    return (
        <div className="course-card">
            <h2>{course.courseName}</h2>
            <p>{course.description}</p>
            <h3>Lessons</h3>
            <ul>
                {lessons.slice(0, 3).map((lesson) => (
                    <li key={lesson.lesson_plan_id}>
                        <h4>{lesson.title}</h4>
                        <p>{lesson.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default CourseCard;