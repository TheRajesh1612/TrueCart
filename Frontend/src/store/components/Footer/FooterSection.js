import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "../../context/ThemeContext";

const FooterSection = () => {
  const { isDarkMode } = useTheme();
  return (
    <>
      <motion.footer
        className={`${
          isDarkMode
            ? "bg-gradient-to-r from-[#006663] to-[#111111] text-white"
            : " bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]"
        }  text-white py-4 text-center z-50`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <p className="font-sans text-sm">
          &copy; {new Date().getFullYear()} TrueCart. All rights reserved.
        </p>
      </motion.footer>
    </>
  );
};

export default FooterSection;
