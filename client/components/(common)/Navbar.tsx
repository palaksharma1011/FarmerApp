"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaShoppingCart, FaUser, FaInfoCircle } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
                    bg-black/70 backdrop-blur-md text-white rounded-full px-8 py-3 
                    shadow-lg w-auto">
      <div className="flex items-center gap-16"> 
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-green-400">
          FarmBazaar
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="hover:text-green-400 transition hover:scale-110"
          >
            <FaHome className="text-xl" />
          </Link>
          {/* <Link
            href="/marketplace"
            className="hover:text-green-400 transition hover:scale-110"
          >
            <FaShoppingCart className="text-xl" />
          </Link>
          <Link
            href="/govt"
            className="hover:text-green-400 transition hover:scale-110"
          >
            <FaUser className="text-xl" />
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {open && (
        <div className="absolute top-16 left-0 w-full flex flex-col items-center gap-6 py-6 
                        bg-black/90 backdrop-blur-md rounded-lg md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="text-lg hover:text-green-400">
            Home
          </Link>
          <Link href="/marketplace" onClick={() => setOpen(false)} className="text-lg hover:text-green-400">
            Marketplace
          </Link>
          <Link href="/profile" onClick={() => setOpen(false)} className="text-lg hover:text-green-400">
            Profile
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className="text-lg hover:text-green-400">
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
