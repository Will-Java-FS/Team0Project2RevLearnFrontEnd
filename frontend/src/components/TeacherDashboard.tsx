import UsersTable from "../components/UsersTable";
import users from "../components/Users.json";

export default function TeacherDashboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Teacher Dashboard</h1>
      
      {/* Subheading */}
      <h2 className="text-xl font-semibold text-left mb-4">Find Student</h2>
      
      {/* Users Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <UsersTable users={users} />
      </div>
    </div>
  );
}