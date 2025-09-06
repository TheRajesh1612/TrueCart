import React from "react";
import { useParams } from "react-router-dom";
import { booksData } from "../../data/books";
import NavBar from "../../components/NavBar/NavBar";
import FooterSection from "../../components/Footer/FooterSection";
import { useCart } from "../../components/CartContext/CartContext";

const BookSingle = () => {
  const { addToCart, cart } = useCart();
  const { id } = useParams();
  const products = booksData.find((item) => item.id === (id));

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
      <div className=" h-screen py-5">
        <div className=" sm:p-5 flex justify-center items-center container">
          <div className="flex flex-col md:flex-row rounded-xl shadow-3xl max-w-[900px]  bg-white">
            {/* Product image */}
            <div className=" rounded-xl p-1">
              <img
                src={products.image}
                alt={products.title}
                className="w-full h-auto object-contain max-h-[400px] md:min-w-[400px]"
              />
            </div>

            {/* Product Content */}
            <div className="p-6 flex flex-col gap-3 justify-center">
              <h3 className="font-sans text-lg md:text-3xl">
                {products.title}
              </h3>
              <p className="font-sans text-gray-600">{products.description}</p>
              <p className="text-green-600 font-sans font-bold mb-0">
                ${products.price}
              </p>
              <button 
                className="bg-orange-600 rounded py-2 text-white text-md font-sans max-w-[400px] hover:bg-orange-700 transition"
                onClick={() => {
                  addToCart(products);
                }}
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

export default BookSingle;
