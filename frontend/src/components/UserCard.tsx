import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import axiosInstance from './AxiosConfig';
import { User } from '../utils/types';

interface UserCardProps {
  user?: User; // Make user prop optional since we're fetching it internally
}

const UserCard: React.FC<UserCardProps> = ({ user: initialUser }) => {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [loadingUser, setLoadingUser] = useState<boolean>(!initialUser);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch user details by authenticated user ID
  const fetchUserDetails = async () => {
    const userId = AuthService.getLoggedInUserId();
    if (userId !== -1 && !initialUser) {
      try {
        const response = await axiosInstance.get<User>(`/user/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.error('Failed to fetch user details:', err);
        setError('Failed to fetch user details.');
      } finally {
        setLoadingUser(false);
      }
    } else {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (!initialUser) {
      fetchUserDetails();
    }
  }, [initialUser]);

  // Handler to navigate to the edit page
  const handleEditClick = () => {
    const userId = AuthService.getLoggedInUserId();
    navigate(`/user/edit/${userId}`);
  };

  // Generate avatar URL
  const generateAvatarUrl = (firstName: string, lastName: string) => {
    return `https://avatar.iran.liara.run/username?username=${firstName}${lastName}`;
  };

  if (loadingUser) return <p>Loading user data...</p>;
  if (error) return <p>{error}</p>;

  return user ? (
    <div className="max-w-sm mx-auto bg-secondary-content dark:bg-secondary-content dark:text-white text-slate-100 shadow-md rounded-lg overflow-hidden">
      {/* User Image */}
      <div className="flex justify-center mt-4">
        <img
          className="h-24 w-24 rounded-full object-cover border-2 border-primary"
          src={user.firstName && user.lastName ? generateAvatarUrl(user.firstName, user.lastName) : "https://avatar.iran.liara.run/public"} // Use dynamic avatar URL
          alt="User Profile"
        />
      </div>

      {/* User Info */}
      <div className="text-center px-6 py-4">
        <h2 className="text-2xl font-bold text-primary">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-light text-sm mt-1">
          <span className="font-semibold">Role:</span> {user.role}
        </p>
        <p className="text-light text-sm mt-1">
          <span className="font-semibold">Username: </span>
          {user.username}
        </p>
        {/* Conditionally render the program name if program is not null */}
        <p className="text-light text-sm m-1">
          <span className="font-semibold">Program:</span> {user.program ? user.program.programName : "No Program Assigned"}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Joined on: {new Date(user.userCreatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* User Actions */}
      <div className="flex justify-center gap-4 py-4 bg-gray-100">
        <button className="btn btn-warning rounded-xl" onClick={handleEditClick}>
          Edit
        </button>

        <button className="btn btn-error rounded-xl">Delete</button>
      </div>
    </div>
  ) : (
    <p>No user data available.</p>
  );
};

export default UserCard;
