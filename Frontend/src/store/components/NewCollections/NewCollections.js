import React from "react";
import { easeInOut, motion } from "framer-motion";

const NewCollections = () => {
  return (
    <motion.section
      className="body-container relative top-1 bg-slate-300 mb-2 p-12"
      initial={{ opacity: 0, y: 350 }}
      // animate={{opacity: 1, y: 0}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="collection-content container bg-slate-300 flex flex-col items-center justify-center text-center p-6 md:p-16 lg:p-32 gap-7">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: easeInOut }}
          className="text-4xl md:text-6xl lg:text-7xl"
        >
          New Collections
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1}}
          className="text-base md:text-lg lg:text-xl"
        >
          Explore our latest collections of products, handpicked just for you.
          Discover the best deals and offers on a wide range of items.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default NewCollections;
