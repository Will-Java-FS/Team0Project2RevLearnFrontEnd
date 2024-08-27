import { useEffect, useState } from "react";
import axios from "axios";



export default function Lesson(){
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        fetch(`https://api.example.com/lesson/}`)  // Will need to change endpoint later to include lesson id or something
            .then(response => response.json())
            .then(data => setLesson(data))
            .catch(error => console.error('Error fetching lesson:', error));
    }, []);

    if (!lesson) {
        return <p>Loading lesson...</p>;
    }

    return (
        <>
            {/* <h1>{lesson.title}</h1>
            <p>{lesson.description}</p> */}
            <h1>Lesson Title</h1>
            <h3>Description</h3>
            <p>lorem ipsum</p>
            <h3>Implementation</h3>
            <p>lorem ipsum 123</p>
        </>
    )
}

