import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" className="logo" />
      <button onClick={handleLogout} className="zx bx">Log Out</button>
    </div>
  );
};

export default Navbar;
