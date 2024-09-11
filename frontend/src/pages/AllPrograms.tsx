import { useEffect, useState } from "react";
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
      const allPrograms = await AxiosProgramService.getAll();
      if (allPrograms) {
        setPrograms(allPrograms);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="bg-base-100 p-5">
      <h1 className="text-2xl font-bold mb-4">List of Programs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((program) => (
          <div
            key={program.programId}
            className="card bg-base-100 shadow-xl border-2 border-primary"
          >
            <div className="card-body">
              <h2 className="card-title">{program.programName}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
