import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import Coupon from "./pages/Cupon/Cupon";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChartPage from "./pages/Chart/Chart";

const App = () => {
  const url = "https://tomato-backend-4onk.onrender.com";
  const isAuthenticated =
    localStorage.getItem("isAdminAuthenticated") === "true";
  const location = useLocation();

  return (
    <div>
      <ToastContainer />


      {isAuthenticated && <Navbar />}
      {isAuthenticated && <hr />}

      
      {isAuthenticated ? (
        <div className="app-content">
          <Sidebar />

          <Routes>
            {/*  Public route */}
            <Route path="/login" element={<Login />} />

            {/*  Protected routes */}


            <Route
              path="/add"
              element={
                isAuthenticated ? (
                  <Add url={url} />
                ) : (
                  <Navigate to="/login" state={{ from: location }} />
                )
              }
            />
            <Route
              path="/list"
              element={
                isAuthenticated ? (
                  <List url={url} />
                ) : (
                  <Navigate to="/login" state={{ from: location }} />
                )
              }
            />
            <Route
              path="/orders"
              element={
                isAuthenticated ? (
                  <Orders url={url} />
                ) : (
                  <Navigate to="/login" state={{ from: location }} />
                )
              }
            />
            {/* 🔄 Default route */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/coupon"
              element={
                isAuthenticated ? (
                  <Coupon />
                ) : (
                  <Navigate to="/login" state={{ from: location }} />
                )
              }
            />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<Navigate to="/login" state={{ from: location }} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
