"use client";

import Link from "next/link";
import {
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Outfit } from "next/font/google";
import { useStore } from "../store/useStore";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Global Store
  const { cart, setIsCartOpen, searchQuery, setSearchQuery } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate total items (handling quantities)
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      className={`${outfit.className} sticky top-0 z-50 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
        
        {/* Left */}
        <div className="flex items-center gap-12">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold tracking-[4px] text-red-500"
          >
            GreedyCart
          </Link>

          {/* Menu */}
          <ul className="hidden lg:flex items-center gap-12 text-[17px] font-semibold text-gray-500">
            <li>
              <Link
                href="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-black hover:dark:text-white duration-200"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/#products"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:text-black hover:dark:text-white duration-200"
              >
                Shop
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className="hover:text-black hover:dark:text-white duration-200"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/#news"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:text-black hover:dark:text-white duration-200"
              >
                Blogs
              </Link>
            </li>

            {/* Dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-2 hover:text-black hover:dark:text-white duration-200">
                Quick Links

                <FaChevronDown className="text-sm group-hover:rotate-180 duration-300" />
              </button>

              <div className="absolute top-12 left-0 bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300 p-3 z-50">
                <ul className="space-y-2 text-[17px]">
                  <li>
                    <Link
                      href="https://www.amazon.com/gp/movers-and-shakers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 rounded-xl hover:bg-red-100 hover:dark:bg-[#3e1d2b] hover:dark:text-white"
                    >
                      Trending Products
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="https://www.amazon.com/Best-Sellers/zgbs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 rounded-xl hover:bg-red-100 hover:dark:bg-[#3e1d2b] hover:dark:text-white"
                    >
                      Best Selling
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="https://www.amazon.com/gp/top-rated"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 rounded-xl hover:bg-red-100 hover:dark:bg-[#3e1d2b] hover:dark:text-white"
                    >
                      Top Rated
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="flex items-center gap-8">
          
          {/* Search */}
            <div className="relative hidden sm:block group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[0px] group-hover:w-[300px] focus:w-[300px] transition-all duration-300 rounded-full border border-transparent dark:border-transparent group-hover:border-gray-300 group-hover:dark:border-gray-500 focus:border-[#ff2d3d] focus:dark:border-[#ff2d3d] dark:bg-gray-900 bg-gray-100 dark:text-white px-4 py-2 pr-10 focus:outline-none"
              />
              <FaSearch className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 group-hover:text-red-500 group-hover:dark:text-red-500" />
            </div>

          {/* Cart */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative text-[20px] text-gray-500 hover:text-black hover:dark:text-white duration-200 active:scale-95 transition-transform"
          >
            <FaShoppingCart />

            {mounted && cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="relative flex items-center justify-center w-[42px] h-[42px] rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:scale-110 transition-all duration-300 shadow-sm"
              >
                <FaSun className={`absolute text-[22px] transition-all duration-500 ${theme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100 text-yellow-500'}`} />
                <FaMoon className={`absolute text-[22px] transition-all duration-500 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100 text-blue-400' : 'opacity-0 -rotate-90 scale-50'}`} />
              </button>
            )}
        </div>
      </div>
    </nav>
  );
}