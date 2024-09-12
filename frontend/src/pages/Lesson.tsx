import AxiosLessonService from "../components/AxiosLessonService";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Updated interface with underscores to match backend model
export interface LessonPlan {
  lesson_plan_id: number;
  title: string;
  description: string;
  realWorldApplication: string;
  implementation: string;
  summary: string;
  lp_created_at: Date;
  lp_updated_at: Date;
}

export default function Lesson() {
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<LessonPlan | null>(null);
  const { id } = useParams()

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonData = await AxiosLessonService.getById(Number(id));
        setLesson(lessonData);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };
    fetchLesson();
  }, []); // Added id to the dependency array to ensure it fetches when id changes

  if (lesson == null) {
    console.log(lesson)
    return <div>Loading...</div>;
  }

  return (
    <div className="block p-10">
      <div className="block p-5">
        <h1>{lesson.title || "Lesson Title"}</h1>
      </div>
      <div className="px-5 py-5 collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">Description</div>
        <div className="collapse-content">
          <p>{lesson.description || "No description available."}</p>
        </div>
      </div>
      <br/>
      <div className="px-5 py-5 collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Real World Application
        </div>
        <div className="collapse-content">
          <p>
            {lesson.realWorldApplication ||
              "No real-world application available."}
          </p>
        </div>
      </div>
      <br/>
      <div className="px-5 py-5 collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Implementation</div>
        <div className="collapse-content">
          <p>
            {lesson.implementation || "No implementation details available."}
          </p>
        </div>
      </div>
      <br/>
      <div className="px-5 py-5 collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Summary</div>
        <div className="collapse-content">
          <p>{lesson.summary || "No summary available."}</p>
        </div>
      </div>

      <div className="block p-5">
        <button className="px-5 py-5 bg-primary rounded-btn btn-active" onClick={() => navigate(-1)}>Complete Lesson</button>
      </div>
    </div>
  );
}