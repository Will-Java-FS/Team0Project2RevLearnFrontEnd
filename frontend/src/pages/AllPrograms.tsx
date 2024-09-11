import { useEffect, useState } from "react";
import axiosInstance from "../components/AxiosConfig";
import AuthService from "../components/AuthService";

interface Program {
  programId: number;
  programName: string;
}

export default function AllPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [userProgramId, setUserProgramId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [newProgramName, setNewProgramName] = useState<string>("");

  useEffect(() => {
    // Fetch all programs
    const fetchPrograms = async () => {
      try {
        const response = await axiosInstance.get<Program[]>("http://localhost:8080/programs");
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    // Fetch user info using AuthService
    const fetchUserInfo = () => {
      const userProgramId = AuthService.getLoggedInUserProgramId();
      const userRole = AuthService.getLoggedInUserRole();

      setUserProgramId(userProgramId !== -1 ? userProgramId : null);
      setUserRole(userRole);
    };

    fetchPrograms();
    fetchUserInfo();
  }, []);

  // Handle program setting
  const handleSetProgram = async (programId: number) => {
    try {
      await axiosInstance.post("/user/set-program", { programId });
      setUserProgramId(programId);
    } catch (error) {
      console.error("Error setting program:", error);
    }
  };

  // Handle leaving the program
  const handleLeaveProgram = async () => {
    try {
      await axiosInstance.post("/user/leave-program");
      setUserProgramId(null);
    } catch (error) {
      console.error("Error leaving program:", error);
    }
  };

  // Handle creating a new program
  const handleCreateProgram = async () => {
    if (!newProgramName.trim()) return;

    try {
      await axiosInstance.post("/programs/create", { programName: newProgramName });
      setNewProgramName("");
      // Fetch updated programs list after creating a new program
      const response = await axiosInstance.get<Program[]>("http://localhost:8080/programs");
      setPrograms(response.data);
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  return (
    <div className="bg-base-100 p-5">
      <h1 className="text-2xl font-bold mb-4">List of Programs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((program) => (
          <div
            key={program.programId}
            className={`card bg-base-100 shadow-xl ${program.programId === userProgramId ? "border-2 border-primary" : ""}`}
          >
            <div className="card-body">
              <h2 className="card-title">{program.programName}</h2>
              {program.programId === userProgramId ? (
                <>
                  <p>You are currently enrolled in this program.</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">View Courses</button>
                    <button className="btn btn-secondary" onClick={handleLeaveProgram}>Leave Program</button>
                  </div>
                </>
              ) : (
                <>
                  <p>Join this program to start learning.</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => handleSetProgram(program.programId)}>
                      Join Program
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show form to create a new program if user is a teacher and has no program */}
      {userRole === "teacher" && userProgramId === null && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Create a New Program</h2>
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Program Name"
            value={newProgramName}
            onChange={(e) => setNewProgramName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleCreateProgram}>
            Create Program
          </button>
        </div>
      )}
    </div>
  );
}
