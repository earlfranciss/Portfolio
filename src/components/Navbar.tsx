"use client";

import Link from "next/link";

export default function Navbar() {
    return (
         <nav className="hidden sm:flex gap-8 text-gray-400/60">
        <Link href="#about" className="text-sm transition-all duration-300 hover:text-gray-200 hover:scale-110">
          About
        </Link>
        <Link href="#projects" className="text-sm transition-all duration-300 hover:text-gray-200 hover:scale-110">
          Projects
        </Link>
        <Link href="#experience" className="text-sm transition-all duration-300 hover:text-gray-200 hover:scale-110">
          Experience
        </Link>
        <Link href="#github" className="text-sm transition-all duration-300 hover:text-gray-200 hover:scale-110">
          GitHub
        </Link>
        <Link href="#contact" className="text-sm transition-all duration-300 hover:text-gray-200 hover:scale-110">
          Contact
        </Link>
      </nav>
    );
}
