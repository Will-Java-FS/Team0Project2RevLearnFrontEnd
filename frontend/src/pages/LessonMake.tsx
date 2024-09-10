import AxiosLessonService from "..//components/AxiosLessonService";

import { useState } from "react";

export default function lessonMake()
{
    const [title,setTitle] = useState<string>("Title here");
    const [content, setContent] = useState<string>("Content here")
    // function buttonEffect(){
    //     const tinp = document.getElementById("titleInp");
    //     const cinp = document.getElementById("contentInp");
    //     AxiosLessonService.create(tinp.value,cinp.value);
    // }
    return (<>
    <div>
        <h1>Create a Lesson</h1>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is the lesson title?</span>
          </div>
          <input
            id = "titleInp"
            type="text"
            placeholder="Title here"
            className="input input-bordered w-full max-w-xs"
            onChange={setTitle("titleInp")}
          />
        </label>


        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is the content?</span>
          </div>
          <input
            id="contentInp"
            type="text"
            placeholder="Content here"
            className="input input-bordered w-full max-w-xs"
            onChange={setTitle("contentInp")}
          />
        </label>

        <div>
          <button className="btn btn-active" onClick={buttonEffect}>Create Lesson</button>
        </div>
      </div>
      </>
    )
}