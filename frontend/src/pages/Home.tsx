import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Home() {
    const [args] = useState({});
    const navigate = useNavigate();


    const handleNavigation = () => {
        navigate('/allprograms'); // Navigate to the About page
    };


    return (
        <div className="min-h-screen w-full bg-gray-900 flex">
            <section className="hero min-h-screen bg-orange-500">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl text-primary font-suse font-bold">RevLearn</h1>
                        <p className="py-6">
                            Pinnacle of learning. Unlock your destined potential and buy now.
                        </p>
                        <button className="btn btn-primary hover:bg-neutral-50" onClick={handleNavigation} >Programs</button>
                    </div>
                </div>
            </section>
        </div>
    );
}




export default Home;
