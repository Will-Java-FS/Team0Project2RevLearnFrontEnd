import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { User, Program } from "../../utils/types";

const UserEditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/programs");
        setPrograms(response.data);
      } catch (err) {
        setError("Failed to fetch programs. Please try again.");
      } finally {
        setLoadingPrograms(false);
      }
    };

    if (id) {
      fetchUser();
    }
    fetchPrograms();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData ? { ...prevData, [name]: value } : null,
    );
  };

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) =>
      prevData
        ? {
            ...prevData,
            program:
              programs.find(
                (program) => program.programId === parseInt(value),
              ) || null, // Ensure we handle the case when no program is selected
          }
        : null,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        await axios.put(
          `http://localhost:8080/user/update/${formData.userId}`,
          formData,
        );
        console.log("User saved:", formData);
        navigate(-1); // Redirect back after saving
      } catch (err) {
        setError("Failed to save user data. Please try again.");
      }
    }
  };

  if (loading || loadingPrograms) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!formData) {
    return <div>User not found</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>

      {/* Form fields for editing user details */}
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-gray-700 font-semibold mb-2"
        >
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="input input-bordered w-full"
          disabled
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 font-semibold mb-2"
        >
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="input input-bordered w-full"
          disabled
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 font-semibold mb-2"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-gray-700 font-semibold mb-2"
        >
          Role
        </label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      {/* Program Dropdown */}
      <div className="mb-4">
        <label
          htmlFor="program"
          className="block text-gray-700 font-semibold mb-2"
        >
          Program
        </label>
        <select
          name="program"
          value={formData.program?.programId || ""}
          onChange={handleProgramChange}
          className="select select-bordered w-full"
        >
          <option value="">Select a program</option>
          {programs.map((program) => (
            <option key={program.programId} value={program.programId}>
              {program.programName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserEditForm;
