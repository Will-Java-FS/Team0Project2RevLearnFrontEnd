
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
            <h3>Your Programs</h3>
            <div className="card bg-base-200 w-500 shadow-xl">
            <div className="card-body flex flex-row items-center justify-between">
                <h2 className="card-title">Infosys V2 Java  Program</h2>
                <div className="card-actions">
                <button className="btn btn-primary">Click here</button>
                </div>
            </div>
            </div>
            <div className="card bg-base-200 w-500 shadow-xl">
            <div className="card-body flex flex-row items-center justify-between">
                <h2 className="card-title">asdf V2 Java  Program</h2>
                <div className="card-actions">
                <button className="btn btn-primary">Click here</button>
                </div>
            </div>
            </div>
            <div className="card bg-base-200 w-500 xl">
            <div className="card-body flex flex-row items-center justify-between">
                <h2 className="card-title">asdf V2 Java  Program</h2>
                <div className="card-actions">
                <button className="btn btn-primary">Click here</button>
                </div>
            </div>
            </div>
            <h2>Progress Tracker</h2>

        </>
    )
}


