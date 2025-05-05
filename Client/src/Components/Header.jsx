import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUserData } from "../utils/auth";
import UserMenu from "./UserMenu";

const Header = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const user = getUserData();

  return (
    <header className="w-full bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Text */}
        <div className="text-2xl font-bold text-gray-800">Openverse</div>
        {loggedIn ? (
          <UserMenu
            user={{ name: "Umer" }}
            onLogout={() => {
              localStorage.clear();
              window.location.href = "/login"; // or use navigate("/login");
            }}
            onViewHistory={() => {
              // Navigate to history page
              console.log("Viewing history...");
            }}
          />
        ) : (
          <div className="space-x-2">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        )}
        {/* Buttons */}
      </div>
    </header>
  );
};

export default Header;
