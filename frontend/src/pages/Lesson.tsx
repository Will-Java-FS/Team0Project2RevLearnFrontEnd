import AxiosLessonService from "../components/AxiosLessonService";
import {
  useEffect,
  useState
} from "react";

// Updated interface with underscores to match backend model
export interface LessonPlan {
  lesson_plan_id: number;
  title: string;
  description: string;
  real_world_application: string;
  implementation: string;
  summary: string;
  lp_created_at: Date;
  lp_updated_at: Date;
}

export default function Lesson({ id }: { id: number }) {
  const [lesson, setLesson] = useState<LessonPlan | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonData = await AxiosLessonService.getById(id);
        setLesson(lessonData);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };
    fetchLesson();
  }, [id]); // Added id to the dependency array to ensure it fetches when id changes

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{lesson.title || "Lesson Title"}</h1>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">Description</div>
        <div className="collapse-content">
          <p>{lesson.description || "No description available."}</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Real World Application
        </div>
        <div className="collapse-content">
          <p>
            {lesson.real_world_application ||
              "No real-world application available."}
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Implementation</div>
        <div className="collapse-content">
          <p>
            {lesson.implementation || "No implementation details available."}
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Summary</div>
        <div className="collapse-content">
          <p>{lesson.summary || "No summary available."}</p>
        </div>
      </div>

      <div>
        <button className="btn btn-active">Complete Lesson</button>
      </div>

      {/* Form for creating a lesson - uncomment if needed
      <div>
        <h1>Create a Lesson</h1>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is the lesson title?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              What are the prerequisites and learning objectives?
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is the description?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              What is the Real World Application?
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is the Implementation?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is the Summary?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <div>
          <button className="btn btn-active">Create Lesson</button>
        </div>
      </div> */}
    </>
  );
}