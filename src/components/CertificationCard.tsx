"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

export type Certificates = {
    id: number;
    title: string;
    skills: string[];
    date: string;
    link: string;
    image: string;
    badge: string;
    issuer: string;
};

export default function CertificationCard({
    title,
    skills,
    date,
    link,
    image,
    badge,
    issuer,
}: Certificates) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (el) setIsOverflowing(el.scrollWidth > el.clientWidth);
    }, [skills]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-700/50 rounded-xl overflow-hidden 
                           hover:border-gray-400 hover:bg-gray-800/20 transition-all duration-300 mb-4"
            >
                <div className="p-3 sm:p-4 space-y-4">
                    
                    {/* Header */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-3">
                            
                            <div className="flex items-center gap-2 min-w-0">
                                <Badge variant="secondary" className="text-xs sm:text-sm">
                                    {badge}
                                </Badge>

                                <h4 className="text-sm sm:text-base font-semibold text-slate-200 leading-snug truncate">
                                    {title}
                                </h4>
                            </div>

                            <p className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">
                                {date}
                            </p>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-400 text-left">
                            {issuer}
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="relative">
                        <div
                            ref={containerRef}
                            className="flex gap-2 flex-wrap"
                        >
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="text-[10px] sm:text-xs px-2 py-1 rounded-full 
                                               bg-gray-700/40 text-gray-300 whitespace-nowrap"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {isOverflowing && (
                            <div className="absolute right-0 top-0 h-full w-8 
                                            bg-gradient-to-l from-black to-transparent 
                                            pointer-events-none" />
                        )}
                    </div>

                    {/* Image (responsive height) */}
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}