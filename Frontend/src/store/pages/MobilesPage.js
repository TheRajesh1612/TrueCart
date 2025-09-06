import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { mobileData } from "../data/mobiles";
import { easeInOut, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ResponsiveFilter from "../components/ResponsiveMenu/ResponsiveFilter";
import FooterSection from "../components/Footer/FooterSection";
import { useCart } from "../components/CartContext/CartContext";

const MotionLink = motion(Link);

const MobilesPage = () => {
  const {  addToCart } = useCart();

  const [filterOpen, setOpenFilter] = useState(false);

  const [selectProduct, setSelectProduct] = useState([]);

  function companyHandler(company) {
    if (selectProduct.includes(company)) {
      setSelectProduct(selectProduct.filter((item) => item !== company));
    } else {
      setSelectProduct([...selectProduct, company]);
    }
  }

  // Filtered mobile data based on selected companies
  const filteredProduct =
    selectProduct.length === 0
      ? mobileData
      : mobileData.filter((item) => selectProduct.includes(item.company));

  return (
    <>
      <NavBar />

      <div className="  flex flex-col min-h-screen bg-gray-200">
        {/* Mobiles Filtering Section */}
        <div className=" flex flex-col lg:flex-row">
          <motion.div
            className=" fixed top-[150px] left-0 w-[200px] h-[calc(100vh-150px)] overflow-y-auto bg-white  hidden lg:block z-10"
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: easeInOut, duration: 0.4 }}
          >
            <h2 className=" text-sm font-sans text-decoration-underline py-3 text-gray-500 p-1 m-0">
              Explore Our Mobile Collection
            </h2>
            {/* Filter Options */}
            <div className="   flex flex-col gap-2 p-4  ">
              {mobileData.map((item) => (
                <div>
                  <label className=" font-sans cursor-pointer">
                    <input
                      className="mr-2"
                      type="checkbox"
                      checked={selectProduct.includes(item.company)}
                      onChange={() => {
                        companyHandler(item.company);
                      }}
                    />
                    {item.company}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          <div className=" fixed bg-blue-400 block lg:hidden rounded-tr rounded-br p-1">
            <MotionLink
              className="no-underline flex gap-1 items-center text-gray-700"
              onClick={() => setOpenFilter(!filterOpen)}
            >
              <p className=" font-sans text-sm m-0">Filter</p>
              <FontAwesomeIcon icon={faBars} size="sm" className="" />
            </MotionLink>

            <ResponsiveFilter
              open={filterOpen}
              selectProduct={selectProduct}
              companyHandler={companyHandler}
            />
          </div>

          <div className=" flex-1 justify-center py-3 bg-gray-100 min-h-screen overflow-y-scroll scrollbar-hide lg:ml-[200px]">
            {/* Mobiles Display Section */}
            <motion.div
              className="  flex flex-wrap justify-center gap-4 max-w-7xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProduct.map((item, index) => (
                <>
                  {/* Product Card */}
                  <motion.div
                    key={item.id}
                    className=" flex flex-col md:flex-row md:w-[600px] overflow-hidden rounded-xl shadow-lg bg-white m-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.1, ease: easeInOut }}
                  >
                    {/* Mobiles Images */}
                    <Link
                      to={`/mobiles/${item.id}`}
                      className=" no-underline text-slate-800"
                    >
                      <div className="  flex items-center justify-center p-2">
                        <img
                          src={item.image}
                          alt={item.model}
                          className=" w-full h-auto object-contain max-h-64"
                        />
                      </div>
                    </Link>

                    {/* Mobiles Content */}
                    <div className=" md:w-1/2 p-4 flex flex-col justify-evenly">
                      <h3 className=" text-lg font-sans">{item.model}</h3>
                      <p className=" font-sans line-clamp-2 text-sm text-gray-600">
                        {item.description}
                      </p>
                      <p className=" text-green-600 font-sans font-bold mb-2">
                        ${item.price}
                      </p>
                      <button
                        className=" bg-orange-500 py-2 font-sans rounded-full text-white text-sm hover:bg-orange-600 transition"
                        onClick={() => {
                          addToCart(item);
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </motion.div>
                </>
              ))}
            </motion.div>
          </div>
        </div>
        <FooterSection />
      </div>
    </>
  );
};

export default MobilesPage;
