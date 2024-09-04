// Dashboard.tsx
import React from 'react';
import TeacherDashboard from '../components/TeacherDashboard';
import UserDashboard from '../components/UserDashboard';
import AuthService from '../components/AuthService';

const Dashboard: React.FC = () => {
    const role = AuthService.isLoggedInTeacher() ? 'teacher' : 'user';

    return (
        <div>
            {role === 'teacher' ? <TeacherDashboard /> : <UserDashboard />}
        </div>
    );
};

export default Dashboard;