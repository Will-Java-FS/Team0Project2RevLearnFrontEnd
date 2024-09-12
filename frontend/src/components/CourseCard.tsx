import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosCourseService from "./AxiosCourseService";
import AxiosLessonService from "./AxiosLessonService";
import AuthService from "./AuthService";

// Define Course and Lesson interfaces
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
  description: string;
  real_world_application: string;
  implementation: string;
  summary: string;
  lp_created_at: string;
  lp_updated_at: string;
}

interface CourseCardProps {
  course: Course;
  onRemoveCourse: (courseId: number) => void;
  onEnrollCourse: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onRemoveCourse,
  onEnrollCourse,
}) => {
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonImplementation, setLessonImplementation] = useState("");
  const [lessonApplication, setLessonApplication] = useState("");
  const [lessonSummary, setLessonSummary] = useState("");

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
        lessonSummary,
      );
      if (newLesson) {
        course.lessons.push(newLesson);
        setShowLessonForm(false);
        resetLessonForm();
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
    }
  };

  const resetLessonForm = () => {
    setLessonTitle("");
    setLessonDescription("");
    setLessonImplementation("");
    setLessonApplication("");
    setLessonSummary("");
  };

  const navigate = useNavigate();

  const handleLessonClick = (lessonPlanId: number) => {
    navigate(`/lesson/${lessonPlanId}`);
  };

  return (
    <div className="card bg-base-200 w-full shadow-xl border-b-2 border-gray-300 mb-4 md:mb-6 flex flex-col md:flex-row">
      <div className="card-body flex flex-col md:flex-row md:items-start md:justify-between w-full">
        <div className="flex-1 mb-4 md:mb-0">
          <h2 className="card-title text-primary text-lg md:text-xl font-semibold">
            {course.courseName}
          </h2>
          <p className="text-sm md:text-base">{course.description}</p>
          <p className="text-sm md:text-base">
            <strong>Teacher ID:</strong> {course.teacherId}
          </p>
          <p className="text-sm md:text-base">
            <strong>Created At:</strong>{" "}
            {new Date(course.course_created_at).toLocaleString()}
          </p>
          <p className="text-sm md:text-base">
            <strong>Updated At:</strong>{" "}
            {new Date(course.course_updated_at).toLocaleString()}
          </p>

          {/* Display lessons */}
          <div className="mt-5">
            {course.lessons.length > 0 && (
              <h3 className="text-sm font-semibold">Lessons</h3>
            )}
            <ul className="text-sm">
              {(showAllLessons
                ? course.lessons
                : course.lessons.slice(0, 1)
              ).map((lesson) => (
                <button
                  className="relative flex w-full p-3 mb-2 flex-col rounded-badge bg-base-100 bg-clip-border shadow-sm overflow-hidden text-left hover:bg-base-300"
                  key={lesson.lesson_plan_id}
                  onClick={() => handleLessonClick(lesson.lesson_plan_id)}
                >
                  <h4>{lesson.title}</h4>
                </button>
              ))}
            </ul>
          </div>
        </div>

        {/* Card actions */}
        <div className="card-actions flex flex-col space-y-2 w-full md:w-auto">
          {course.lessons.length > 1 && (
            <button
              className="w-full text-center rounded-btn bg-primary py-2 px-4 text-xs text-white font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={toggleShowAllLessons}
            >
              {showAllLessons ? "Show Less" : "Show All"}
            </button>
          )}

          <div className="w-full mt-2">
            <button
              className="w-full text-center rounded-btn bg-primary py-2 px-4 text-xs text-white font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={onEnrollCourse}
            >
              Enroll
            </button>
          </div>

          {AuthService.isLoggedInTeacher() && (
            <>
              <button
                className="w-full text-center rounded-btn bg-primary py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                    className="mb-2 w-full p-2 border border-gray-300 rounded-badge"
                  />
                  <textarea
                    placeholder="Implementation"
                    value={lessonImplementation}
                    onChange={(e) => setLessonImplementation(e.target.value)}
                    className="mb-2 w-full p-2 border border-gray-300 rounded-badge"
                  />
                  <textarea
                    placeholder="Real World Application"
                    value={lessonApplication}
                    onChange={(e) => setLessonApplication(e.target.value)}
                    className="mb-2 w-full p-2 border border-gray-300 rounded-badge"
                  />
                  <textarea
                    placeholder="Summary"
                    value={lessonSummary}
                    onChange={(e) => setLessonSummary(e.target.value)}
                    className="mb-2 w-full p-2 border border-gray-300 rounded-badge"
                  />
                  <button
                    type="submit"
                    className="w-full text-center rounded-btn bg-accent py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    Submit
                  </button>
                </form>
              )}
              <button
                className="w-full text-center rounded-btn bg-primary py-2 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
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
