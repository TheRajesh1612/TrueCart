import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Products from "../../components/Products/Products";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const ShopPage = () => {
  const { isDarkMode } = useTheme();
  return (
    <>
      <NavBar />
      <motion.section
        className={`${
          isDarkMode
            ? "bg-gradient-to-r from-[#006663] to-[#111111] text-white"
            : " bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]"
        } relative mb-2 body-container top-51`}
        initial={{ opacity: 0, y: 350 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center justify-center w-full px-0 py-6 text-center md:py-16 lg:py-32 gap-7">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            className="text-4xl md:text-6xl lg:text-7xl"
          >
            Shop Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base md:text-lg lg:text-xl"
          >
            Discover a wide range of products at TrueCart. Shop now and enjoy
            exclusive deals and offers.
          </motion.p>
        </div>
      </motion.section>
      {/* Products Section */}

      <Products />
    </>
  );
};

export default ShopPage;
