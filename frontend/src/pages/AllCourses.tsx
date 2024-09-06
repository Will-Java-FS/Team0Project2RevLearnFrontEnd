import { useState } from "react";
import Card from "../components/Card"; // Adjust the path to where the Card component is located

// Show all courses for the user's program and be able to select one and go it's page
// If user is teacher show a form to create a new course
export default function AllCourses() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of card components per page
    const totalCards = 30; // Total number of card items
    const totalPages = Math.ceil(totalCards / itemsPerPage);

    // Dummy data for card components
    const cardData = Array.from({ length: totalCards }, (_, index) => ({
        title: `Data Structures & Algorithms ${index + 1}`,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.",
        link: "https://example.com",
    }));

    // Get the card components for the current page
    const currentCards = cardData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        <div className="flex flex-col items-center min-h-screen p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                {currentCards.map((card, index) => (
                    <Card key={index} title={card.title} description={card.description} link={card.link} />
                ))}
            </div>
            <div className="flex justify-between items-center w-full max-w-md px-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="btn-sm hover:glass bg-orange-500/80 rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="btn-sm hover:glass bg-orange-500/80 rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
