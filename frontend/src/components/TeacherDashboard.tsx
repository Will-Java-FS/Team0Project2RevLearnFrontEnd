import AuthService from "./AuthService";
import UsersTable from "./UsersTable";
import AddProgram from "./program/AddProgram";
import AssignProgram from "./program/AssignProgram";
import ProgramList from "./program/ProgramList";

export default function TeacherDashboard() {
  // Get the logged-in user's name and role using AuthService
  const firstName = AuthService.getLoggedInFirstName();
  const lastName = AuthService.getLoggedInLastName();

  const welcomeMessage =
    firstName && lastName
      ? `Professor ${firstName} ${lastName}`
      : "Welcome back!";

  return (
    <div className="p-6 w-full mx-auto flex flex-col items-center">
      {/* Welcome Back Message */}
      <h1 className="text-3xl font-light mb-4">{welcomeMessage}</h1>

      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-primary text-center my-8">
        Teacher Dashboard
      </h1>

      {/* Enrollment and Program Form Container */}
      <div className="w-full max-w-5xl flex flex-row justify-between space-x-4 mb-8">
        {/* Assign Program Form */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <AssignProgram />
        </div>

        {/* Add Program Form */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <AddProgram />
        </div>
      </div>

      {/* Program List */}
      <ProgramList />

      {/* Subheading */}
      <h2 className="text-xl font-semibold text-left mb-4">Find Student</h2>

      {/* Centered Users Table */}
      <div className="w-full max-w-5xl m-10 bg-inherit dark:bg-inherit p-4 rounded-lg shadow-md overflow-x-auto">
        <UsersTable />
      </div>
    </div>
  );
}
