import { useEffect, useState } from "react";
// import axios from "axios";




export default function Lesson() {
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        fetch(`https://api.example.com/lesson/}`)  // Will need to change endpoint later to include lesson id or something
            .then(response => response.json())
            .then(data => setLesson(data))
            .catch(error => console.error('Error fetching lesson:', error));
    }, []);

    // if (!lesson) {
    //     return <p>Loading lesson...</p>;
    // }

    return (
        <>
            <h1>Lesson Title</h1>

            {/* <h1>{lesson.title}</h1>
            <p>{lesson.description}</p> */}
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">Prerequisites and Learning Objectives</div>
                <div className="collapse-content">
                    <p>lorem ipsum 123</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Description</div>
                <div className="collapse-content">
                    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Fames natoqu sollicitudin.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Real World Application</div>
                <div className="collapse-content">
                    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Fames natoqu sollicitudin.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Implementation</div>
                <div className="collapse-content">
                    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Fames natoqu sollicitudin.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Summary</div>
                <div className="collapse-content">
                    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Fames natoqu sollicitudin.</p>
                </div>
            </div>

            <div>
                <button className="btn btn-active">Complete Lesson</button>
            </div>


            <div>
                <h1>Create a Lesson</h1>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What is the lesson title?</span>
                    </div>

                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <div className="label">
                    </div>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What are the prerequisites and learning objectives?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <div className="label">
                    </div>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What is the description ?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <div className="label">
                    </div>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What is the Real World Application ?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <div className="label">
                    </div>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What is the Implementation ?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <div className="label">
                    </div>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What is the Summary ?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <div className="label">
                    </div>
                </label>
                <div>
                    <button className="btn btn-active">Create Lesson</button>
                </div>
            </div>



        </>
    )
}

