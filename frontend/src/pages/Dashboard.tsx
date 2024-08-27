import { useState } from "react";


export default function Dashboard(){
    const [set, setTitle] = useState([]);

    return (
        <>
        <h1>Dashboard</h1>
        <h3>List of Programs</h3>
        <h3>Progress Tracker</h3>

        </>
    )
}

