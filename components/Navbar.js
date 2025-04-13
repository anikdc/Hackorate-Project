"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close mobile menu
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] shadow-lg"
        : "bg-transparent"
        } text-white p-4`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Branding */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide text-pink-500 hover:text-pink-400 transition-colors cursor-pointer"
        >
          GigaPlay 🎮
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center md:space-x-8 absolute md:static top-16 left-0 w-full md:w-auto ${isScrolled ? "bg-[#1a1a2e]" : "bg-transparent"
            } md:bg-transparent z-20 transition-all duration-300 ease-in-out ${menuOpen ? "block px-6 pb-4" : "hidden"
            }`}
        >
          <li>
            <button
              onClick={() => scrollToSection("hero")}
              className="block py-2 px-4 hover:text-cyan-400 transition cursor-pointer text-left w-full"
            >
              Games
            </button>
          </li>
          <li>
            <a
              href="https://discord.com/invite/valorant"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 px-4 hover:text-cyan-400 transition cursor-pointer"
            >
              Community
            </a>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("contact")}
              className="block py-2 px-4 hover:text-cyan-400 transition cursor-pointer text-left w-full"
            >
              Contact Us
            </button>
          </li>
          <li>
            <Link
              href="https://hacktorate25.vercel.app/"
              className="block py-2 px-4 hover:text-green-400 transition cursor-pointer"
            >
              Minecraft
            </Link>
          </li>

          <li className="py-2 px-4">
            <UserButton afterSignOutUrl="/" />
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
