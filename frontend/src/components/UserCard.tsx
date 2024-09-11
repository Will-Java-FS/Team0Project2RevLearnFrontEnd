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

  if (loadingUser) return <p>Loading user data...</p>;
  if (error) return <p>{error}</p>;

  return user ? (
    <div className="max-w-sm mx-auto bg-secondary-content dark:bg-secondary-content dark:text-white text-slate-100 shadow-md rounded-lg overflow-hidden">
      {/* User Image */}
      <div className="flex justify-center mt-4">
        <img
          className="h-24 w-24 rounded-full object-cover border-2 border-primary"
<<<<<<< HEAD
          src={user.profilePicture || "https://via.placeholder.com/150"} // Fallback if profilePicture is undefined
=======
          src={user.profilePicture || 'https://avatar.iran.liara.run/public'}
>>>>>>> Drew
          alt="User Profile"
        />
      </div>

      {/* User Info */}
      <div className="text-center px-6 py-4">
        <h2 className="text-2xl font-bold text-primary">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-500">{user.title || "Title not available"}</p>
        <p className="text-gray-500 mt-1">
          <span className="font-semibold">Role:</span> {user.role}
        </p>
        <p className="text-gray-500 mt-1">Username: {user.username}</p>
        <p className="text-gray-500 mt-1">Email: {user.email}</p>
        <p className="text-gray-500 mt-1">Program: {user.program.programName}</p>
        <p className="text-gray-400 text-sm mt-1">
          Joined on: {new Date(user.userCreatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* User Actions */}
<<<<<<< HEAD
      <div className="flex justify-around py-4 bg-gray-100">
        <button className="btn btn-warning rounded-xl">Edit</button>
        <button className="btn btn-error">Delete</button>
=======
      <div className="flex justify-center gap-4 py-4 bg-gray-100">
        <button className="btn btn-warning rounded-xl" onClick={handleEditClick}>
          Edit
        </button>

        <button className="btn btn-error rounded-xl">Delete</button>
>>>>>>> Drew
      </div>
    </div>
  ) : (
    <p>No user data available.</p>
  );
};

export default UserCard;