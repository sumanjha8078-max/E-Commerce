"use client";


import Link from "next/link";
import Image from "next/image";
import {
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});



export default function Navbar() {

    const [search, setSearch] = useState("");
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

  return (
    <nav
      className={`${outfit.className} w-full bg-white dark:bg-gray-900`}
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
                className="hover:text-black hover:dark:text-white duration-200"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="#"
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
                href="#"
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
                      href="#"
                      className="block px-4 py-3 rounded-xl hover:bg-red-100 hover:dark:bg-[#3e1d2b] hover:dark:text-white"
                    >
                      Trending Products
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-3 rounded-xl hover:bg-red-100 hover:dark:bg-[#3e1d2b] hover:dark:text-white"
                    >
                      Best Selling
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[0px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-white dark:border-gray-900 group-hover:border-gray-300 group-hover:dark:border-gray-500 dark:bg-gray-900 bg-white dark:text-white px-4 py-2 pr-10 focus:outline-none"
              />
              <FaSearch className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 group-hover:text-red-500 group-hover:dark:text-red-500" />
            </div>

          {/* Cart */}
          <button className="relative text-[20px] text-gray-500 hover:text-black hover:dark:text-white duration-200">
            <FaShoppingCart />

            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              4
            </span>
          </button>

          {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="text-2xl hover:scale-110 transition-all"
              >
                <Image
                  src={theme === "dark" ? "/dark.png" : "/light.png"}
                  alt="theme"
                  width={52}
                  height={52}
                />
              </button>
            )}
        </div>
      </div>
    </nav>
  );
}