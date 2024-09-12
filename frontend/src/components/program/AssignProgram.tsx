import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Program } from "../../utils/types"; // Ensure User and Program types are correctly defined

const AssignProgram: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentsAndPrograms = async () => {
      try {
        const [studentsResponse, programsResponse] = await Promise.all([
          axios.get("http://localhost:8080/users/students"), // Adjust endpoint for fetching students
          axios.get("http://localhost:8080/programs"),
        ]);

        setStudents(studentsResponse.data);
        setPrograms(programsResponse.data);
      } catch (error) {
        setError("Error fetching students or programs.");
        console.error(error);
      }
    };

    fetchStudentsAndPrograms();
  }, []);

  const handleAssignProgram = async () => {
    if (!selectedStudentId || !selectedProgramId) {
      setError("Please select a student and a program.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/users/${selectedStudentId}/assign-program`,
        { programId: selectedProgramId },
      );

      if (response.status === 200) {
        setSuccessMessage("Program assigned successfully!");
        setError(null); // Clear any previous error messages
      } else {
        setError("Failed to assign program.");
        setSuccessMessage(null); // Clear any previous success messages
      }
    } catch (error) {
      setError("Error assigning program. Please try again.");
      console.error("Error assigning program:", error);
      setSuccessMessage(null); // Clear any previous success messages
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Program to Student</h2>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <select
        className="w-full p-2 border border-gray-300 rounded mb-4"
        onChange={(e) => setSelectedStudentId(Number(e.target.value))}
        value={selectedStudentId ?? ""}
      >
        <option value="" disabled>
          Select Student
        </option>
        {students.map((student) => (
          <option key={student.userId} value={student.userId}>
            {student.firstName} {student.lastName}
          </option>
        ))}
      </select>

      <select
        className="w-full p-2 border border-gray-300 rounded mb-4"
        onChange={(e) => setSelectedProgramId(Number(e.target.value))}
        value={selectedProgramId ?? ""}
      >
        <option value="" disabled>
          Select Program
        </option>
        {programs.map((program) => (
          <option key={program.programId} value={program.programId}>
            {program.programName}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssignProgram}
        className="btn bg-primary text-white py-2 px-4 rounded"
      >
        Assign Program
      </button>
    </div>
  );
};

export default AssignProgram;
