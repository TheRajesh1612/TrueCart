import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter as faTwitterBrand,
  faInstagram as faInstagramBrand,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import FooterSection from "../components/Footer/FooterSection";
import { useTheme } from "../context/ThemeContext";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode } = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your message! We'll get back to you soon.", {
        toastId: "contact-success",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: "Email Us",
      details: ["info@truecart.com", "support@truecart.com"],
      color: "text-blue-600",
    },
    {
      icon: faPhone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "text-green-600",
    },
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      details: ["123 Commerce Street", "New York, NY 10001"],
      color: "text-red-600",
    },
    {
      icon: faClock,
      title: "Business Hours",
      details: ["Mon-Fri: 9AM-6PM", "Sat-Sun: 10AM-4PM"],
      color: "text-purple-600",
    },
  ];

  const socialLinks = [
    {
      icon: faFacebookF,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: faTwitterBrand,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: faInstagramBrand,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: faLinkedinIn,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
  ];

  return (
    <>
      <NavBar />

      <div className="font-inter bg-gray-50">
        {/* Hero Section */}
        <motion.section
          className={`${
            isDarkMode
              ? "bg-gradient-to-r from-[#006663] to-[#111111] text-white"
              : " bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]"
          } py-20 px-6 text-center`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.h1
            className="mb-4 text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto mb-6 text-lg md:text-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have questions about our products or services? We'd love to hear
            from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </motion.section>

        <div className="px-6 py-12 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              className="p-8 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-800">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 font-semibold text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="p-4 text-center bg-white rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <FontAwesomeIcon
                      icon={info.icon}
                      className={`text-3xl mb-4 ${info.color}`}
                    />
                    <h3 className="mb-3 text-xl font-semibold text-gray-800">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="mb-1 text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <motion.div
                className="p-6 text-center bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h3 className="mb-4 text-2xl font-bold text-gray-800">
                  Follow Us
                </h3>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className={`text-2xl text-gray-600 ${social.color} transition-colors`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                className="p-6 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <h3 className="mb-4 text-2xl font-bold text-gray-800">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200">
                    <h4 className="mb-2 font-semibold text-gray-800">
                      How can I track my order?
                    </h4>
                    <p className="text-gray-600">
                      You can track your order by logging into your account and
                      visiting the order history section.
                    </p>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <h4 className="mb-2 font-semibold text-gray-800">
                      What is your return policy?
                    </h4>
                    <p className="text-gray-600">
                      We offer a 30-day return policy for most items. Please
                      contact us for specific details.
                    </p>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <h4 className="mb-2 font-semibold text-gray-800">
                      Do you ship internationally?
                    </h4>
                    <p className="text-gray-600">
                      Yes, we ship to most countries worldwide. Shipping costs
                      and delivery times vary by location.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <FooterSection />
      </div>
    </>
  );
};

export default ContactPage;
