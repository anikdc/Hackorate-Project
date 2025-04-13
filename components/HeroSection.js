"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserRazorpayKey, initiate } from "@/actions/useractions";

// ⬇️ Reusable rotating word hook inside the same file
const useRotatingWords = (words, delay = 2000) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, delay);

    return () => clearInterval(interval);
  }, [words, delay]);

  return words[index];
};

const HeroSection = () => {
  const games = [
    {
      title: "Rise of the Shadow",
      rotating: ["Realm", "Empire", "Legacy", "Odyssey"],
      description:
        "Enter the dark fantasy universe where fate is forged in battle. Gear up for an epic story-driven RPG filled with fierce enemies, ancient magic, and stunning visuals.",
      image: "/images/game-card.jpg",
      price: 500, // Example price for the game
    },
    {
      title: "GTA 6: Vice City",
      rotating: ["Reborn", "Chaos", "Thrill", "Rush"],
      description:
        "Explore the neon-lit chaos of Vice City. Experience the next-gen open world with fast cars, big heists, and crazy freedom like never before.",
      image: "/images/gta6.jpg",
      price: 1000, // Example price for the game
    },
    {
      title: "Ghost of Tsushima",
      rotating: ["Samurai", "Honor", "Blade"],
      description:
        "Become the last samurai. Protect your homeland from the Mongol invasion in this cinematic open-world experience.",
      image: "/images/ghost.jpg",
      price: 1500, // Example price for the game
    },
    {
      title: "Red Dead Redemption",
      rotating: ["Revenge", "Frontier", "West"],
      description:
        "Step into the Wild West with Arthur Morgan and the Van der Linde gang. Ride, rob, and survive in America’s unforgiving heartland.",
      image: "/images/red-dead.jpg",
      price: 2000, // Example price for the game
    },
  ];

  // Call useRotatingWords for each game before the map loop
  const gameWithWords = games.map((game) => ({
    ...game,
    word: useRotatingWords(game.rotating, 2000),
  }));

  const pay = async (gameTitle, amount) => {
    const username = "exampleUser"; // Example username, you can fetch dynamically
    const paymentform = {
      name: "User Name", // You can replace this with actual user info
      message: `Purchasing ${gameTitle}`,
      amount: amount,
    };

    if (typeof window !== "undefined" && window.Razorpay) {
      const userKeyId = await getUserRazorpayKey(username); // Get the user's Razorpay keyId
      console.log("User's Razorpay keyId:", userKeyId);

      if (!userKeyId) {
        console.error("User's Razorpay key not found.");
        toast.error("Payment failed: You cannot make payment to this user because they are not in our database.");
        return;
      }

      let response = await initiate(amount, username, paymentform);
      let order_id = response.order_id;

      const options = {
        key: userKeyId, // ✅ Use the user's key instead of process.env
        amount: amount * 100, // Convert to paise (1 INR = 100 paise)
        currency: "INR",
        name: username, // Show the user's name on Razorpay checkout
        description: `Payment for ${gameTitle}`,
        image: "/logo.png",
        order_id: order_id,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay`,
        prefill: {
          name: paymentform.name,
          email: "test@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "User's Payment for the game",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error("Razorpay script not loaded yet.");
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden bg-black py-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg-game.jpg" alt="Background Game" layout="fill" objectFit="cover" quality={100} className="brightness-[0.3]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {gameWithWords.map((game, index) => {
          return (
            <motion.div
              key={index}
              className="bg-gray-900/70 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Image src={game.image} alt={game.title} width={300} height={400} className="rounded-xl object-cover" />
              <div className="text-white text-center md:text-left space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {game.title}{" "}
                  <motion.span
                    key={game.word}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent"
                  >
                    {game.word}
                  </motion.span>
                </h2>
                <p className="text-md md:text-lg text-gray-300 max-w-md">{game.description}</p>
                <button
                  onClick={() => pay(game.title, game.price)}
                  className="w-[80%] h-12 cursor-pointer text-white text-lg font-semibold px-6 py-3 rounded-xl transition-all duration-300 bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-900 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:from-indigo-900 hover:via-purple-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
