import React, { useState } from "react";
import { tvData } from "../../data/tv";
import { AnimatePresence, easeInOut, motion, spring } from "framer-motion";
import { useCart } from "../../components/CartContext/CartContext";

const TV = () => {
  const { addToCart } = useCart();

  const [showCard, setShowCard] = useState(null);
  const selectedItem = tvData.find((item) => item.id === showCard);

  return (
    <>
      <div className=" w-full h-full">
        <h3 className="px-4 pt-2 font-serif font-light">TV's</h3>
        <motion.div
          className=" flex items-center overflow-x-scroll overflow-y-hidden scrollbar-hide px-4 py-3 gap-4"
          // initial={{ scale: 0, opacity: 0 }}
          // whileInView={{ scale: 1, opacity: 1 }}
          // transition={{ duration: 1.2 }}
        >
          {/* Product Card */}
          {tvData.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex flex-col  min-w-fit cursor-pointer rounded-xl shadow-3xl bg-slate-400 "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, ease: easeInOut }}
              layout
              onClick={() => setShowCard(showCard === item.id ? null : item.id)}
            >
              <motion.div
                whileHover={{ scale: 0.95, transition: { duration: 0.3 } }}
                className=" p-1"
              >
                <motion.img
                  src={item.image}
                  className=" rounded w-52"
                  alt={item.model}
                />
              </motion.div>

              <div>
                <p className=" font-sans px-2 text-white text-sm">
                  {item.model}
                </p>
                <p className=" font-mono px-2 text-sm text-black">
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
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
                  className="w-40 h-40 object-contain"
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
                    className="mt-2 px-4 bg-orange-400 h-10 text-white rounded-full font-mono"
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

export default TV;
