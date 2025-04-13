"use client";
import React from "react";
import { FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left items-start">
        
        {/* Brand Info */}
        <div>
          <h3 className="text-3xl font-bold mb-3">🎮 Giga Play</h3>
          <p className="text-gray-300 leading-relaxed">
            Dive into the ultimate gaming experience.<br />
            Explore. Compete. Conquer.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-2xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-gray-300">
            <li>
              <ScrollLink
                to="top"
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer hover:text-pink-500 transition"
              >
                Home
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="hero"
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer hover:text-pink-500 transition"
              >
                Games
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer hover:text-pink-500 transition"
              >
                Contact
              </ScrollLink>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-2xl font-semibold mb-4">Connect</h4>
          <p className="text-gray-300 mb-3">Email: contact@gigaplay.com</p>
          <div className="flex justify-center md:justify-start gap-5 text-2xl">
            <a
              href="https://github.com/imVkohli"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com/imVkohli"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/@viratkohli"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Giga Play. All rights reserved.
      </div>
    </footer>
  );
}
