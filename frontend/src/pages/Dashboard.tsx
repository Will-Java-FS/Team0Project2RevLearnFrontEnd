
import { useEffect, useState } from "react";


export default function Dashboard(){
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetch('https://api.example.com/programs')  // Might need to change endponit
          .then(response => response.json())
          .then(data => setPrograms(data))
          .catch(error => console.error('Error fetching programs:', error));
    }, []);

    return (
        <>
            <h1>Dashboard</h1>
            <h3>List of Programs</h3>
            <h3>Progress Tracker</h3>

        </>
    )
}


