import { useEffect, useState } from "react";
import AuthService from "../components/AuthService";
import AxiosProgramService from "../components/AxiosProgramService";

interface Program {
  programId: number;
  programName: string;
}

export default function AllPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    // Fetch all programs using AxiosProgramService
    const fetchPrograms = async () => {
      const fetchedPrograms = await AxiosProgramService.getAll();
      if (fetchedPrograms) {
        setPrograms(fetchedPrograms);
      } else {
        console.error("Failed to fetch programs");
      }
    };

    fetchPrograms();
  }, []);

  function Item({
    programId,
    programName,
  }: {
    programId: number;
    programName: string;
  }) {
    if (programId === AuthService.getLoggedInUserProgramId()) {
      return (
        <div
          key={programId}
          className="card bg-base-200 shadow-xl border-2 border-primary"
        >
          <div className="card-body">
            <h2 className="card-title">{programName} - Your program</h2>
          </div>
        </div>
      );
    }
    return (
      <div
        key={programId}
        className="card bg-base-100 shadow-xl border-2 border-accent"
      >
        <div className="card-body">
          <h2 className="card-title">{programName}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">List of Programs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((program) => (
          <Item
            key={program.programId} // Add key prop here
            programId={program.programId}
            programName={program.programName}
          />
        ))}
      </div>
    </div>
  );
}
