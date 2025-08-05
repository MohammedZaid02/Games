import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
}

const menuVariants = {
  open: { height: "auto", opacity: 1 },
  closed: { height: 0, opacity: 0 },
};

const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -20 },
};

const navItems: NavItem[] = [
  { name: "Games", path: "/Games" },
  { name: "Services", path: "/Services" },
  { name: "Customers", path: "/Customers" },
  { name: "About Us", path: "/About" },
  { name: "Feedback", path: "/Feedback" },
];

export default function Header():React.ReactNode {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link to="/">Opslify</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          {navItems.map((item: NavItem, index: number) => (
            <motion.div
              key={index}
              className="text-gray-700 hover:text-pink-500 font-medium cursor-pointer relative text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={item.path}>{item.name}</Link>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 origin-left scale-x-0"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring focus:ring-pink-300"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-white shadow"
          >
            <div className="flex flex-col py-4 space-y-2 px-4">
              {navItems.map((item: NavItem, index: number) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="block text-gray-700 hover:text-pink-500 font-medium cursor-pointer py-2"
                >
                  <Link to={item.path} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
