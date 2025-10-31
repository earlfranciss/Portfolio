"use client";

import { useState, useEffect } from "react";

interface ImageSliderProps {
  images: string[];
  title: string;
  isHovered: boolean; // ✅ New prop
}

export default function ImageSlider({ images, title, isHovered }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // ✅ Reset to first image when not hovered
    if (!isHovered) {
      setCurrent(0);
      setFade(true);
      return;
    }

    // ✅ Only animate when hovered
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 200);
    }, 800);

    return () => clearInterval(interval);
  }, [images.length, isHovered]); // ✅ Added isHovered as dependency

  return (
    <div className="relative w-full max-w-2xl mx-auto h-80 overflow-hidden rounded-lg">
      {/* Bottom fade mask */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10 rounded-b-lg" />

      <img
        src={images[current]}
        alt={`${title} screenshot ${current + 1}`}
        className={`absolute top-1/2 left-1/2 max-h-full max-w-full transform -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}