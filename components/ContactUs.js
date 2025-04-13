"use client";
import React, { useState } from "react";

export default function ContactUs() {
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default page reload
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://formsubmit.co/bhupendragaur@email.com", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setIsSent(true);
        e.target.reset(); // clear form
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Failed to send message. Try again.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="w-full bg-[#0f0c29] py-16 px-6">
      <div className="max-w-4xl mx-auto text-white">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-xl mx-auto">
          Got questions, feedback, or want to collaborate? Drop us a message &mdash; we&rsquo;d love to hear from you.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-6 py-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-6 py-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            required
            className="w-full px-6 py-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-full transition shadow-lg"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Success Message */}
        {isSent && (
          <p className="mt-6 text-green-400 text-center text-lg font-medium">
            ✅ Message sent successfully! We'll get back to you soon.
          </p>
        )}
      </div>
    </section>
  );
}
