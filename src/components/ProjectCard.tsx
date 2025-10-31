"use client";

import React, { useState } from 'react';
import { Project } from "../lib/ProjectsData";
import { MoveRight } from 'lucide-react';
import ImageSlider from "./ImageSlider";

interface ProjectCardProps {
  project: Project;
  bgColor?: string;
}

export default function ProjectCard({ project, bgColor = "hover:bg-purple-900/30" }: ProjectCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="p-2">
      <div
        className={`relative backdrop-blur-sm rounded-2xl pt-4 pb-0 p-6 overflow-hidden group border border-gray-800/80 hover:border hover:border-gray-400/60 ${bgColor}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Spotlight effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex gap-2 mt-1">
            <h3 className="text-lg font-semibold pr-6">{project.title}</h3>
            <div className="flex justify-between items-center w-full mt-1">
              {/* Left side: Tech stack */}
              <div className="flex items-center gap-2">
                {project.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded border border-gray-700/50 px-2 py-1"
                  >
                    <p className="text-xs text-gray-400">{tech.name}</p>
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      title={tech.name}
                      className="w-4 h-4"
                    />
                  </div>
                ))}
              </div>
              {/* Right side: Arrow icon */}
              <MoveRight className="text-gray-200 flex-shrink-0" />
            </div>
          </div>

          <p className="text-gray-500 py-2 text-base">{project.description}</p>

          <div className="mt-3">
            {/* ✅ Pass isHovered prop to ImageSlider */}
            <ImageSlider 
              images={project.images} 
              title={project.title}
              isHovered={isHovered}
            />
          </div>
        </div>
      </div>
    </div>
  );
}