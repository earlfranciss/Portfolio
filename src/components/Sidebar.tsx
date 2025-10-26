"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="flex justify-end items-center min-h-dvh sticky">
            <aside className="p-6 flex flex-col items-end">
                <nav className="flex flex-col gap-6 items-end">
                    <Link
                        href="/"
                        className="text-sm text-gray-700/75 transition-all duration-300 hover:text-gray-400 hover:scale-110"
                    >
                        About
                    </Link>
                    <Link
                        href="/projects"
                        className="text-sm text-gray-700/75 transition-all duration-300 hover:text-gray-400 hover:scale-110"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/experience"
                        className="text-sm text-gray-700/75 transition-all duration-300 hover:text-gray-400 hover:scale-110"
                    >
                        Experience
                    </Link>
                    <Link
                        href="/github"
                        className="text-sm text-gray-700/75 transition-all duration-300 hover:text-gray-400 hover:scale-110"
                    >
                        GitHub
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm text-gray-700/75 transition-all duration-300 hover:text-gray-400 hover:scale-110"
                    >
                        Contact
                    </Link>
                </nav>
            </aside>
        </div>
    );
}
