import React, { useState, useContext } from "react";
import { validateForm } from "../utils/validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ import context
import "./Register.css";
import bgImage from "../assets/register.jpg"; // background image

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",   // ✅ add username
    email: "",
    password: "",
    confirm: ""
  });

  const navigate = useNavigate();
  const { signup } = useContext(AuthContext); // ✅ get signup from context

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(form);

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((err) => toast.error(err));
      return;
    }

    // ✅ Save user details into AuthContext
    signup({
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password,
      role: "user"
    });

    toast.success("Registered successfully!");
    setTimeout(() => navigate("/login"), 2000); // delay so toast is visible
  };

  return (
    <div
      className="register-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter your username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          />
          <button type="submit">Register</button>
        </form>
        <p onClick={() => navigate("/login")}>Login</p>
      </div>
    </div>
  );
};

export default Register;