import AxiosLessonService from "../components/AxiosLessonService";
import {
  useEffect,
   useState
} from "react";

interface Lesson {
  lesson_plan_id: number;
  title: string;
  content: string;
}
// Show all parts of the lesson
// Give students a way to complete the lesson
// Give teachers a way to edit/delete the lesson
// Use authService to get logged in user's info, use the axios services for http requests
export default function Lesson(props :{id: number}) {
  const dummyLesson = {
    lesson_plan_id: -1,
    title: "Introduction to Object-Oriented Programming",
    content:
      "This lesson introduces the fundamental concepts of Object-Oriented Programming (OOP) in Java, including classes, objects, inheritance, polymorphism, and encapsulation."

  };
  const [lesson, setLesson] = useState<Lesson>(dummyLesson);

  

  useEffect(() => {
     const lesson = AxiosLessonService.getById(props.id);
    setLesson(lesson || dummyLesson)
     
  }, []);

  return (
    <>
      <h1>{lesson.title || "Lesson Title"}</h1>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">Description</div>
        <div className="collapse-content">
          <p>{lesson.content || "No content available."}</p>
        </div>
      </div>
      

      <div>
        <button className="btn btn-active">Complete Lesson</button>
      </div>

      
    </>
  );
}
