"use client";
import React from "react";

const logos = [
  "/logos/valorant.jpg",
  "/logos/cod.jpg",
  "/logos/apex.jpg",
  "/logos/pubg.jpg",
  "/logos/minecraft.jpg",
  "/logos/gta.jpg",
  "/logos/lol.jpg",
  "/logos/fortnite.jpg",
];

export default function GameLogoCarousel() {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-16">
      {/* Header */}
      <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold mb-14 tracking-wider uppercase">
        🎮{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
          Top Trending Games
        </span>
      </h2>


      {/* Carousel */}
      <div className="relative">
        <div
          className="flex animate-marquee gap-10 px-6"
          style={{ whiteSpace: "nowrap" }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="min-w-[220px] md:min-w-[280px] cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img
                src={logo}
                alt={`Game Logo ${index}`}
                className="w-full h-[180px] md:h-[240px] object-cover rounded-xl shadow-2xl border-4 border-[#1e1e2f] hover:border-pink-500 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animation styling */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
