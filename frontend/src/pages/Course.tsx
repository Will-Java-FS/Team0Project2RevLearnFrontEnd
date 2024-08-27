import { useEffect, useState } from "react";


export default function Course(){
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        fetch('https://api.example.com/courses/')  // Need to change the endpoint probably
          .then(response => response.json())
          .then(data => setLessons(data))
          .catch(error => console.error('Error fetching lessons:', error));
    }, []);

    return (
        <>
            {/* <ul>
                {lessons.map(lesson => (
                <li key={lesson.id}>
                    <h2>{lesson.title}</h2>
                    <p>{lesson.description}</p>
                </li>
                ))}
            </ul> */}

            <h1>List of your courses</h1>
            <h3>Card 1</h3>
            <h3>Card 2</h3>

        </>
    )
}
