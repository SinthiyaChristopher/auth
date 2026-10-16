import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);        // all registered users
  const [currentUser, setCurrentUser] = useState(null); // logged-in user

  // Register new user
  const signup = (newUser) => {
    const userWithStatus = { ...newUser, active: false }; // default inactive
    setUsers((prev) => [...prev, userWithStatus]);
    setCurrentUser({ ...userWithStatus, active: true });  // logged in immediately
  };

  // Login existing user
  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      const updatedUser = { ...user, active: true };
      setUsers((prev) =>
        prev.map((u) => u.email === email ? updatedUser : u)
      );
      setCurrentUser(updatedUser);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    if (currentUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.email === currentUser.email ? { ...u, active: false } : u
        )
      );
    }
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user: currentUser, users, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};