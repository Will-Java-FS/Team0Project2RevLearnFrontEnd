import AuthService from "./AuthService";
import UsersTable from "./UsersTable";
import EnrollUserForm from "./EnrollmentComponent";

export default function TeacherDashboard() {
  // Get the logged-in user's name and role using AuthService
  const username = AuthService.getLoggedInUsername();
  const role = AuthService.getLoggedInUserRole();


  return (
    <div className="p-6 w-full mx-auto flex flex-col items-center">
      {/* Welcome Back Message */}
      <h1 className="text-2xl font-light mb-4">
        Welcome back, {username !== "NO LOGGED IN USER" ? username : "Guest"}!
      </h1>

      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-center my-8">
        {role} Dashboard
      </h1>

      {/* Enrollment Form */}
      <EnrollUserForm />

      {/* Subheading */}
      <h2 className="text-xl font-semibold text-left mb-4">Find Student</h2>

      {/* Centered Users Table */}
      <div className="w-full max-w-5xl m-10 bg-inherit dark:bg-inherit p-4 rounded-lg shadow-md overflow-x-auto">
        <UsersTable />
      </div>
    </div>
  );
}
