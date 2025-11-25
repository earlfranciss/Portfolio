"use client";

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ProjectData } from "../../../lib/ProjectsData";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { MoveLeft, Github, Link2, X, Check, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react"

export default function ProjectDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const project = ProjectData.find((p) => p.id === parseInt(id));

    // Show/hide scroll to top button based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!project) {
        notFound();
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{
                    duration: 0.5,
                    delay: 0.1,
                    ease: "easeOut"
                }}
                className="py-8 space-y-6 px-0! sm:px-6 lg:px-8 "
            >
                {/* Back button */}
                <Link
                    href="/"
                    className="absolute left-10 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
                >
                    <MoveLeft size={20} />
                    Back
                </Link>

                <div className="space-y-4 mt-6">
                    <div className="flex flex-wrap gap-3 items-center justify-center">
                        {/* Project header */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{project.title}</h1>

                        {/* Project links */}
                        <Link href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-200 transition-colors">
                            <Github size={18} />
                        </Link>
                        <Link href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-200 transition-colors">
                            <Link2 size={18} />
                        </Link>
                    </div>

                    {/* Project Description */}
                    <p className="text-gray-400 text-base text-center">{project.description}</p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {project.techStack.map((tech, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 rounded border border-gray-700/50 px-3 py-1 bg-gray-800/50 hover:bg-gray-800 transition-colors"
                            >
                                <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    className="w-5 h-5"
                                />
                                <span className="text-xs text-gray-300">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Section - Only show if features exists */}
                {project.features && project.features.length > 0 && (
                    <>
                        <div className="space-y-6">
                            {/* Gradient divider */}
                            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />
                            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center">Features</h2>
                            <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                                {project.features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.1,
                                            ease: "easeOut"
                                        }}
                                        className="flex flex-col gap-3 rounded-lg border border-gray-700/50 hover:border-gray-400 p-5 hover:bg-gray-800/60 transition-colors w-full md:w-[calc(50%-0.75rem)]"
                                    >
                                        <h3 className="text-sm font-bold text-gray-200">{feature.category}</h3>
                                        <ul className="space-y-2">
                                            {feature.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-start gap-2 text-xs text-gray-400">
                                                    <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Architecture Section - Only show if architecture exists */}
                {project.architecture && (
                    <>
                        <div className="space-y-4">
                            {/* Gradient divider */}
                            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />

                            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center">System Architecture</h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2,
                                    ease: "easeOut"
                                }}
                                className="max-w-4xl mx-auto rounded-lg border border-gray-700/50 hover:border-gray-400 p-6 bg-gray-800/50 hover:bg-gray-800/60 transition-colors overflow-x-auto"
                            >
                                <pre className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed whitespace-pre">
                                    {/* {project.architecture} */}
                                </pre>
                            </motion.div>
                        </div>
                    </>
                )}

                {/* Images gallery */}
                <div className="space-y-4">

                    {/* Gradient top border */}
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />

                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center">Highlights</h2>
                    <Carousel
                        plugins={[plugin.current]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {project.images.map((image, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card className="border-gray-800 rounded-lg bg-gray-800/50">
                                            <CardContent className="flex aspect-square items-center justify-center p-0 overflow-hidden">
                                                <img
                                                    src={image}
                                                    alt={`${project.title} screenshot ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => setSelectedImage(image)}
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-black border-black" />
                        <CarouselNext className="bg-black border-black" />
                    </Carousel>

                </div>

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close button */}
                        <button
                            aria-label="Close"
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>

                        {/* Full size image */}
                        <img
                            src={selectedImage}
                            alt="Full size screenshot"
                            className="max-w-full max-h-full object-contain p-4"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />
                    </div>
                )}


                {/* Team Section - Only show if team exists */}
                {project.team && project.team.length > 0 && (
                    <>
                        <div className="space-y-4">
                            {/* Gradient top border */}
                            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />

                            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center">Team</h2>
                            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                {project.team.map((member, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.1,
                                            ease: "easeOut"
                                        }}
                                        className="flex flex-col items-center gap-2 rounded-lg border border-gray-700/50 hover:border-gray-400 p-4  hover:bg-gray-800/50 transition-colors w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
                                    >
                                        <h3 className="text-sm font-semibold text-gray-200">{member.name}</h3>
                                        <p className="text-xs text-gray-400">{member.role}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </>
                )}

                {/* Gradient top border */}
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />

                <p className="text-xs text-center text-gray-400/80">{project.message}</p>
            </motion.div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-tr from-slate-600 to-gray-890  hover:from-slate-600 hover:to-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={20} className="group-hover:translate-y-[-2px] transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}