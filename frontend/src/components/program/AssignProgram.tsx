import React, { useEffect, useState } from "react";
import AxiosProgramService from "../AxiosProgramService";
import AxiosUserService from "../AxiosUserService";
import { Program, User } from "../../utils/types"; // Ensure Program type is correctly defined

const AssignProgram: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null); // New state to store user details

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsData = await AxiosProgramService.getAll();
        if (programsData) {
          setPrograms(programsData);
        } else {
          setError("Error fetching programs.");
        }
      } catch (error) {
        setError("Error fetching programs.");
        console.error(error);
      }
    };

    fetchPrograms();
  }, []);

  const handleAssignProgram = async () => {
    if (!selectedStudentId || !selectedProgramId) {
      setError("Please enter a student ID and select a program.");
      return;
    }

    try {
      const response = await AxiosProgramService.enrollUserInProgram(
        selectedStudentId,
        selectedProgramId,
      );

      if (response) {
        // Fetch user details after assigning program
        const userDetails =
          await AxiosUserService.fetchUserDetails(selectedStudentId);
        setUserDetails(userDetails); // Store user details
        setSuccessMessage(
          `Program assigned successfully to ${userDetails.firstName} ${userDetails.lastName}!`,
        );
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
    <div className="flex flex-col items-center min-h-content p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Program to Student</h2>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {userDetails && (
        <div className="mb-4">
          <p>User Details:</p>
          <p>ID: {userDetails.userId}</p>
          <p>
            Name: {userDetails.firstName} {userDetails.lastName}
          </p>
          <p>Email: {userDetails.email}</p>
          <p>
            Current Program:{" "}
            {userDetails.program ? userDetails.program.programName : "None"}
          </p>
        </div>
      )}

      <input
        type="number"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter Student ID"
        onChange={(e) => setSelectedStudentId(Number(e.target.value))}
        value={selectedStudentId ?? ""}
      />

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
