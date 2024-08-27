import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock login logic
            if (username === "demo" && password === "password") {
                setMessage("Login successful!");
                setShowPopup(true);

                setTimeout(() => {
                    setShowPopup(false);
                    console.log("Navigating to /dashboard...");
                    navigate("/dashboard");
                }, 2000);
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 w-full max-w-md p-8"
                onSubmit={handleLogin}
            >
                <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
                    Welcome Back!
                </h2>
                <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
                    We missed you, sign in to continue.
                </p>
                <div className="mt-10">
                    <div className="relative">
                        <label className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="username">
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
                        <label className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="password">
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
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
                        >
                            Let's Go
                        </button>
                    </div>
                </div>
                {message && <p className="text-center mt-4 text-red-500 dark:text-red-400">{message}</p>}
            </form>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white rounded-lg p-6 text-center">
                        <h3 className="text-xl font-bold">Login Successful</h3>
                        <p className="mt-2">You will be redirected to the dashboard shortly.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;