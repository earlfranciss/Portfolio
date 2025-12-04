"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveUpRight, Menu, X } from "lucide-react";
import BurgerMenu from "./BurgerMenu";
import { motion } from "motion/react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md flex justify-between items-center py-4 px-6 shadow-sm">
      {/* Logo / Name */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: "easeOut"
        }}
        className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-gray-890 rounded-full flex items-center justify-center text-white text-xl font-bold font-serif">
          <i>E</i>
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-100">Earl Francis Ong</h1>
          <p className="text-xs font-serif italic text-gray-400">Software Engineer</p>
        </div>
      </motion.div>

      {/* Navbar: visible only on larger screens */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: "easeOut"
        }} className="hidden sm:flex">
        <BurgerMenu />
      </motion.div>

      {/* Social / Resume (desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: "easeOut"
        }}
        className="hidden sm:flex items-center gap-4">
        <Link
          href="https://www.linkedin.com/in/earl-francis-o-3370a3205"
          target="_blank"
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 hover:scale-105 transition-all"
        >
          LinkedIn <MoveUpRight size={14} />
        </Link>
        <Link
          href="/Resume_ONG.pdf"
          target="_blank"
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 hover:scale-105 transition-all"
        >
          Resume <MoveUpRight size={14} />
        </Link>
      </motion.div>

      {/* Hamburger for mobile */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: "easeOut"
        }} className="sm:hidden flex items-center gap-2">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X size={24} className="text-gray-200" />
          ) : (
            <Menu size={24} className="text-gray-200" />
          )}
        </button>
      </motion.div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: "easeOut"
        }}
          className="
            sm:hidden absolute top-full left-0 w-full
            backdrop-blur-md bg-zinc-900
            flex flex-col items-center gap-4 py-4 border-t border-white/10
            transition-all duration-300
            
          "
        >
          <BurgerMenu isMobile />
          <Link
            href="https://www.linkedin.com/in/earl-francis-o-3370a3205"
            target="_blank"
            className="text-gray-100 text-sm flex items-center gap-1 hover:scale-105 transition"
            onClick={() => setMenuOpen(false)}
          >
            LinkedIn <MoveUpRight size={14} />
          </Link>
          <Link
            href="/Resume_ONG.pdf"
            target="_blank"
            className="text-gray-100 text-sm flex items-center gap-1 hover:scale-105 transition"
            onClick={() => setMenuOpen(false)}
          >
            Resume <MoveUpRight size={14} />
          </Link>
        </motion.div>
      )}
    </header>
  );
}
