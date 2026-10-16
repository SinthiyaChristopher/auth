import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email });
    alert("Profile updated successfully!");
    navigate("/profile");
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Update Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;