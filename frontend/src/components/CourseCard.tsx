import React, { useState } from "react";
import AuthService from "./AuthService";
import AxiosCourseService from "./AxiosCourseService";
import AxiosLessonService from "./AxiosLessonService";

export interface Course {
    course_id: number;
    courseName: string;
    description: string;
    teacherId: number;
    course_created_at: string;
    course_updated_at: string;
    lessons: Lesson[];
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
    const [lessonTitle, setLessonTitle] = useState("");
    const [lessonContent, setLessonContent] = useState("");

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

    const handleLessonSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newLesson: Lesson = await AxiosLessonService.create(lessonTitle, lessonContent, course.course_id);
            if (newLesson) {
                // Update the course lessons state with the new lesson
                course.lessons.push(newLesson);
                setShowLessonForm(false);
                setLessonTitle("");
                setLessonContent("");
            }
        } catch (error) {
            console.error("Error creating lesson:", error);
        }
    };


    return (
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md overflow-hidden">
            <div className="p-4">
                <h5 className="mb-2 text-1g font-semibold text-orange-500 line-clamp-2">
                  {course.courseName}
                </h5>
                <p className="text-sm text-gray-700 line-clamp-3">{course.description}</p>
                <div className="mt-5">
                    {course.lessons.length > 0 && (<h3 className="text-sm font-semibold text-gray-700 line-clamp-3">Lessons</h3>)}
                    <ul className="text-sm">
                        {(showAllLessons ? course.lessons : course.lessons.slice(0, 1)).map((lesson) => (
                            <li 
                                className="relative flex w-full p-3 mb-2 flex-col rounded bg-gray-100 bg-clip-border text-gray-700 shadow-sm overflow-hidden"
                                key={lesson.lesson_plan_id}>
                                <h4>{lesson.title}</h4>
                                <p>{lesson.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-4 pt-0 space-y-4">
                <div className="flex">
                    {course.lessons.length > 1 && (
                        <button 
                            className="block w-full text-center rounded-lg bg-orange-500 py-2 px-4 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onClick={toggleShowAllLessons}>
                            {showAllLessons ? "Show Less" : "Show All"}
                        </button>
                    )}
                </div>
                <div className="flex space-x-4">
                    {/* {AuthService.isLoggedInTeacher() && ( */}
                    {true && (
                        <>
                            <button 
                            className="block w-full text-center rounded-lg bg-orange-500 py-2 px-4 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onClick={toggleLessonForm}>
                                {showLessonForm ? "Cancel" : "Create New Lesson"}
                            </button>
                            {showLessonForm && (
                                <form onSubmit={handleLessonSubmit} className="mt-4">
                                    <input 
                                        type="text" 
                                        placeholder="Lesson Title" 
                                        value={lessonTitle} 
                                        onChange={(e) => setLessonTitle(e.target.value)} 
                                        className="block w-3/4 mb-2 p-2 border border-gray-300 rounded"
                                    />
                                    <textarea 
                                        placeholder="Lesson Content" 
                                        value={lessonContent} 
                                        onChange={(e) => setLessonContent(e.target.value)} 
                                        className="mb-2 mr-5 p-2 border border-gray-300 rounded"
                                    ></textarea>
                                    <button 
                                        type="submit" 
                                        className="block w-3/4 text-center rounded-lg bg-blue-500 py-2 px-4 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Submit
                                    </button>
                                </form>
                            )}
                            <button 
                            className="block w-full text-center rounded-lg bg-orange-500 py-2 px-4 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onClick={handleDeleteCourse}>Delete Course</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CourseCard;