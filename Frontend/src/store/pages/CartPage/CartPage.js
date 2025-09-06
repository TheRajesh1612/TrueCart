import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { motion } from "framer-motion";
import FooterSection from "../../components/Footer/FooterSection";
import { useCart } from "../../components/CartContext/CartContext";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, removeItemCompletely, getTotalItems } = useCart();
  return (
    <>
      <NavBar />

      {/* Cart Heading Section */}
      <motion.section
        className="body-container relative top-1 bg-gray-200 mb-2 p-12"
        initial={{ opacity: 0, y: 350 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="collection-content container bg-gray-200 flex flex-col items-center justify-center text-center p-6 md:p-16 lg:p-32 gap-7">
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

      <div className="container mx-auto p-4 text-center ">
        <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
        <p className="text-gray-600 mb-6 font-sans">
          You have {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in your
          cart.
        </p>
      </div>

      {/* Cart Items */}

      <div className="cart-items p-3">
        {/* Cart Item Box */}
        {cart.length > 0 ? (
          <div className="flex flex-col items-center space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className=" flex flex-col md:flex-row md:w-full overflow-hidden rounded-xl shadow-lg bg-white m-2"
              >
                {/* Cart Item image */}
                <div className="  flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt={item.model}
                    className=" w-full h-auto object-contain max-h-64"
                  />
                </div>

                {/* Cart Item Content */}
                <div className=" md:w-1/2 p-4 flex flex-col justify-evenly">
                  <h3 className=" text-lg font-sans">
                    {item.model || item.title || item.brand}
                  </h3>
                  <p className=" font-sans line-clamp-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                  <p className=" text-green-600 font-sans font-bold mb-2">
                    ${item.price}
                  </p>
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-sans text-gray-600">Quantity:</span>
                      <span className="text-lg font-bold text-blue-600">{item.quantity || 1}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition"
                        onClick={() => {
                          removeFromCart(item);
                        }}
                      >
                        -
                      </button>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition"
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
          <p className="text-gray-600 text-center font-bold">
            Your cart is currently empty.
          </p>
        )}
      </div>
      <FooterSection />
    </>
  );
};

export default CartPage;
