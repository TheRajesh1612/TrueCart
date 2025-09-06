import React from "react";
import Mobiles from "./Mobiles";
import Computers from "./Computers";
import Books from './Books'
import Furniture from './Furniture'
import Ac from "./Ac";
import Fridge from "./Fridge";
import Kitchen from "./Kitchen";
import Men from "./Men";
import Women from "./Women";
import Speaker from "./Speaker";
import TV from "./TV";
import Watch from "./Watch";
import { motion } from "framer-motion";

const Products = () => {
  return (
    <>
      <motion.div
        className="products"
        initial={{ opacity: 0, y: 400 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Mobiles />
        <Computers />
        <Books/>
        <Furniture/>
        <Ac />
        <Fridge />
        <Kitchen />
        <Men />
        <Women />
        <Speaker />
        <TV />
        <Watch />
      </motion.div>
    </>
  );
};

export default Products;
