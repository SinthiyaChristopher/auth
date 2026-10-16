import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import bgImage from "../assets/login2.jpg"; // import image

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login({ email });
      navigate("/dashboard");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div
      className="login-bg"
      style={{ backgroundImage: `url(${bgImage})` }} // use imported image
    >
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="show-pass">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
          <button type="submit">Login</button>
        </form>
        <p onClick={() => navigate("/forgot")}>Forgot Password?</p>
        <p onClick={() => navigate("/register")}>Register</p>
      </div>
    </div>
  );
};

export default Login;