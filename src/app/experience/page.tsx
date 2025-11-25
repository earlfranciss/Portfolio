"use client"

import ExperienceCard from "@/components/ExperienceCard";
import { ExperienceData } from "../../lib/ExperienceData"
import { motion } from "motion/react";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 relative space-y-6 pt-6 pb-8">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }} className=" text-xl sm:text-2xl font-semibold sm:font-bold text-center">Experience</motion.h2>
      <div className="flex flex-col ">
        {ExperienceData.map((exp) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div>
    </section>
  );
}