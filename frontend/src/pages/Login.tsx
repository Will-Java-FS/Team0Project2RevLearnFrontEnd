import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AxiosUserService from "../components/AxiosUserService";
import Modal from "../utils/modal"; // Import the Modal component

// Define Zod schema for form validation
const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Integrate react-hook-form with Zod validation schema
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
        setLoading(true);
        try {
            const { success, message } = await AxiosUserService.loginUser(data.username, data.password);

            if (success) {
                setMessage(message ?? "Login successful!");
                setIsSuccess(true);
                setIsModalOpen(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    navigate("/dashboard");
                }, 2000);
            } else {
                setMessage(message ?? "An error occurred. Please try again.");
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setMessage("An error occurred. Please try again later.");
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                className="bg-neutral-content dark:bg-neutral shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 w-full max-w-md p-8"
                onSubmit={handleSubmit(handleLogin)}
            >
                <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
                    Welcome Back!
                </h2>
                <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
                    Let&rsquo;s get to learning!
                </p>
                <div className="mt-10">
                    <div className="relative">
                        <label
                            className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            {...register("username")}
                            aria-invalid={errors.username ? "true" : "false"}
                            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                        {errors.username && (
                            <span className="text-red-500 text-sm">{errors.username.message}</span>
                        )}
                    </div>
                    <div className="relative mt-6">
                        <label
                            className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            aria-invalid={errors.password ? "true" : "false"}
                            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? "Logging in..." : "Let's Go"}
                        </button>
                    </div>
                </div>
                <div className="px-8 py-2">
                    <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
                        Need an account?
                        <button
                            type="button"
                            className="font-medium underline hover:text-blue-300 ml-1"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/register");
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
                {message && (
                    <p className={`text-center mt-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
            </form>

            {/* Use Modal for the success message */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3 className="text-xl font-bold text-green-600">Login Successful</h3>
                <p className="mt-2">You will be redirected to the dashboard shortly.</p>
            </Modal>
        </div>
    );
};

export default Login;