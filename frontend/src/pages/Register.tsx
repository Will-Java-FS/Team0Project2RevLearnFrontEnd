import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AxiosUserService from "../components/AxiosUserService";
import Modal from "../utils/modal";
import Login from "./Login";
import axios from "../components/AxiosConfig"; // Assuming you have axios config here

// Define Zod schema for form validation
const formSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["student", "teacher", "admin"]),
  programId: z.string().min(1, "Program must be selected")
});

type FormData = z.infer<typeof formSchema>;

export default function Register() {
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false); // New state for success message
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [programs, setPrograms] = useState<{ programId: number; programName: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of programs from the backend
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("/programs");
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  // Integrate react-hook-form with Zod validation schema
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const handleRegister: SubmitHandler<FormData> = async (data) => {
    try {
      // Call AxiosUserService's registerUser method
      const isRegistered = await AxiosUserService.registerUser(
        data.username,
        data.password,
        data.email,
        data.role,
        data.lastName,
        data.firstName,
        Number(data.programId)
      );

      if (isRegistered) {
        setMessage("Registration successful! Redirecting to login...");
        setIsSuccess(true); // Set success state to true

        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect after 3 seconds
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false); // Set success state to false
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <form
        className="bg-neutral-content dark:bg-neutral shadow-2xl rounded-2xl overflow-hidden border-4 border-accent dark:border-accent w-full max-w-md p-8"
        onSubmit={handleSubmit(handleRegister)}
      >
        <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
          Create an Account
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
          Join us today. It takes only a few steps.
        </p>
        <div className="mt-10">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                required
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.firstName && <span className="error text-red-500">{errors.firstName.message}</span>}
            </div>
            <div className="relative flex-1">
              <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                required
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.lastName && <span className="error text-red-500">{errors.lastName.message}</span>}
            </div>
          </div>
          <div className="relative mt-6">
            <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              required
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.email && <span className="error text-red-500">{errors.email.message}</span>}
          </div>
          <div className="relative mt-6">
            <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              required
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.username && <span className="error text-red-500">{errors.username.message}</span>}
          </div>
          <div className="relative mt-6">
            <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              required
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.password && <span className="error text-red-500">{errors.password.message}</span>}
          </div>
          <div className="relative mt-6">
            <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              {...register("role")}
              required
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <span className="error text-red-500">{errors.role.message}</span>}
          </div>
          <div className="relative mt-6">
            <label className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="programId">
              Program
            </label>
            <select
              id="programId"
              {...register("programId")}
              required
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="">Select a Program</option>
              {programs.map((program) => (
                <option key={program.programId} value={program.programId.toString()}>
                  {program.programName}
                </option>
              ))}
            </select>
            {errors.programId && <span className="error text-red-500">{errors.programId.message}</span>}
          </div>
          {message && (
            <p className={`text-center mt-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-3 mt-8 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
          <div className="flex justify-center mt-4 text-zinc-600 dark:text-zinc-400">
            <p className="text-center">Already have an account?</p>
            <button
              type="button"
              className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login />
      </Modal>
    </div>
  );
}