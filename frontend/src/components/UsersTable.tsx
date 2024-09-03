import React, { useState, useTransition, useEffect } from "react";
import { lineWobble } from "ldrs"; // Import the loader from ldrs
import { faker } from "@faker-js/faker"; // Import Faker for generating random users

lineWobble.register(); // Register the loader

// Define User type
type User = {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    program_id: number;
    email: string;
    createdAt: string;
};

// Function to generate random users
const generateUsers = (count: number): User[] => {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        users.push({
            id: faker.datatype.uuid(),
            first_name: firstName,
            last_name: lastName,
            username: `${firstName.toLowerCase()}${faker.datatype.number({
                min: 1,
                max: 100,
            })}`,
            program_id: faker.datatype.number({ min: 1000, max: 9999 }),
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
            createdAt: faker.date.between("2020-01-01", "2024-12-31").toISOString(),
        });
    }
    return users;
};

// Component Props
type Props = {
    users?: User[];
};

export default function UsersTable({ users = [] }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPending, startTransition] = useTransition();
    const [showLoader, setShowLoader] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State for sorting order
    const [sortField, setSortField] = useState<"first_name" | "last_name">(
        "first_name"
    ); // State for sorting field
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const usersPerPage = 10; // Number of users per page

    // Generate random users if not passed as props
    const generatedUsers = users.length > 0 ? users : generateUsers(50); // Generates 50 users

    // Function to filter and sort users based on the search term and sort criteria
    const filteredAndSortedUsers = generatedUsers
        .filter(
            (user) =>
                user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const fieldA = a[sortField].toLowerCase();
            const fieldB = b[sortField].toLowerCase();

            if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
            if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

    // Calculate total pages
    const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);

    // Get users for the current page
    const currentUsers = filteredAndSortedUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const handleSearch = (value: string) => {
        startTransition(() => {
            setSearchTerm(value);
            setCurrentPage(1); // Reset to page 1 when searching
        });
    };

    const handleSortChange = (field: "first_name" | "last_name") => {
        setSortField(field);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

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
            {/* Search Input and Sorting */}
            <div className="mb-4 flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <button
                    onClick={() => toggleSortOrder()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Sort {sortOrder === "asc" ? "Ascending" : "Descending"}
                </button>
                <select
                    value={sortField}
                    onChange={(e) =>
                        handleSortChange(e.target.value as "first_name" | "last_name")
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                    <option value="first_name">First Name</option>
                    <option value="last_name">Last Name</option>
                </select>
            </div>

            {/* Loading Spinner */}
            {showLoader && (
                <div className="flex justify-center mb-4">
                    {/* Use the custom loader */}
                    <l-line-wobble
                        size="80"
                        stroke="5"
                        bg-opacity="0.1"
                        speed="1.75"
                        color="black"
                    ></l-line-wobble>
                </div>
            )}

            {/* Table Component */}
            <div className="rounded-lg border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-stone-50  dark:text-white table-zebra text-sm">
                        <thead className="text-left">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    First Name
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Last Name
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Email
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Program ID
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Created At
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {currentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        {user.first_name}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {user.last_name}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {user.email}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {user.program_id}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {new Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }).format(new Date(user.createdAt))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                    <ol className="flex justify-end gap-1 text-xs font-medium">
                        <li>
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="inline-flex items-center justify-center w-8 h-8 rounded border border-gray-100 bg-white text-gray-900"
                            >
                                <span className="sr-only">Previous Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </li>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`block w-8 h-8 rounded border ${currentPage === index + 1
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-100 bg-white text-gray-900"
                                        } text-center leading-8`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="inline-flex items-center justify-center w-8 h-8 rounded border border-gray-100 bg-white text-gray-900"
                            >
                                <span className="sr-only">Next Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}