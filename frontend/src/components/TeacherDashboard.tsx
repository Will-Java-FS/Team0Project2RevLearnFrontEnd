import AuthService from "./AuthService";
import UsersTable from "./UsersTable";
import users from "./Users.json";

export default function TeacherDashboard() {
  // Get the logged-in user's name using AuthService
  const username = AuthService.loggedInUsername();

  return (
    <div className="p-6 w-full mx-auto flex flex-col items-center">
      {/* Welcome Back Message */}
      <h1 className="text-2xl font-light mb-4">
        Welcome back, {username !== "NO LOGGED IN USER" ? username : "Guest"}!
      </h1>

      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-center my-8">Teacher Dashboard</h1>

      {/* Subheading */}
      <h2 className="text-xl font-semibold text-left mb-4">Find Student</h2>

      {/* Centered Users Table */}
      <div className="w-full max-w-5xl m-10 bg-inherit dark:bg-inherit p-4 rounded-lg shadow-md overflow-x-auto">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
