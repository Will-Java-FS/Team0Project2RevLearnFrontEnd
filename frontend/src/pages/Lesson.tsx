import { useState } from "react";


export default function Lesson(){
    const [title, setTitle] = useState([]);

    return (
        <>
        <h1>Lesson Title</h1>
        <h3>Description</h3>
        <p>lorem ipsum</p>
        <h3>Implementation</h3>
        <p>lorem ipsum 123</p>
        </>
    )
}

