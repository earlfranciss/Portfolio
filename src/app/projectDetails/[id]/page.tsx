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
import { MoveLeft, Github, Link2, X } from "lucide-react";
import { useState } from "react";
import Zoom from 'react-medium-image-zoom';


export default function ProjectDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const project = ProjectData.find((p) => p.id === parseInt(id));

    if (!project) {
        notFound();
    }

    return (
        <div className="py-8 space-y-6">
            {/* Back button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-200 transition-colors"
            >
                <MoveLeft size={20} />
                Back to projects
            </Link>

            <div className="space-y-4">
                <div className="flex gap-3 items-center justify-center">
                    {/* Project header */}
                    <h1 className="text-4xl font-bold">{project.title}</h1>

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

            {/* Images gallery */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Screenshots</h2>
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
        </div>
    );
}