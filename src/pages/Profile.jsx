import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";  // ✅ import context

const Profile = () => {
  const { user } = useContext(AuthContext);  // ✅ get current user

  if (!user) {
    return <p>No user logged in</p>;  // fallback if not logged in
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Status:</strong> {user.active ? "Active" : "Inactive"}</p>
      </div>
    </div>
  );
};

export default Profile;