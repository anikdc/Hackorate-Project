"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

// Video data array
const videos = [
  {
    src: "/videos/game3.mp4",
    title: "Enter the",
    words: [
      { word: "Arena", className: "text-red-500" },
      { word: "Battlefield", className: "text-yellow-400" },
      { word: "Chaos", className: "bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text" },
    ],
    subtitle: "Battle with the best. Defeat the rest.",
    cta: "Join Now",
    link: "https://youtu.be/COuJxPaFIZ8?si=94CQZ5jtxlv8YgLo",
  },
  {
    src: "/videos/game4.mp4",
    title: "Unlock the",
    words: [
      { word: "Mystery", className: "text-purple-400" },
      { word: "Secret", className: "text-green-400" },
      { word: "Unknown", className: "bg-gradient-to-r from-pink-400 to-indigo-500 text-transparent bg-clip-text" },
    ],
    subtitle: "Explore worlds beyond imagination.",
    cta: "Explore",
    link: "https://youtu.be/NMWkEt_KF6g?si=A1wBpgkpzN4Csx0P",
  },
  {
    src: "/videos/game2.mp4",
    title: "Climb the",
    words: [
      { word: "Leaderboard", className: "text-orange-500" },
      { word: "Tower", className: "text-indigo-400" },
      { word: "Peak", className: "text-emerald-500" },
    ],
    subtitle: "Only the strongest survive.",
    cta: "View Leaderboard",
    link: "https://youtu.be/vgVcUMrKlyw?si=RNiiYnepVORVbQcv",
  },
  {
    src: "/videos/game1.mp4",
    title: "Forge Your",
    words: [
      { word: "Destiny", className: "text-cyan-400" },
      { word: "Legend", className: "text-pink-500" },
      { word: "Path", className: "text-lime-400" },
    ],
    subtitle: "Create, Conquer, and Become a Legend.",
    cta: "Start Quest",
    link: "https://youtu.be/4hIMRUTqARM?si=eAphCBmjQrLOdk6j",
  },
];

export default function VideoCarousel() {
  const [index, setIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Current video and dynamic word data based on the index
  const currentVideo = videos[index];
  const dynamicWord = currentVideo.words[wordIndex];

  // Handlers for changing slides
  const nextSlide = () => setIndex((prev) => (prev + 1) % videos.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + videos.length) % videos.length);

  // Word animation timer based on video index
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % currentVideo.words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div id="top" className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <AnimatePresence mode="wait">
        <motion.video
          key={currentVideo.src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <source src={currentVideo.src} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.h1
          key={currentVideo.title}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg flex gap-2 flex-wrap justify-center"
        >
          {currentVideo.title}
          <AnimatePresence mode="wait">
            <motion.span
              key={dynamicWord.word}
              className={`${dynamicWord.className} glow-text`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {dynamicWord.word}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <p className="text-xl md:text-2xl text-gray-200 mt-4 max-w-xl">
          {currentVideo.subtitle}
        </p>

        <a
          href={currentVideo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white px-6 py-3 rounded-full text-lg shadow-lg transition-all duration-300"
        >
          {currentVideo.cta}
        </a>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <button onClick={prevSlide} className="text-white text-3xl p-2 bg-black/50 rounded-full hover:bg-black/75 transition duration-200">
          <FiArrowLeft />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <button onClick={nextSlide} className="text-white text-3xl p-2 bg-black/50 rounded-full hover:bg-black/75 transition duration-200">
          <FiArrowRight />
        </button>
      </div>

      {/* Glowing text effect */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 1);
          }
        }
        .glow-text {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
