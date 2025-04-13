"use client";

import { SignIn } from "@clerk/nextjs";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg relative w-full max-w-md">
        <button onClick={onClose} className="absolute top-3 right-3 text-black hover:text-red-500">
          <IoMdClose size={24} />
        </button>
        <SignIn path="/sign-in" routing="hash" />
      </div>
    </div>
  );
};

export default LoginModal;
