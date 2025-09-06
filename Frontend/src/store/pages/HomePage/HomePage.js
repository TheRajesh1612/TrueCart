import { motion } from "framer-motion";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "../../components/Footer/FooterSection";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faShirt, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";



const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
 
  const socialLinks = [
    { icon: faFacebookF, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: faTwitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: faInstagram, href: "#", label: "Instagram", color: "hover:text-pink-600" },
    { icon: faLinkedinIn, href: "#", label: "LinkedIn", color: "hover:text-blue-700" }
  ];
 
  const handleCategoryClick = (categoryPath) => {
    if (!isAuthenticated) {
      toast.warning("Please login to access category pages!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/authentication");
      return;
    }
    navigate(categoryPath);
  };
  
  return (
    <div className="font-inter">
      {/* Hero Section */}
      <motion.section
        className={`${isDarkMode? 'bg-gradient-to-r from-[#006663] to-[#111111] text-white':' bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]'} py-24 px-6 text-center`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover the Extraordinary
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
        >
          Explore a curated collection of gadgets, clothing, and kitchen
          essentials designed to elevate your everyday life.
        </motion.p>
        <motion.button
          className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold "
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          Start Your Journey
        </motion.button>
      </motion.section>

      {/* Categories */}
      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Featured Categories
        </h2>
        <p className="text-center text-gray-600 mb-10 font-inter">
          Explore our diverse range of products, from cutting-edge gadgets to
          stylish apparel and essential kitchenware.
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
                      <motion.div
              className="border p-6 rounded-lg text-center shadow hover:shadow-md transition cursor-pointer"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95}}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => handleCategoryClick("/mobiles")}
            >
              <div className="no-underline text-gray-900">
                <FontAwesomeIcon icon={faMobile} className="text-3xl mb-2" />
                <h3 className="text-xl font-medium">Gadgets</h3>
                <p className="text-gray-600 font-bold">
                  Stay ahead with the latest tech innovations.
                </p>
              </div>
            </motion.div>
              <motion.div
              className="border p-6 rounded-lg text-center shadow hover:shadow-md transition cursor-pointer"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => handleCategoryClick("/men")}
            >
              <div className="no-underline text-gray-900">
                <FontAwesomeIcon icon={faShirt} className="text-3xl mb-2" />
                <h3 className="text-xl font-medium">Clothing</h3>
                <p className="text-gray-600 font-bold">
                  Express your style with our curated clothing collection.
                </p>
              </div>
            </motion.div>
              <motion.div
              className="border p-6 rounded-lg text-center shadow hover:shadow-md transition cursor-pointer "
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => handleCategoryClick("/kitchen")}
            >
              <div className="no-underline text-gray-900">
                <FontAwesomeIcon icon={faUtensils} className="text-3xl mb-2" />
                <h3 className="text-xl font-medium">Kitchen</h3>
                <p className="text-gray-600 font-bold">
                  Elevate your experience with our kitchen essentials.
                </p>
              </div>
            </motion.div>
        </motion.div>
      </motion.section>

      {/* Newsletter */}
      <motion.section className="bg-gray-100 py-16 px-6 text-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }} >
        <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6 font-sans">
          Signup for our newsletter to receive exclusive offers and the latest
          product updates.
        </p>
        <form className="flex justify-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
          >
            Subscribe
          </button>
        </form>
      </motion.section>

      {/* Footer */}
      <div className="bg-white py-8 text-center text-sm text-gray-500 border-t">
        <motion.div className="flex flex-col md:flex-row justify-center gap-6 mb-4"
        initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}>
          <Link to="/" className=" font-sans no-underline text-gray-600">
            Privacy Policy
          </Link>
          <Link to="/" className=" font-sans no-underline text-gray-600">
            Terms of Service
          </Link>
          <Link to="/" className=" font-sans no-underline text-gray-600">
            Contact Us
          </Link>
        </motion.div>
        <motion.div
          className="flex justify-center gap-4 mb-4 text-gray-600"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {socialLinks.map((social, index) => (
          <button
          key={index}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label={social.label}
          className={`text-2xl ${social.color} bg-transparent border-none cursor-pointer`}
        >
          <FontAwesomeIcon icon={social.icon} />
        </button>        

          ))}
        </motion.div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Home;
