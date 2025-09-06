import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ className = '', size = 'md' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? (
          <FaSun size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
        ) : (
          <FaMoon size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
