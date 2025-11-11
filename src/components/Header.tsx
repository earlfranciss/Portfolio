"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveUpRight, Menu, X } from "lucide-react";
import Navbar from "./Navbar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md flex justify-between items-center py-4 px-6 shadow-sm">
      {/* Logo / Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black font-bold">
          E
        </div>
        <div>
          <h1 className="text-base font-bold">Earl Francis Ong</h1>
          <p className="text-xs font-serif italic">Software Engineer</p>
        </div>
      </div>

      {/* Navbar: hidden on mobile */}
      <div className="hidden sm:flex">
        <Navbar />
      </div>

      {/* Social / Resume */}
      <div className="hidden sm:flex items-center gap-4">
        <Link
          href="https://www.linkedin.com/in/earl-francis-o-3370a3205"
          target="_blank"
          className="flex items-center gap-1 text-sm text-gray-400 transition-all duration-300 hover:text-gray-200 hover:scale-105"
        >
          LinkedIn <MoveUpRight size={14} />
        </Link>
        <Link
          href="/Resume_ONG.pdf"
          target="_blank"
          className="flex items-center gap-1 text-sm text-gray-400 transition-all duration-300 hover:text-gray-200 hover:scale-105"
        >
          Resume <MoveUpRight size={14} />
        </Link>
      </div>

      {/* Hamburger for mobile */}
      <div className="sm:hidden flex items-center gap-2">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} className="text-gray-200" /> : <Menu size={24} className="text-gray-200" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-gray-900/95 flex flex-col items-center gap-4 py-4">
          <Navbar />
          <Link
            href="https://www.linkedin.com/in/earl-francis-o-3370a3205"
            target="_blank"
            className="text-gray-200 text-sm flex items-center gap-1 hover:scale-105 transition"
            onClick={() => setMenuOpen(false)}
          >
            LinkedIn <MoveUpRight size={14} />
          </Link>
          <Link
            href="/Resume_ONG.pdf"
            target="_blank"
            className="text-gray-200 text-sm flex items-center gap-1 hover:scale-105 transition"
            onClick={() => setMenuOpen(false)}
          >
            Resume <MoveUpRight size={14} />
          </Link>
        </div>
      )}
    </header>
  );
}
