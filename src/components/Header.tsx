"use client";

import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray/80 backdrop-blur-md flex justify-between items-center py-4 px-6 shadow-sm">
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

      {/* Navbar */}
      <Navbar/>

      {/* Social / Resume */}
      <div className="flex items-center gap-4">
        <Link
          href="https://www.linkedin.com/in/earl-francis-o-3370a3205"
          target="_blank"
          className="flex items-center gap-1 text-sm text-gray-600 transition-all duration-300 hover:text-gray-400 hover:scale-105"
        >
          LinkedIn <MoveUpRight size={14} />
        </Link>
        <Link
          href="/Resume_ONG.pdf"
          target="_blank"
          className="flex items-center gap-1 text-sm text-gray-600 transition-all duration-300 hover:text-gray-400 hover:scale-105"
        >
          Resume <MoveUpRight size={14} />
        </Link>
      </div>
    </header>
  );
}
