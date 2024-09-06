import React, { useEffect, useState } from 'react';
import TeacherDashboard from '../components/TeacherDashboard';
import UserDashboard from '../components/UserDashboard';
import AuthService from '../components/AuthService';

// Display user info
const Dashboard: React.FC = () => {
    const [role, setRole] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true); // State to control loading animation

    useEffect(() => {
        // Fetch the role using AuthService
        const userRole = AuthService.loggedInUserRole();
        setRole(userRole);

        // Show loading animation for 5 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loading loading-ball loading-lg text-accent animate-bounce delay-[100ms]"></div>
                <div className="loading loading-ball loading-lg text-secondary animate-bounce delay-[300ms]"></div>
                <div className="loading loading-ball loading-lg text-primary animate-bounce delay-[500ms]"></div>
            </div>
        );
    }

    return (
        <div>
            {role === 'student' ? <UserDashboard /> : <TeacherDashboard />}
        </div>
    );
};

export default Dashboard;