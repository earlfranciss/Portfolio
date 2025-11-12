"use client";

import Link from "next/link";

export default function BurgerMenu({ isMobile = false }: { isMobile?: boolean }) {
  const baseClasses =
    "flex gap-8 text-gray-400/60 transition-all duration-300";
  const mobileClasses = "flex flex-col items-center gap-4 p-1 text-gray-200";

  return (
    <nav className={`${isMobile ? mobileClasses : baseClasses}`}>
      <Link
        href="#about"
        className="text-sm hover:text-gray-200 hover:scale-110 transition-all"
      >
        About
      </Link>
      <Link
        href="#projects"
        className="text-sm hover:text-gray-200 hover:scale-110 transition-all"
      >
        Projects
      </Link>
      <Link
        href="#experience"
        className="text-sm hover:text-gray-200 hover:scale-110 transition-all"
      >
        Experience
      </Link>
      <Link
        href="#github"
        className="text-sm hover:text-gray-200 hover:scale-110 transition-all"
      >
        GitHub
      </Link>
      <Link
        href="#contact"
        className="text-sm hover:text-gray-200 hover:scale-110 transition-all"
      >
        Contact
      </Link>
    </nav>
  );
}
