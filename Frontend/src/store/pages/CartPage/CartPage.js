import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { motion } from "framer-motion";
import FooterSection from "../../components/Footer/FooterSection";
import { useCart } from "../../components/CartContext/CartContext";
import { useTheme } from "../../context/ThemeContext";

const CartPage = () => {
  const { isDarkMode } = useTheme();
  const {
    cart,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    getTotalItems,
  } = useCart();
  return (
    <>
      <NavBar />

      {/* Cart Heading Section */}
      <motion.section
        className={`${
          isDarkMode
            ? "bg-gradient-to-r from-[#006663] to-[#111111] text-white"
            : " bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]"
        } body-container relative top-1 mb-2 p-12`}
        initial={{ opacity: 0, y: 350 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container flex flex-col items-center justify-center p-6 text-center collection-content md:p-16 lg:p-32 gap-7">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Your Cart
          </motion.h1>
          <motion.p
            className="text-base md:text-lg lg:text-xl"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Review your selected items below. Proceed to checkout when ready.
          </motion.p>
        </div>
      </motion.section>

      {/* Cart Items Section */}

      <div className="container p-4 mx-auto text-center ">
        <h2 className="mb-4 text-2xl font-bold">Cart Items</h2>
        <p className="mb-6 font-sans text-gray-600">
          You have {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in
          your cart.
        </p>
      </div>

      {/* Cart Items */}

      <div className="p-3 cart-items">
        {/* Cart Item Box */}
        {cart.length > 0 ? (
          <div className="flex flex-col items-center space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col m-2 overflow-hidden bg-white shadow-lg md:flex-row md:w-full rounded-xl"
              >
                {/* Cart Item image */}
                <div className="flex items-center justify-center p-2 ">
                  <img
                    src={item.image}
                    alt={item.model}
                    className="object-contain w-full h-auto max-h-64"
                  />
                </div>

                {/* Cart Item Content */}
                <div className="flex flex-col p-4 md:w-1/2 justify-evenly">
                  <h3 className="font-sans text-lg ">
                    {item.model || item.title || item.brand}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="mb-2 font-sans font-bold text-green-600 ">
                    ${item.price}
                  </p>
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-sans text-sm text-gray-600">
                        Quantity:
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {item.quantity || 1}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-3 py-1 text-sm text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
                        onClick={() => {
                          removeFromCart(item);
                        }}
                      >
                        -
                      </button>
                      <button
                        className="px-3 py-1 text-sm text-white transition bg-green-500 rounded-lg hover:bg-green-600"
                        onClick={() => {
                          addToCart(item);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className=" bg-red-500 py-2 font-sans rounded-xl text-white text-sm hover:bg-red-600 transition w-[100px]"
                    onClick={() => {
                      removeItemCompletely(item);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-bold text-center text-gray-600">
            Your cart is currently empty.
          </p>
        )}
      </div>
      <FooterSection />
    </>
  );
};

export default CartPage;
