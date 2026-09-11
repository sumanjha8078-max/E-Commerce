"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl text-center space-y-8">
        {mounted && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ 
                rotate: isDark ? 360 : 0,
                scale: isDark ? 1.1 : 1,
              }}
              whileHover={{ scale: 1.2, rotate: isDark ? 340 : 20 }}
              transition={{ duration: 0.5 }}
              className={`p-6 rounded-3xl shadow-xl flex items-center justify-center ${
                isDark 
                  ? "bg-gradient-to-br from-gray-800 to-black text-red-500 shadow-red-900/20" 
                  : "bg-white text-red-500 shadow-red-100"
              }`}
            >
              <FaShoppingCart className="text-7xl mb-2" />
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-[2px] text-gray-900 dark:text-white mb-4">
            Greedy<span className="text-red-500">Cart</span>
          </h1>
          <div className="h-1 w-24 bg-red-500 mx-auto rounded-full mb-8" />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium italic"
        >
          "To provide great user experience and UI to support the customers in choosing anything they like."
        </motion.p>
      </div>
    </div>
  );
}
