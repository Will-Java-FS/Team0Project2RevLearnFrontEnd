import { useEffect, useState } from "react";

export default function Lesson() {
    const [lesson, setLesson] = useState({});

    const dummyLesson = {
        lessonName: "Introduction to Object-Oriented Programming",
        description: "This lesson introduces the fundamental concepts of Object-Oriented Programming (OOP) in Java, including classes, objects, inheritance, polymorphism, and encapsulation.",
        realWorldApplication: "OOP principles are used in software development to create modular, reusable, and maintainable code. Examples include the development of enterprise applications, mobile apps, and games.",
        implementation: "You will implement a simple Java program that demonstrates the use of classes and objects. This program will model a real-world entity, such as a 'Car,' with properties like 'make,' 'model,' and 'year,' and methods like 'start' and 'stop.'",
        summary: "By the end of this lesson, you should have a solid understanding of OOP principles and how to apply them in Java programming. You will also have hands-on experience creating a basic Java program using these concepts."
    };

    useEffect(() => {
        // setLesson(dummyLesson);
    }, []);

    return (
        <>
            <h1>{dummyLesson.lessonName || "Lesson Title"}</h1>

            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">Description</div>
                <div className="collapse-content">
                    <p>{dummyLesson.description || "No description available."}</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Real World Application</div>
                <div className="collapse-content">
                    <p>{dummyLesson.realWorldApplication || "No real-world application available."}</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Implementation</div>
                <div className="collapse-content">
                    <p>{dummyLesson.implementation || "No implementation details available."}</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Summary</div>
                <div className="collapse-content">
                    <p>{dummyLesson.summary || "No summary available."}</p>
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
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What are the prerequisites and learning objectives?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What is the description?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What is the Real World Application?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What is the Implementation?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">What is the Summary?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <div>
                    <button className="btn btn-active">Create Lesson</button>
                </div>
            </div>
        </>
    );
}