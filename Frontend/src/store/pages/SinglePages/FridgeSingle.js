import React from "react";
import { useParams } from "react-router-dom";
import { fridgeData } from "../../data/fridge";
import NavBar from "../../components/NavBar/NavBar";
import FooterSection from "../../components/Footer/FooterSection";
import { useCart } from "../../components/CartContext/CartContext";

const FridgeSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = fridgeData.find((item) => item.id === id);

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
      <div className="min-h-screen py-5 px-3">
        <div className="flex justify-center items-center">
          <div className="flex flex-col md:flex-row rounded-xl shadow-3xl max-w-[900px] bg-white w-full">
            {/* Product Image */}
            <div className="rounded-xl p-4 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.model}
                className="w-full h-auto object-contain max-h-[400px] md:min-w-[400px]"
              />
            </div>

            {/* Product Content */}
            <div className="p-6 flex flex-col gap-3 justify-center">
              <h3 className="font-sans text-lg md:text-3xl">{product.model}</h3>
              <p className="font-sans text-gray-600">{product.description}</p>
              <p className="text-green-600 font-sans font-bold">${product.price}</p>
              <button
                className="bg-orange-600 rounded py-2 px-4 text-white text-md font-sans max-w-[300px] hover:bg-orange-700 transition"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default FridgeSingle;
