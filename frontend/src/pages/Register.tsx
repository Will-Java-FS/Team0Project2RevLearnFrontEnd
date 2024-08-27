import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
    onRegisterSuccess: () => void;
}

function Register({ onRegisterSuccess }: RegisterProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Set mock successful message
            setMessage("Registration successful!");
            onRegisterSuccess(); // Trigger any additional actions after registration

            // Delay redirect
            setTimeout(() => {
                navigate("/login");
            }, 3000); // Delay to allow the message to be displayed

            // Show alert message
            alert("Successfully created an account!");
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <form
                className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 w-full max-w-md p-8"
                onSubmit={handleRegister}
            >
                <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
                    Create an Account
                </h2>
                <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
                    Join us today. It takes only a few steps.
                </p>
                <div className="mt-10">
                    {/* Input Fields */}
                    <div className="relative">
                        <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div className="relative mt-6">
                        <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div className="relative mt-6">
                        <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div className="relative mt-6">
                        <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div className="relative mt-6">
                        <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="px-8 py-2">
                    <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
                        Already have an account?
                        <button
                            className="font-medium underline hover:text-blue-300 ml-1"
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
                {message && <p className="text-center mt-4 text-red-500 dark:text-red-400">{message}</p>}
            </form>
        </div>
    );
}

export default Register;