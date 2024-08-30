import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AxiosUserService from "../components/AxiosUserService";
import Modal from "../utils/modal"; // Import Modal component
import Login from "./Login"; // Import Login component

// Define Zod schema for form validation
const formSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

function Register() {
  const [message, setMessage] = useState<string>("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false); // State to control modal visibility
  const navigate = useNavigate();

  // Integrate react-hook-form with Zod validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleRegister: SubmitHandler<FormData> = async (data) => {
    try {
      // Call AxiosUserService's registerUser method
      const isRegistered = await AxiosUserService.registerUser(
        data.username,
        data.password,
        data.email,
        "user" // Assuming a default role; adjust as necessary
      );

      if (isRegistered) {
        setMessage("Registration successful!");

        setTimeout(() => {
          navigate("/login");
        }, 3000); // Delay to allow the message to be displayed

        alert("Successfully created an account!");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <form
        className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 w-full max-w-md p-8"
        onSubmit={handleSubmit(handleRegister)}
      >
        <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
          Create an Account
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
          Join us today. It takes only a few steps.
        </p>
        <div className="mt-10">
          {/* First Name and Last Name on the same row */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <label
                className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                required
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.firstName && (
                <span className="error text-red-500">{errors.firstName.message}</span>
              )}
            </div>
            <div className="relative flex-1">
              <label
                className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                required
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.lastName && (
                <span className="error text-red-500">{errors.lastName.message}</span>
              )}
            </div>
          </div>
          <div className="relative mt-6">
            <label
              className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              required
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.email && (
              <span className="error text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="relative mt-6">
            <label
              className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              required
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.username && (
              <span className="error text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div className="relative mt-6">
            <label
              className="text-left block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              required
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.password && (
              <span className="error text-red-500">{errors.password.message}</span>
            )}
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
              onClick={() => setIsLoginModalOpen(true)} // Show login modal on click
            >
              Sign In
            </button>
          </div>
        </div>
        {message && (
          <p className="text-center mt-4 text-red-500 dark:text-red-400">
            {message}
          </p>
        )}
      </form>

      {/* Modal for Login */}
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login /> {/* Render the Login component inside the modal */}
      </Modal>
    </div>
  );
}

export default Register;