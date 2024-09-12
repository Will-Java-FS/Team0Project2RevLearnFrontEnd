import React, { useState } from "react";
import AxiosCourseService from "./AxiosCourseService";
import AxiosLessonService from "./AxiosLessonService";
import AuthService from "./AuthService";
import { useNavigate } from "react-router-dom";
import { Course } from '../utils/types';

export interface Lesson {
    lesson_plan_id: number;
    title: string;
    content: string;
    lp_created_at: string;
    lp_updated_at: string;
}

interface CourseCardProps {
    course: Course;
    onRemoveCourse: (courseId: number) => void;
    onSelectCourse: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onRemoveCourse, onSelectCourse }) => {
    const [showAllLessons, setShowAllLessons] = useState(false);
    const [showLessonForm, setShowLessonForm] = useState(false);
    const [lessonTitle, setLessonTitle] = useState("");
    const [lessonDescription, setLessonDescription] = useState("");
    const [lessonImplementation, setLessonImplementation] = useState("");
    const [lessonApplication, setLessonApplication] = useState("");
    const [lessonSummary, setLessonSummary] = useState("");
    const navigate = useNavigate();

    // Ensure lessons is always an array
    const lessons = course.lessons ?? [];

    const toggleShowAllLessons = () => setShowAllLessons(!showAllLessons);
    const toggleLessonForm = () => setShowLessonForm(!showLessonForm);

    const handleDeleteCourse = async () => {
        try {
            await AxiosCourseService.delete(course.course_id);
            onRemoveCourse(course.course_id);
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const handleLessonSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newLesson: Lesson | null = await AxiosLessonService.create(
                lessonTitle,
                lessonDescription,
                lessonImplementation,
                lessonApplication,
                lessonSummary
            );
            if (newLesson) {
                lessons.push(newLesson); // Update lessons array
                setShowLessonForm(false);
                setLessonTitle("");
                setLessonDescription("");
                setLessonImplementation("");
                setLessonApplication("");
                setLessonSummary("");
            }
        } catch (error) {
            console.error("Error creating lesson:", error);
        }
    };

    const handleLessonClick = (lessonPlanId: number) => {
        navigate(`/lesson/${lessonPlanId}`);
    };

    return (
        <div className="relative flex flex-col w-full md:w-80 rounded-box bg-neutral bg-clip-border shadow-md overflow-hidden mb-6">
            <div className="p-4">
                <h5 className="mb-2 text-lg font-semibold text-orange-500 line-clamp-2">
                    {course.courseName}
                </h5>
                <p className="text-sm line-clamp-3">{course.description}</p>
                <div className="mt-5">
                    {lessons.length > 0 && <h3 className="text-sm font-semibold line-clamp-3">Lessons</h3>}
                    <ul className="text-sm">
                        {(showAllLessons ? lessons : lessons.slice(0, 1)).map((lesson) => (
                            <button 
                                key={lesson.lesson_plan_id}
                                className="relative flex w-full p-3 mb-2 flex-col rounded-badge bg-base-100 bg-clip-border shadow-sm overflow-hidden text-left hover:bg-base-300"
                                onClick={() => handleLessonClick(lesson.lesson_plan_id)}
                            >
                                <h4>{lesson.title}</h4>
                                <p>{lesson.content}</p>
                            </button>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-4 pt-0 space-y-4">
                <div className="flex justify-center">
                    {lessons.length > 1 && (
                        <button 
                            className="block w-full text-center rounded-btn bg-primary py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onClick={toggleShowAllLessons}
                        >
                            {showAllLessons ? "Show Less" : "Show All"}
                        </button>
                    )}
                </div>
                <div className="flex flex-col space-y-4">
                    {AuthService.isLoggedInTeacher() && (
                        <>
                            <button 
                                className="block w-full text-center rounded-btn bg-primary py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onClick={toggleLessonForm}
                            >
                                {showLessonForm ? "Cancel" : "Create New Lesson"}
                            </button>
                            {showLessonForm && (
                                <form onSubmit={handleLessonSubmit} className="mt-4 text-black">
                                    <input 
                                        type="text" 
                                        placeholder="Lesson Title" 
                                        value={lessonTitle} 
                                        onChange={(e) => setLessonTitle(e.target.value)} 
                                        className="block w-full mb-2 p-2 border border-gray-300 rounded-badge"
                                    />
                                    <textarea 
                                        placeholder="Description" 
                                        value={lessonDescription} 
                                        onChange={(e) => setLessonDescription(e.target.value)} 
                                        className="mb-2 p-2 w-full border border-gray-300 rounded-badge"
                                    />
                                    <textarea 
                                        placeholder="Implementation" 
                                        value={lessonImplementation} 
                                        onChange={(e) => setLessonImplementation(e.target.value)} 
                                        className="mb-2 p-2 w-full border border-gray-300 rounded-badge"
                                    />
                                    <textarea 
                                        placeholder="Real World Application" 
                                        value={lessonApplication} 
                                        onChange={(e) => setLessonApplication(e.target.value)} 
                                        className="mb-2 p-2 w-full border border-gray-300 rounded-badge"
                                    />
                                    <textarea 
                                        placeholder="Summary" 
                                        value={lessonSummary} 
                                        onChange={(e) => setLessonSummary(e.target.value)} 
                                        className="mb-2 p-2 w-full border border-gray-300 rounded-badge"
                                    />
                                    <button 
                                        type="submit" 
                                        className="block w-full text-center rounded-btn bg-accent py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent"
                                    >
                                        Submit
                                    </button>
                                </form>
                            )}
                            <button 
                                className="block w-full text-center rounded-btn bg-primary py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
                                onClick={handleDeleteCourse}
                            >
                                Delete Course
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
