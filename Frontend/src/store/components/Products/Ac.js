import React, { useState } from "react";
import { acData } from "../../data/ac";
import { AnimatePresence, easeInOut, motion, spring } from "framer-motion";
import { useCart } from "../../components/CartContext/CartContext";
import { useTheme } from "../../context/ThemeContext";

const Ac = () => {
  const { addToCart } = useCart();

  const [showCard, setShowCard] = useState(null);
  const { isDarkMode } = useTheme();
  const selectedItem = acData.find((item) => item.id === showCard);

  return (
    <>
      <div className="w-full h-full ">
        <h3 className="px-4 pt-2 font-serif font-light">Ac's</h3>
        <motion.div
          className="flex items-center gap-4 px-4 py-3 overflow-x-scroll overflow-y-hidden scrollbar-hide"
          // initial={{ scale: 0, opacity: 0 }}
          // whileInView={{ scale: 1, opacity: 1 }}
          // transition={{ duration: 1.2 }}
        >
          {/* Product Card */}
          {acData.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${
                isDarkMode
                  ? "bg-gradient-to-r from-[#006663] to-[#111111] text-white"
                  : " bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]"
              } flex flex-col cursor-pointer min-w-fit rounded-xl shadow-3xl`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, ease: easeInOut }}
              layout
              onClick={() => setShowCard(showCard === item.id ? null : item.id)}
            >
              <motion.div
                whileHover={{ scale: 0.95, transition: { duration: 0.3 } }}
                className="p-1 "
              >
                <motion.img
                  src={item.image}
                  className="rounded w-52"
                  alt={item.model}
                />
              </motion.div>

              <div>
                <p className="px-2 font-sans text-sm text-white ">
                  {item.model}
                </p>
                <p className="px-2 font-mono text-sm text-black ">
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detail Card with Blur Background */}
        <AnimatePresence>
          {showCard && selectedItem && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCard(null)}
            >
              <motion.div
                className="bg-white rounded-3xl shadow-3xl p-6 w-[90%] max-w-xl flex flex-col md:flex-row gap-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                layout
                transition={{ type: spring }}
              >
                <img
                  src={selectedItem.image}
                  alt={selectedItem.model}
                  className="object-contain w-40 h-40"
                />
                <div className="p-2">
                  <h2 className="font-mono text-xl font-bold">
                    {selectedItem.model}
                  </h2>
                  <p className="font-mono text-green-600">
                    ${selectedItem.price}
                  </p>
                  <p className="font-mono text-gray-700">
                    {selectedItem.description}
                  </p>
                  <motion.button
                    className="h-10 px-4 mt-2 font-mono text-white bg-orange-400 rounded-full"
                    whileHover={{ scale: [1, 1.1, 1] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 1,
                      ease: easeInOut,
                    }}
                    onClick={() => {
                      addToCart(selectedItem);
                      setShowCard(null);
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Add to cart
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Ac;
