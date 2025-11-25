"use client"

import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export type Experience = {
  id: number;
  title: string;
  description: string;
  date: string;
  link: string;
};

export default function ExperienceCard({ title, description, date, link }: Experience) {
  return (
    <div className="flex flex-col  sm:flex-row  rounded-lg p-4 transition">
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }} 
        className="flex-shrink-0 pr-5 pt-1 w-44 text-sm text-gray-500 text-start sm:text-end text-xs sm:text-sm"
      >
        {date}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        className="gap-1"
      >
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-normal font-semibold text-slate-200"
        >
          {title}
          <SquareArrowOutUpRight
            className="w-5 h-5 sm:w-4 sm:h-4 md:w-3 md:h-3"
          />

        </Link>
        <p className="text-gray-400 mt-2 leading-relaxed text-sm">{description}</p>
      </motion.div>
    </div>
  );
}
