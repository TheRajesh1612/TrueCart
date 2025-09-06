import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { mobileData } from "../../data/mobiles";
import { easeInOut } from "framer-motion";

const ResponsiveFilter = ({ open, selectProduct, companyHandler }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed  left-0 bg-white z-50 h-screen w-[200px] overflow-y-auto rounded"
          initial={{ opacity: 0, x: -250 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -250 }}
          transition={{ ease: easeInOut, duration: 0.4 }}
        >
          <div className=" p-4">
            {[...new Set(mobileData.map((item) => item.company))].map(
              (company) => (
                <label
                  key={company}
                  className="block font-sans text-sm py-2 text-black cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectProduct.includes(company)}
                    onChange={() => companyHandler(company)}
                    className="mr-2"
                  />
                  {company}
                </label>
              )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveFilter;
