import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";   // ✅ import toast

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPass || !newPass || !confirm) {
      toast.error("Please fill all fields");   // ✅ toast instead of alert
      return;
    }
    if (newPass !== confirm) {
      toast.error("New passwords do not match"); // ✅ toast instead of alert
      return;
    }

    toast.success("Password changed successfully!"); // ✅ success toast

    // Redirect after a short delay so user sees the toast
    setTimeout(() => {
      navigate("/profile");
    }, 2000); // 2 seconds
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;