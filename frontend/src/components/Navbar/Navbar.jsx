import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, food_list } =
    useContext(StoreContext);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // 🔎 Handle suggestion filtering
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const filtered = food_list.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [query, food_list]);

  // 🔄 Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
        setQuery("");
        setFilteredSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowSearch(false);
    setQuery("");
    setFilteredSuggestions([]);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar_menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a
          href="#get-in-touch"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>

      <div className="navbar_right" ref={searchRef}>
        <img
          src={assets.search_icon}
          alt=""
          onClick={() => setShowSearch(!showSearch)}
          className="search-toggle-icon"
        />

        {showSearch && (
          <div className="search-box">
            <input
              type="text"
              placeholder="Search food..."
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {filteredSuggestions.length > 0 && (
              <ul className="search-suggestions">
                {filteredSuggestions.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => handleSuggestionClick(item._id)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="navbar_search_icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button className="sign_in" onClick={() => setShowLogin(true)}>
            Sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Log Out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
