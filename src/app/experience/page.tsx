"use client"

import ExperienceCard from "@/components/ExperienceCard";
import { ExperienceData } from "../../lib/ExperienceData"
import { motion } from "motion/react";
import Separator from "@/components/Separator";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 relative space-y-6 pt-6 pb-8">
      {/* Gradient top border */}
      <Separator />
      
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