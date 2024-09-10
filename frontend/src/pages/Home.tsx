import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from react-router-dom

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/allprograms"); // Navigate to the All Programs page
    };

    return (
        <div className="min-h-screen w-full flex">
            {/* Apply different gradients for light and dark modes, with responsive styles */}
            <section
                className="hero glass min-h-screen bg-gradient-to-r from-amber-200 via-orange-400 to-red-600 dark:from-yellow-500 dark:via-orange-500 dark:to-red-500
                sm:bg-gradient-to-r sm:from-amber-200 sm:via-orange-400 sm:to-red-600
                dark:sm:from-yellow-500 dark:sm:via-orange-500 dark:sm:to-red-500
                md:bg-gradient-to-r md:from-amber-200 md:via-orange-400 md:to-red-600
                dark:md:from-yellow-500 dark:md:via-orange-500 dark:md:to-red-500
                lg:bg-gradient-to-r lg:from-amber-200 lg:via-orange-400 lg:to-red-600
                dark:lg:from-yellow-500 dark:lg:via-orange-500 dark:lg:to-red-500"
            >
                <div className="hero-content text-center text-white dark:text-black">
                    <div className="max-w-md mx-auto">
                        <h1 className="drop-shadow-xl text-6xl font-bold">
                            RevLearn
                        </h1>
                        <h2 className="text-xl py-4">The pinnacle of learning.</h2>
                        <p className="text-md font-light py-5">
                            Sign up for one of our many in-depth programs today!
                        </p>
                        <button
                            className="btn dark:text-white bg-primary glass hover:bg-accent transition duration-300 py-2.5 px-5 shadow-md hover:translate-y-[-2px]"
                            onClick={handleNavigation}
                        >
                            Our Programs
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
