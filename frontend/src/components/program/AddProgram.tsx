import React, { useState } from "react";
import AxiosProgramService from "../AxiosProgramService"; // Import the AxiosProgramService

const AddProgram: React.FC = () => {
  const [programName, setProgramName] = useState<string>("");
  const [programDescription, setProgramDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateProgram = async () => {
    // Reset the messages
    setError(null);
    setSuccessMessage(null);

    if (!programName.trim() || !programDescription.trim()) {
      setError("Program name and description cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await AxiosProgramService.create(
        programName,
        programDescription,
      ); // Pass both name and description

      if (response) {
        setSuccessMessage("Program created successfully!");
        setProgramName("");
        setProgramDescription("");
      } else {
        setError("Failed to create program.");
      }
    } catch (error) {
      setError("Error creating program. Please try again.");
      console.error("Error creating program:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-content p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Program</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      <input
        type="text"
        placeholder="Program Name"
        value={programName}
        onChange={(e) => setProgramName(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <textarea
        placeholder="Program Description"
        value={programDescription}
        onChange={(e) => setProgramDescription(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <button
        onClick={handleCreateProgram}
        disabled={loading}
        className={`btn bg-primary text-white py-2 px-4 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Creating..." : "Create Program"}
      </button>
    </div>
  );
};

export default AddProgram;
