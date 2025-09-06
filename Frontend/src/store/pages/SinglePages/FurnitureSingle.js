import React from "react";
import { useParams } from "react-router-dom";
import { furnitureData } from "../../data/furniture";
import NavBar from "../../components/NavBar/NavBar";
import FooterSection from "../../components/Footer/FooterSection";
import { useCart } from "../../components/CartContext/CartContext";

const FurnitureSingle = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const products = furnitureData.find((item) => item.id === id);

  if (!products) {
    return (
      <>
        <NavBar />
        <div className="text-center font-sans text-red-600 text-xl p-10">
          Product not found
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen py-5 px-4 md:px-10 bg-gray-50">
        <div className="flex justify-center items-center">
          <div className="flex flex-col md:flex-row rounded-xl shadow-3xl max-w-[900px] bg-white">
            {/* Product image */}
            <div className="rounded-xl p-2 flex-1">
              <img
                src={products.image}
                alt={products.model}
                className="w-full h-auto object-contain max-h-[400px] md:min-w-[400px]"
              />
            </div>

            {/* Product Content */}
            <div className="p-6 flex flex-col gap-4 justify-center flex-1">
              <h3 className="font-sans text-lg md:text-3xl">{products.model}</h3>
              <p className="font-sans text-gray-600">{products.description}</p>
              <p className="text-green-600 font-sans font-bold text-xl">
                ${products.price}
              </p>
              <button
                className="bg-orange-600 rounded py-2 text-white text-md font-sans max-w-[300px] hover:bg-orange-700 transition"
                onClick={() => addToCart(products)}
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

export default FurnitureSingle;
