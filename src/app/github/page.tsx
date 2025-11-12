"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import GitHubCalendar from "react-github-calendar";

interface Repo {
  name: string;
  description: string;
  url: string;
  languages: string[];
  stars: number;
  forks: number;
}

export default function Github() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.kremilly.com/github?user=earlfranciss");
        const data = await res.json();
        setRepos(data || []);
      } catch (error) {
        console.error("Error fetching pinned repos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section id="github" className="scroll-mt-24 relative space-y-8 pt-6 pb-12">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />

      {/* GitHub Title */}
      <Link
        href="https://github.com/earlfranciss"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-2xl font-bold text-center hover:text-gray-400 transition"
      >
        GitHub
      </Link>

      {/* Pinned Repositories */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Pinned Repositories</h3>

        {loading ? (
          <p className="text-center text-gray-400">Loading repositories...</p>
        ) : repos.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            No pinned repositories found.
          </p>
        ) : (
         <div className="flex flex-wrap -mx-2">
  {repos.map((repo) => (
    <div key={repo.name} className="w-full md:w-1/2 px-2 mb-4">
      <RepoCard repo={repo} />
    </div>
  ))}
</div>


        )}
      </div>

      {/* GitHub Contributions Calendar */}
      <div className="flex flex-col justify-center items-center space-y-3">
        <h3 className="text-lg font-semibold text-center">Contributions</h3>
        <GitHubCalendar username="earlfranciss" blockSize={10} />
      </div>
    </section>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (el) setIsOverflowing(el.scrollWidth > el.clientWidth);
  }, [repo.languages]);

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-gray-700/40 rounded-xl p-4 hover:border-gray-400 hover:bg-gray-800/20 transition-all duration-300"
    >
      <h4 className="text-base font-semibold mb-1">{repo.name}</h4>
      <p className="text-xs text-gray-400 line-clamp-2">{repo.description}</p>

      <div className="flex justify-between items-start mt-3">
        {/* Languages */}
        <div
          ref={containerRef}
          className="relative flex gap-2 overflow-hidden max-w-[70%]"
        >
          <div className="flex shrink-0 gap-2">
            {repo.languages && repo.languages.length > 0 ? (
              repo.languages.map((lang) => (
                <span
                  key={lang}
                  className="text-xs px-2 py-1 rounded-full bg-gray-700/40 text-gray-300 whitespace-nowrap"
                >
                  {lang}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500 italic">No languages</span>
            )}
          </div>

          {/* Only show fade if overflowing */}
          {isOverflowing && (
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center text-xs text-gray-500 gap-3">
          <span>⭐ {repo.stars}</span>
          <span>🍴 {repo.forks}</span>
        </div>
      </div>
    </a>
  );
}
