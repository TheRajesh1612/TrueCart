import { AnimatePresence, easeInOut, motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

// const MotionLink = motion(Link);
const ResponsiveMenu = ({ open }) => {
  const { isDarkMode } = useTheme();
  const navItems = ["/", "/shop", "/contact"];
  const navLabels = ["HOME", "SHOP", "CONTACT"];
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ ease: easeInOut, duration: 0.4 }}
            className={`${
              isDarkMode
                ? "bg-gradient-to-r from-[#044a4a] to-[#151515] "
                : " bg-gradient-to-r from-[#e07e65] to-[#d08e5c]"
            } absolute top-20  m-0 w-full left-0 rounded-3xl  py-3 px-5`}
          >
            <ul className="flex flex-col items-center justify-center gap-5 p-0 font-mono font-bold ">
              {navItems.map((path, index) => (
                <motion.li key={path} whileHover={{ scale: 1.2 }}>
                  <NavLink
                    whileHover={{ color: "orange" }}
                    to={path}
                    className={({ isActive }) =>
                      `px-2 hover:text-blue-600 text-decoration-none transition-transform ${
                        isActive ? "text-yellow-400" : "text-white"
                      }`
                    }
                  >
                    {navLabels[index]}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResponsiveMenu;
