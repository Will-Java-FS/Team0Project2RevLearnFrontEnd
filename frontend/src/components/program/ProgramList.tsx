import React, { useEffect, useState } from "react";
import AxiosProgramService from "../AxiosProgramService"; // Adjust the import path accordingly

const ProgramList: React.FC = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      const result = await AxiosProgramService.getAll();
      if (result) {
        setPrograms(result);
      } else {
        setError("Failed to fetch programs.");
      }
      setLoading(false);
    };

    fetchPrograms();
  }, []);

  const handleDeleteProgram = async (id: number) => {
    const success = await AxiosProgramService.delete(id);
    if (success) {
      setPrograms(programs.filter((program) => program.programId !== id));
    } else {
      setError(`Failed to delete program with id ${id}`);
    }
  };

  if (loading) {
    return <p>Loading programs...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Programs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div
            key={program.programId}
            className="dark:bg-slate-700 dark:text-white text-center shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl text-primary font-suse font-semibold mb-2">
              {program.programName}
            </h2>
            <p className="text-md dark:text-white text-gray-700 mb-4">
              Description or details about the program can go here.
            </p>
            <button
              onClick={() => handleDeleteProgram(program.programId)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramList;
