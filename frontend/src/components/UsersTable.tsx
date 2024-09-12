import { useState, useTransition, useEffect } from "react";
import AxiosUserService from "./AxiosUserService"; // Import the AxiosUserService
import { User } from "../utils/types"; // Assuming you have defined User type in a types file

type Props = {
  users?: User[];
};

export default function UsersTable({ users = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<keyof User>("firstName");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("student"); // Default to "student" role
  const usersPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let users;
        if (selectedRole === "all") {
          users = await AxiosUserService.getAllUsers(); // Fetch all users if "all" is selected
        } else {
          users = await AxiosUserService.fetchUsersByRole(selectedRole); // Fetch users by selected role
        }
        setFetchedUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [selectedRole]); // Re-fetch when selectedRole changes

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const generatedUsers = users.length > 0 ? users : fetchedUsers;

  const filteredAndSortedUsers = generatedUsers
    .filter((user) => {
      return Object.entries(filters).every(([key, value]) =>
        user[key as keyof User]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      );
    })
    .filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const fieldA = a[sortField]?.toString().toLowerCase() ?? "";
      const fieldB = b[sortField]?.toString().toLowerCase() ?? "";

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);
  const currentUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  useEffect(() => {
    if (isPending) {
      const timer = setTimeout(() => {
        setShowLoader(true);
      }, 500);

      return () => {
        clearTimeout(timer);
        setShowLoader(false);
      };
    } else {
      setShowLoader(false);
    }
  }, [isPending]);

  return (
    <div className="p-4">
      {showLoader && <div className="loader">Loading...</div>}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="p-2 border rounded"
        />
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="p-2 border rounded"
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
          {/* Add more roles as needed */}
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th
              className="p-2 border-b cursor-pointer"
              onClick={() => setSortField("firstName")}
            >
              First Name{" "}
              {sortField === "firstName"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              className="p-2 border-b cursor-pointer"
              onClick={() => setSortField("lastName")}
            >
              Last Name{" "}
              {sortField === "lastName"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Username</th>
            <th className="p-2 border-b">Role</th>
            <th className="p-2 border-b">Program</th>
            <th className="p-2 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.userId}>
              <td className="p-2 border-b">{user.firstName}</td>
              <td className="p-2 border-b">{user.lastName}</td>
              <td className="p-2 border-b">{user.email}</td>
              <td className="p-2 border-b">{user.username}</td>
              <td className="p-2 border-b">{user.role}</td>
              <td className="p-2 border-b">
                {user.program ? user.program.programName : "N/A"}
              </td>
              <td className="p-2 border-b">{user.userCreatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
