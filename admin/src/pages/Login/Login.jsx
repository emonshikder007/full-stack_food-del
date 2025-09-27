import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (input.email === adminEmail && input.password === adminPassword) {
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("isAdminAuthenticated");
    if (isAuth === "true") {
      navigate("/add");
    }
  }, []);

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="admin-login-page">
        <form onSubmit={handleLogin} className="admin-login-form">
          <h2>Admin Login</h2>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={onChange}
            className="admin-email"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="admin-password"
            onChange={onChange}
            required
          />
          <button type="submit" className="admin-login-button">
            Login
          </button>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
