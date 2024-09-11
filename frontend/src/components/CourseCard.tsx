import React, { useState } from "react";
import AxiosCourseService from "./AxiosCourseService";
import AxiosLessonService from "./AxiosLessonService";
import AuthService from "./AuthService";
import { useNavigate } from "react-router-dom";

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

const CourseCard: React.FC<{ course: Course; onRemoveCourse: (courseId: number) => void }> = ({ course, onRemoveCourse }) => {
    const [showAllLessons, setShowAllLessons] = useState(false);
    const [showLessonForm, setShowLessonForm] = useState(false);
    const [lessonTitle, setLessonTitle] = useState("");
    const [lessonDescription, setLessonDescription] = useState("");
    const [lessonImplementation, setLessonImplementation] = useState("");
    const [lessonApplication, setLessonApplication] = useState("");
    const [lessonSummary, setLessonSummary] = useState("");

    const toggleShowAllLessons = () => {
        setShowAllLessons(!showAllLessons);
    };

    const toggleLessonForm = () => {
        setShowLessonForm(!showLessonForm);
    };

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
            const newLesson: Lesson | null = await AxiosLessonService.create(lessonTitle, lessonDescription, lessonImplementation, lessonApplication, lessonSummary);
            if (newLesson !== null) {
                // Update the course lessons state with the new lesson
                course.lessons.push(newLesson);
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

    const navigate = useNavigate();

    const handleLessonClick = (lessonPlanId: number) => {
        navigate(`/lesson/${lessonPlanId}`);
    };

    return (
        <div className="relative flex w-80 flex-col rounded-box bg-neutral bg-clip-border shadow-md overflow-hidden">
            <div className="p-4">
                <h5 className="mb-2 text-1g font-semibold text-orange-500 line-clamp-2">
                  {course.courseName}
                </h5>
                <p className="text-sm line-clamp-3">{course.description}</p>
                <div className="mt-5">
                    {course.lessons.length > 0 && (<h3 className="text-sm font-semibold line-clamp-3">Lessons</h3>)}
                    <ul className="text-sm">
                        {(showAllLessons ? course.lessons : course.lessons.slice(0, 1)).map((lesson) => (
                            <button 
                                className="relative flex w-full p-3 mb-2 flex-col rounded-badge bg-base-100 bg-clip-border shadow-sm overflow-hidden text-left hover:bg-base-300"
                                key={lesson.lesson_plan_id}
                                onClick={() => handleLessonClick(lesson.lesson_plan_id)}>
                                <h4>{lesson.title}</h4>
                                <h4>{lesson.content}</h4>
                            </button>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-4 pt-0 space-y-4">
                <div className="flex">
                    {course.lessons.length > 1 && (
                        <button 
                            className="block w-full text-center rounded-btn bg-primary py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onClick={toggleShowAllLessons}>
                            {showAllLessons ? "Show Less" : "Show All"}
                        </button>
                    )}
                </div>
                <div className="flex space-x-4">
                    {/* {true && ( */}
                    {AuthService.isLoggedInTeacher() && (
                        <>
                            <button 
                            className="block w-full text-center rounded-btn bg-primary py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onClick={toggleLessonForm}>
                                {showLessonForm ? "Cancel" : "Create New Lesson"}
                            </button>
                            {showLessonForm && (
                                <form onSubmit={handleLessonSubmit} className="mt-4 text-black">
                                    <input 
                                        type="text" 
                                        placeholder="Lesson Title" 
                                        value={lessonTitle} 
                                        onChange={(e) => setLessonTitle(e.target.value)} 
                                        className="block w-3/4 mb-2 p-2 border border-gray-300 rounded-badge"
                                    />
                                    <textarea 
                                        placeholder="Description" 
                                        value={lessonDescription} 
                                        onChange={(e) => setLessonDescription(e.target.value)} 
                                        className="mb-2 mr-5 p-2 border border-gray-300 rounded-badge"
                                    />
                                     <textarea 
                                        placeholder="Implementation" 
                                        value={lessonImplementation} 
                                        onChange={(e) => setLessonImplementation(e.target.value)} 
                                        className="mb-2 mr-5 p-2 border border-gray-300 rounded-badge"
                                    />
                                     <textarea 
                                        placeholder="Real World Application" 
                                        value={lessonApplication} 
                                        onChange={(e) => setLessonApplication(e.target.value)} 
                                        className="mb-2 mr-5 p-2 border border-gray-300 rounded-badge"
                                    />
                                     <textarea 
                                        placeholder="Summary" 
                                        value={lessonSummary} 
                                        onChange={(e) => setLessonSummary(e.target.value)} 
                                        className="mb-2 mr-5 p-2 border border-gray-300 rounded-badge"
                                    />
                                    <button 
                                        type="submit" 
                                        className="block w-3/4 text-center rounded-btn bg-accent py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent"
                                    >
                                        Submit
                                    </button>
                                </form>
                            )}
                            <button 
                            className="block w-full text-center rounded-btn bg-primary py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
                            onClick={handleDeleteCourse}>Delete Course</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CourseCard;