
import { useEffect, useState } from "react";


export default function Dashboard() {
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
            <div className="card w-bg-base-200 w-500 xl">
                <div className="card-body flex flex-row items-center justify-between">
                    <h2 className="card-title">asdf V2 Java  Program</h2>
                    <div className="card-actions">
                        <button className="btn btn-primary">Click here</button>
                    </div>
                </div>
            </div>

            <div className="card w-bg-base-200 w-80 xl mb-4">
                <div className="card-body flex flex-row items-center justify-between">
                    <h2 className="card-title">asdf V2 Java Program</h2>
                    <div className="card-actions">
                        <button className="btn btn-primary">Click here</button>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h1 className="text-3xl text-primary mb-4">Course Progress</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="card bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center h-40">
                        <h2 className="text-lg font-semibold mb-2">Radial Progress 1</h2>
                        <div className="radial-progress text-primary" style={{ "--value": 70 }} role="progressbar">
                            70%
                        </div>
                    </div>

                    <div className="card bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center h-40">
                        <h2 className="text-lg font-semibold mb-2">Radial Progress 2</h2>
                        <div className="radial-progress text-primary" style={{ "--value": 70 }} role="progressbar">
                            70%
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


