"use client";
import Link from "next/link";
import GitHubCalendar from "react-github-calendar";

export default function Github() {
  return (
    <section id="github" className="relative space-y-6 pt-6 pb-8">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />
      <Link
        href="https://github.com/earlfranciss"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-2xl font-bold text-center"
      >
        GitHub
      </Link>
      
      <div className="flex justify-center items-center">
        <GitHubCalendar username="earlfranciss" blockSize={10} />
      </div>
    </section>
  );
}
