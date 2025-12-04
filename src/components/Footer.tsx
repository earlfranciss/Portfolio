"use client"

import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="relative flex flex-col items-center pt-6 p-4 text-sm text-gray-400 justify-between mt-9">
      {/* Gradient bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 2,
          ease: "easeOut"
        }}
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gray-500/70 via-transparent to-gray-500/70"
      />

      <div className="w-full text-xs sm:text-sm flex justify-between max-w-5xl">
        <div className="italic">Sic Parvis Magna</div>
        <div>Earl Francis - © {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
