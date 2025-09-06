import React from "react";
import { useParams } from "react-router-dom";
import { womanData } from "../../data/woman";
import NavBar from "../../components/NavBar/NavBar";
import FooterSection from "../../components/Footer/FooterSection";
import { useCart } from "../../components/CartContext/CartContext";

const WomenSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = womanData.find((item) => item.id === id);

  if (!product) {
    return (
      <>
        <NavBar />
        <div className="text-center font-sans text-red-600 text-xl p-10">
          Product not found
        </div>
        <FooterSection />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen py-5 px-3 sm:px-6 lg:px-10">
        <div className="flex justify-center items-center">
          <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg max-w-5xl w-full overflow-hidden">
            {/* Product Image */}
            <div className="p-4 md:w-1/2">
              <img
                src={product.image}
                alt={product.model}
                className="w-full h-auto object-contain max-h-[400px] rounded-xl"
              />
            </div>

            {/* Product Info */}
            <div className="p-6 flex flex-col justify-center gap-4 md:w-1/2">
              <h3 className="text-2xl font-bold font-sans">{product.model}</h3>
              <p className="text-gray-600 font-sans">{product.description}</p>
              <p className="text-green-600 font-bold text-xl font-sans">
                ${product.price}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition-all duration-300 w-full max-w-xs"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default WomenSingle;
