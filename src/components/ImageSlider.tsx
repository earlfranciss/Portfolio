"use client";

import { useState, useEffect } from "react";

interface ImageSliderProps {
  images: string[];
  title: string;
  isHovered: boolean;
}

export default function ImageSlider({
  images,
  title,
  isHovered,
}: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!isHovered) {
      setCurrent(0);
      setFade(true);
      return;
    }

    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 200);
    }, 800);

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-80 overflow-hidden rounded-lg">

      {/* Bottom center fade mask */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, transparent 75%)",
        }}
      />

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