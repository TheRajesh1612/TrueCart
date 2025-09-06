import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { easeInOut, motion } from "framer-motion";
import ResponsiveMenu from "../ResponsiveMenu/ResponsiveToggle";
import { useCart } from "../CartContext/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { toast } from "react-toastify";

const MotionLink = motion(Link);

const categories = [
  "Mobiles",
  "AC",
  "Books",
  "Computers",
  "Fridge",
  "Furniture",
  "Kitchen",
  "Men's wear",
  "Speakers",
  "TV",
  "Watch",
  "Women wear",
];

const navItems = ["/", "/shop", "/contact"];
const navLabels = ["HOME", "SHOP", "CONTACT"];

const NavBar = () => {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const { user, logout, isAuthenticated } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCategoryClick = (categoryPath) => {
    if (!isAuthenticated) {
      toast.warning("Please login to access category pages!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/authentication");
      return;
    }
    navigate(categoryPath);
  };

  return (
    <motion.div
      className={`${
        isDarkMode
          ? "bg-gradient-to-r from-[#006663] to-[#111111] text-white"
          : " bg-white/80 text-gray-900"
      } shadow-lg w-full sticky top-0 z-50 backdrop-blur-lg transition-colors duration-300`}
      initial={{ y: "-20vw", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easeInOut }}
    >
      <nav className="container flex flex-wrap items-center justify-between p-4 mx-auto md:p-5">
        {/* Brand */}
        <motion.div
          initial={{ y: "-10vw", opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ ease: easeInOut, duration: 0.7 }}
        >
          <MotionLink
            to="/"
            className={`text-3xl font-bold no-underline ${
              isDarkMode ? "text-white" : "text-gray-800"
            } transition-colors duration-300`}
            drag
          >
            TrueCart
          </MotionLink>
        </motion.div>

        {/* Main Nav Links */}
        <ul className="flex items-center justify-center gap-4 p-0 mt-4 text-sm font-bold md:ml-auto md:mr-auto md:mt-0 md:text-base">
          {navItems.map((path, index) => (
            <motion.li
              key={path}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                ease: easeInOut,
                duration: 0.5,
                delay: 0.3 + index * 0.1,
              }}
              className="hidden lg:block"
            >
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `px-2 hover:text-orange-600 no-underline transition-transform ${
                    isActive
                      ? "text-orange-600"
                      : isDarkMode
                      ? "text-gray-200"
                      : "text-gray-800"
                  }`
                }
              >
                {navLabels[index]}
              </NavLink>
            </motion.li>
          ))}

          {/* Toggle for small devices */}
          <MotionLink
            className="text-gray-700 no-underline"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              className="block lg:hidden"
            />
          </MotionLink>
          <ResponsiveMenu open={open} />
        </ul>

        {/* Right Side */}
        <div className="flex items-center mt-1 space-x-4 font-bold md:mt-0">
          {/* Theme Toggle */}
          <ThemeToggle size="sm" />

          {user ? (
            <>
              {/* 👤 Show Email */}
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                } hidden sm:inline transition-colors duration-300`}
              >
                Hi, {user.email}
              </span>

              {/* 🛠 Admin Dashboard Link */}
              {isAdmin && (
                <motion.button
                  className={`${
                    isDarkMode
                      ? "text-white bg-white/10 hover:bg-white/50 hover:!text-black"
                      : "text-purple-900 bg-gray-300/30 hover:bg-gray-300/50 hover:text-purple-950"
                  } font-semibold px-2 py-2 rounded transition-colors duration-300`}
                  onClick={() => navigate("/admin-dashboard")}
                >
                  Admin Panel
                </motion.button>
              )}

              {/* 🔓 Logout */}
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* 🔐 Login */}
              <MotionLink
                to="/authentication"
                className={`text-sm ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                } no-underline hover:text-orange-500 hidden lg:block transition-colors duration-300`}
              >
                Sign/Login
              </MotionLink>
            </>
          )}

          {/* User Icon */}
          <MotionLink
            to="/user"
            className="block text-xl lg:hidden sm:text-base md:text-xl"
          >
            <FontAwesomeIcon
              icon={faUser}
              className={`${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              } transition-colors duration-300`}
            />
          </MotionLink>

          {/* Cart */}
          <MotionLink
            to="/cart"
            className={`text-sm ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            } hover:text-orange-500 no-underline hidden lg:block transition-colors duration-300`}
          >
            CART{" "}
            <span className="font-bold text-orange-600">
              {cart.length > 0 ? `(${cart.length})` : "(0)"}
            </span>
          </MotionLink>
          <MotionLink to="/cart" className="block lg:hidden">
            <FontAwesomeIcon
              icon={faCartShopping}
              className={`${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              } text-xl transition-colors duration-300`}
            />
          </MotionLink>

          {/* Search */}
          <MotionLink
            to="/search"
            aria-label="Search"
            initial={{ y: "-20vw" }}
            animate={{ y: 0 }}
            whileHover={{ scale: 1.2, rotate: 20 }}
            transition={{ type: "spring", stiffness: 300, duration: 0.5 }}
            className={`${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            } hover:text-blue-600 transition-colors duration-300`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </MotionLink>
        </div>
      </nav>

      {/* Categories */}
      <div className="overflow-x-auto bg-slate-900">
        <ul className="flex items-center justify-around gap-4 px-4 py-2 text-sm font-medium whitespace-nowrap">
          {categories.map((cat, index) => (
            <li key={index}>
              <button
                onClick={() =>
                  handleCategoryClick(
                    `/${cat.toLowerCase().trim().replace(/\s+/g, "-")}`
                  )
                }
                className={`font-bold no-underline cursor-pointer hover:text-yellow-400 transition-colors ${
                  window.location.pathname ===
                  `/${cat.toLowerCase().trim().replace(/\s+/g, "-")}`
                    ? "text-yellow-500"
                    : "text-gray-200"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default NavBar;
