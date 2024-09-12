import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AxiosProgramService from "../AxiosProgramService"; // Import the AxiosProgramService

const AddProgram: React.FC = () => {
  const [programName, setProgramName] = useState<string>("");
  const [programDescription, setProgramDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateProgram = async () => {
    // Reset notifications
    if (!programName.trim() || !programDescription.trim()) {
      toast.error("Program name and description cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await AxiosProgramService.create(
        programName,
        programDescription,
      ); // Pass both name and description

      if (response) {
        toast.success("Program created successfully!");
        setProgramName("");
        setProgramDescription("");
      } else {
        toast.error("Failed to create program.");
      }
    } catch (error) {
      toast.error("Error creating program. Please try again.");
      console.error("Error creating program:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-content p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Program</h2>

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
        className={`btn mt-4 bg-primary text-white py-2 px-4 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Creating..." : "Create Program"}
      </button>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AddProgram;
