import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from react-router-dom

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/allprograms'); // Navigate to the About page
    };



    return (
        <div className="min-h-screen w-full bg-gray-900 flex">

            <section className="hero min-h-screen" style={{ backgroundImage: 'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)' }}> {/* Remove the extra quotes around the style property */}
                <div className="hero-content text-center text-white">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-6xl font-bold" style={{ color: '#2274a5' }}>RevLearn</h1>
                        <h2 className="text-xl py-6">Pinnacle of learning.</h2>
                        <p className="text-md font-light py-5">Unlock your destined potential and buy now.</p>
                        <button
                            className="btn text-white bg-primary glass hover:bg-primaryActive transition duration-300 py-2.5 px-5 rounded-xl shadow-md hover:translate-y-[-2px]"
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