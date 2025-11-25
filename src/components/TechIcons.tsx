"use client";

import { useState } from "react";
import { motion } from "motion/react"

const techStack = [
  { name: "dotnet", url: "https://dotnet.microsoft.com/" },
  { name: "react", url: "https://react.dev/" },
  { name: "angular", url: "https://angular.io/" },
  { name: "tailwind", url: "https://tailwindcss.com/" },
  { name: "py", url: "https://www.python.org/" },
  { name: "flask", url: "https://flask.palletsprojects.com/" },
  { name: "vue", url: "https://vuejs.org/" },
  { name: "ts", url: "https://www.typescriptlang.org/" },
  { name: "js", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "figma", url: "https://www.figma.com/" },
  { name: "mongodb", url: "https://www.mongodb.com/" },
  { name: "azure", url: "https://azure.microsoft.com/" },
  { name: "docker", url: "https://www.docker.com/" },
  { name: "git", url: "https://git-scm.com/" },
  { name: "github", url: "https://github.com/" },
];

export default function TechIcons() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="flex justify-center flex-wrap gap-2 mt-8">
      {techStack.map((tech, i) => {
        const distance =
          hoverIndex !== null ? Math.abs(i - hoverIndex) : Number.MAX_VALUE;

        // Ripple scaling and fading
        const scale =
          distance === 0
            ? "scale-115"
            : distance === 1
              ? "scale-105"
              : "scale-100";
        const opacity = distance <= 2 ? "opacity-100" : "opacity-95";

        return (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ 
              duration: 0.5,
              delay: i * 0.1, // Stagger delay: each icon waits 0.1s longer
              ease: "easeOut"
            }} 
            key={tech.name}
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`transition-transform duration-400 ${scale} ${opacity}`}
          >
            <img
              src={`https://skillicons.dev/icons?i=${tech.name}`}
              alt={tech.name}
              className="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 md:w-10 md:h-10"
            />
          </motion.a>
        );
      })}
    </div>
  );
}