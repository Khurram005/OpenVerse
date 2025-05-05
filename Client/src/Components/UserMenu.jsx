import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ user, onLogout, onViewHistory }) => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId;

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <div className="cursor-pointer text-sm font-medium text-gray-800 hover:text-blue-600 transition">
        Welcome, {user.name}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-50 animate-fade-in transition-all duration-200">
          <button
            onClick={onViewHistory}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
          >
            View History
          </button>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
