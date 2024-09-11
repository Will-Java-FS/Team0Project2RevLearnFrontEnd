import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="max-w-sm mx-auto bg-base-200 shadow-md rounded-lg overflow-hidden">
      {/* User Image */}
      <div className="flex justify-center mt-4">
        <img
          className="h-24 w-24 rounded-full object-cover border-2 border-primary"
          src={user.profilePicture || "https://via.placeholder.com/150"} // Fallback if profilePicture is undefined
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
        <p className="text-gray-500 mt-1">
          Program: {user.program.programName}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Joined on: {new Date(user.userCreatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* User Actions */}
      <div className="flex justify-around py-4 bg-neutral">
        <button className="btn btn-warning rounded-xl">Edit</button>
        <button className="btn btn-error">Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
