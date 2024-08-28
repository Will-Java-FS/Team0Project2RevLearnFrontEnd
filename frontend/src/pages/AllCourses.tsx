import { useState } from "react";
import { Skeleton } from "../utils/skeletons"; // Adjust the path as needed

export default function AllCourses() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Number of skeleton components per page
    const totalSkeletons = 24;
    const totalPages = Math.ceil(totalSkeletons / itemsPerPage);

    // Get the skeleton components for the current page
    const currentSkeletons = Array.from({ length: itemsPerPage }).map((_, index) => (
        <Skeleton key={index} />
    ));

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <h1 className="text-primary text-4xl font-bold my-4 text-center">List of All Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                {currentSkeletons}
            </div>
            <div className="flex justify-center items-center mt-4 space-x-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                >
                    Next
                </button>
            </div>
        </>
    );
}