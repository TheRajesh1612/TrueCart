import { motion } from "framer-motion";
import React from "react";


const FooterSection = () => {
  return (
    <>
      <motion.footer className="bg-gray-800 text-white py-4 text-center z-50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}>
        <p className="text-sm font-sans">
          &copy; {new Date().getFullYear()} TrueCart. All rights reserved.
        </p>
      </motion.footer>
    </>
  );
};

export default FooterSection;
