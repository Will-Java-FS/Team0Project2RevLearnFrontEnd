import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Assuming you use axios for HTTP requests

// Define a User type for form state
interface Program {
    programId: number;
    programName: string;
}

interface User {
    userId: number;
    email: string;
    username: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    userCreatedAt: string;
    role: string;
    userUpdatedAt: string;
    program: Program;
}

const UserEditForm: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the user ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/user/${id}`); // Fetch user data from your API
                setFormData(response.data);
            } catch (err) {
                setError('Failed to fetch user data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
    };

    const handleProgramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) =>
            prevData ? { ...prevData, program: { ...prevData.program, [name]: value } } : null
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            try {
                await axios.put(`http://localhost:8080/user/update/${formData.userId}`, formData); // Update user data using your API
                console.log('User saved:', formData);
                navigate(-1); // Navigate back to the previous page after saving
            } catch (err) {
                setError('Failed to save user data. Please try again.');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Show error message if fetching fails
    }

    if (!formData) {
        return <div>User not found</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>

            <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
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
                <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
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
                <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
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

            <div className="mb-4">
                <label htmlFor="programName" className="block text-gray-700 font-semibold mb-2">
                    Program Name
                </label>
                <input
                    type="text"
                    name="programName"
                    value={formData.program.programName}
                    onChange={handleProgramChange}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
                <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate(-1)}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default UserEditForm;