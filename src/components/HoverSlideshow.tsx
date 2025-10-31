"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HoverSlideshowProps {
  images: string[];
  label: React.ReactNode;
}

export default function HoverSlideshow({ images, label }: HoverSlideshowProps) {
  const [hovered, setHovered] = useState(false);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!hovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 150);
    }, 800);

    return () => clearInterval(interval);
  }, [hovered, images.length]);

  return (
    <span
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* The word itself */}
      <i className="text-slate-200 font-semibold">{label}</i>

      {/* Slideshow above the word */}
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-400/90 border border-white p-1 rounded-lg shadow-xl z-50">
          <div className="relative w-[180px] h-[150px] overflow-hidden rounded-md">
            <Image
              src={images[current]}
              alt="slideshow"
              fill
              className={`object-cover transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      )}
    </span>
  );
}
