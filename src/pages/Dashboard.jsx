import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import Card from "../components/Card";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, users, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Counts
  const activeCount = users.filter((u) => u.active).length;
  const inactiveCount = users.filter((u) => !u.active).length;
  const totalCount = users.length;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>AuthVault</h2>
        <div className="user-info">
          <p>{user?.name || user?.username || "Guest"}</p>
        </div>
        <ul>
          <li onClick={() => setActiveTab("overview")}>Overview</li>
          {(user?.role === "admin" || user?.role === "superadmin") && (
            <li onClick={() => setActiveTab("users")}>Users</li>
          )}
          <li onClick={() => setActiveTab("profile")}>My Profile</li>
          <li onClick={() => setActiveTab("password")}>Change Password</li>
          <li onClick={handleLogout}>Sign Out</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        {activeTab === "overview" && (
          <div className="banner">
            <h3>Dashboard Overview</h3>
            <p>Welcome, {user?.name || user?.username || "Guest"} 👋</p>
            <p>Your account dashboard is ready. Manage your users and account settings here.</p>

            {/* ✅ Stats cards */}
            <div className="stats">
              <Card title="Total Users" value={totalCount} color="blue" />
              <Card title="Active Users" value={activeCount} color="green" />
              <Card title="Inactive Users" value={inactiveCount} color="orange" />
            </div>
          </div>
        )}

        {activeTab === "users" && (user?.role === "admin" || user?.role === "superadmin") && (
          <div className="user-directory">
            <h3>User Directory</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Username</th><th>Role</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.username}</td>
                    <td>{u.role}</td>
                    <td>{u.active ? "Active" : "Inactive"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "profile" && <Profile />}
        {activeTab === "password" && <ChangePassword />}
      </main>
    </div>
  );
};

export default Dashboard;