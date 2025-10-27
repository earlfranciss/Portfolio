"use client";

import GitHubCalendar from "react-github-calendar";

export default function Github() {
  return (
    <section className="relative space-y-6 pt-6 pb-8">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />

      <h2 className="text-2xl font-bold text-center">GitHub</h2>

      <div className="flex justify-center items-center">
        <GitHubCalendar username="earlfranciss" blockSize={10} />
      </div>
    </section>
  );
}
