"use client";

import React from "react";
import Link from "next/link";

export default function Witcher() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.8]"
      >
        <source src="/videos/witcher3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Centered Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <Link
          href="/buy"
          className="bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transition duration-300"
        >
          Buy Now
        </Link>
      </div>
    </section>
  );
}
