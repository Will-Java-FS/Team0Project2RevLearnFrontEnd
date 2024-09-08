/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState, useTransition, useEffect } from "react";
import { lineWobble } from "ldrs";
import { faker } from "@faker-js/faker";
import { TbFilterDown, TbFilterUp } from "react-icons/tb";

// Register ldrs loader
lineWobble.register();

type User = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  program_id: number;
  email: string;
  createdAt: string;
};

// Function to generate dummy users
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

type Props = {
  users?: User[];
};

export default function UsersTable({ users = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<"first_name" | "last_name">(
    "first_name",
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const usersPerPage = 10;

  // Use the passed users or generate users
  const generatedUsers = users.length > 0 ? users : generateUsers(50);

  // Filter and sort users
  const filteredAndSortedUsers = generatedUsers
    .filter((user) => {
      for (const [key, value] of Object.entries(filters)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (
          user[key as keyof User]
            ?.toString()
            .toLowerCase()
            .indexOf(value.toLowerCase()) === -1
        ) {
          return false;
        }
      }
      return true;
    })
    .filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);
  const currentUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearchTerm(value);
      setCurrentPage(1);
    });
  };

  const handleSort = (field: "first_name" | "last_name") => {
    setSortField(field);
    setSortOrder((prevOrder) =>
      sortField === field ? (prevOrder === "asc" ? "desc" : "asc") : "asc",
    );
  };

  const handleFilterChange = (field: keyof User, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
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
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {/* Sort Selection */}
        <select
          value={sortField}
          onChange={(e) =>
            handleSort(e.target.value as "first_name" | "last_name")
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
      <div className="overflow-x-auto rounded-lg border border-gray-200 w-full">
        <table className="w-full divide-y divide-gray-200 bg-stone-50 dark:bg-gray-800 dark:text-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="relative whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                <div className="flex items-center">
                  <span
                    onClick={() => handleSort("first_name")}
                    className="cursor-pointer"
                  >
                    First Name
                  </span>
                  {filters["first_name"] !== undefined ? (
                    <TbFilterUp
                      className="ml-2 h-4 w-4 text-gray-500 cursor-pointer"
                      onClick={() => {
                        const newFilters = { ...filters };
                        delete newFilters["first_name"];
                        setFilters(newFilters);
                      }}
                    />
                  ) : (
                    <TbFilterDown
                      className="ml-2 h-4 w-4 text-gray-500 cursor-pointer"
                      onClick={() => {
                        const newFilters = { ...filters };
                        if (filters["first_name"]) {
                          delete newFilters["first_name"];
                        } else {
                          newFilters["first_name"] = "";
                        }
                        setFilters(newFilters);
                      }}
                    />
                  )}
                </div>
                {filters["first_name"] !== undefined && (
                  <input
                    type="text"
                    placeholder="Filter..."
                    className="mt-1 w-full p-1 border border-gray-300 rounded-lg"
                    value={filters["first_name"]}
                    onChange={(e) =>
                      handleFilterChange("first_name", e.target.value)
                    }
                  />
                )}
              </th>
              <th className="relative whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                <div className="flex items-center">
                  <span
                    onClick={() => handleSort("last_name")}
                    className="cursor-pointer"
                  >
                    Last Name
                  </span>
                  {filters["last_name"] !== undefined ? (
                    <TbFilterUp
                      className="ml-2 h-4 w-4 text-gray-500 cursor-pointer"
                      onClick={() => {
                        const newFilters = { ...filters };
                        delete newFilters["last_name"];
                        setFilters(newFilters);
                      }}
                    />
                  ) : (
                    <TbFilterDown
                      className="ml-2 h-4 w-4 text-gray-500 cursor-pointer"
                      onClick={() => {
                        const newFilters = { ...filters };
                        if (filters["last_name"]) {
                          delete newFilters["last_name"];
                        } else {
                          newFilters["last_name"] = "";
                        }
                        setFilters(newFilters);
                      }}
                    />
                  )}
                </div>
                {filters["last_name"] !== undefined && (
                  <input
                    type="text"
                    placeholder="Filter..."
                    className="mt-1 w-full p-1 border border-gray-300 rounded-lg"
                    value={filters["last_name"]}
                    onChange={(e) =>
                      handleFilterChange("last_name", e.target.value)
                    }
                  />
                )}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Username
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Program ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {user.first_name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {user.last_name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {user.username}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {user.program_id}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between p-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
