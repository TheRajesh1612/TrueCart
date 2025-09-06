import { AnimatePresence, easeInOut, motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";

// const MotionLink = motion(Link);
const ResponsiveMenu = ({ open }) => {
  const navItems = ["/", "/shop","/contact"];
  const navLabels = ["HOME", "SHOP","CONTACT"];
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ ease: easeInOut, duration: 0.4}}
            className=" absolute top-20  m-0 w-full left-0 rounded-3xl  py-3 px-5 bg-slate-600"
          >
              <ul className=" flex gap-5  p-0 flex-col items-center justify-center font-bold font-mono">
                {navItems.map((path, index) => (
                  <motion.li key={path}
                  whileHover={{scale: 1.2}}>
                    <NavLink
                    whileHover={{color: 'orange'}}
                      to={path}
                      className={({ isActive }) =>
                        `px-2 hover:text-blue-600 text-decoration-none transition-transform ${
                          isActive ? "text-blue-600" : "text-white"
                        }`
                      }
                    >
                      {navLabels[index]}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResponsiveMenu;
