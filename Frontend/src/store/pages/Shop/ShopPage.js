import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Products from "../../components/Products/Products";
import { motion} from "framer-motion";

const ShopPage = () => {
  return (
    <>
      <NavBar />
      <motion.section
        className="body-container relative top-1 bg-gray-200 mb-2 p-12"
        initial={{ opacity: 0, y: 350 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="collection-content container bg-gray-200 flex flex-col items-center justify-center text-center p-6 md:p-16 lg:p-32 gap-7">
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
