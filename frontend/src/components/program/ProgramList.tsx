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
    <div>
      <h1>Programs</h1>
      {programs.map((program) => (
        <div key={program.programId}>
          <p>{program.programName}</p>
          <button onClick={() => handleDeleteProgram(program.programId)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProgramList;
