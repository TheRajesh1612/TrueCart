import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "react-toastify";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaBell,
} from "react-icons/fa";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import Home from "../HomePage/HomePage";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const menuItems = [
    { path: "/admin-dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { path: "/admin-dashboard/products", icon: FaBox, label: "Products" },
    { path: "/admin-dashboard/orders", icon: FaShoppingCart, label: "Orders" },
    { path: "/admin-dashboard/customers", icon: FaUsers, label: "Customers" },
    {
      path: "/admin-dashboard/analytics",
      icon: FaChartBar,
      label: "Analytics",
    },
    { path: "/admin-dashboard/settings", icon: FaCog, label: "Settings" },
  ];

  const isActiveRoute = (path) => {
    if (path === "/admin-dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`min-h-screen w-full flex font-inter transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed z-50 lg:static inset-y-0 left-0 w-64 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          isDarkMode
            ? "bg-gradient-to-b from-gray-800 to-gray-900"
            : "bg-gradient-to-b from-white to-gray-50"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div
            className={`flex items-center justify-between h-16 px-6 border-b transition-colors duration-300 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg shadow-lg bg-gradient-to-r from-orange-500 to-orange-600">
                <span className="text-lg font-bold text-white">T</span>
              </div>
              <span
                className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                TrueCart Admin
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`p-2 rounded-md lg:hidden transition-colors ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);

              return (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* User Footer */}
          <div
            className={`p-4 border-t transition-colors duration-300 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center mb-4 space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-gradient-to-r from-orange-500 to-orange-600">
                <FaUser className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user?.name || "Admin User"}
                </p>
                <p
                  className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isDarkMode
                  ? "text-red-400 hover:bg-red-900/20 hover:text-red-300"
                  : "text-red-600 hover:bg-red-50 hover:text-red-700"
              }`}
            >
              <FaSignOutAlt size={16} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header
          className={`${
            isDarkMode ? "bg-gray-800/80" : "bg-white/80"
          } backdrop-blur-lg shadow-lg border-b px-4 sm:px-6 transition-colors duration-300 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-md lg:hidden transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <FaBars size={20} />
              </button>
              <h1
                className={`text-xl font-semibold mb-0 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {menuItems.find((item) => isActiveRoute(item.path))?.label ||
                  "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className={`${
                  isDarkMode
                    ? "text-white bg-gray-700 bg-opacity-20 hover:bg-opacity-60"
                    : "text-gray-900 bg-gray-300 bg-opacity-20 hover:bg-opacity-60"
                } font-semibold px-2 py-2 rounded`}
              >
                Go to Home
              </motion.button>
              <ThemeToggle size="lg" />
              <button
                className={`p-2 rounded-md relative transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <FaBell size={18} />
                <span className="absolute w-2 h-2 bg-orange-500 rounded-full top-1 right-1"></span>
              </button>
              <div className="items-center hidden space-x-3 md:flex">
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Welcome back,
                </span>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user?.name || "Admin"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          className={`flex-1 p-2.5 sm:p-6 overflow-y-auto transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-900 to-gray-800"
              : "bg-gradient-to-br from-gray-50 to-gray-100"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
