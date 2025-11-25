"use client";

import { useState } from 'react';
import HoverSlideshow from "@/components/HoverSlideshow";
import TechIcons from "@/components/TechIcons";
import BookingModal from "@/components/BookingModal";
import { motion } from "motion/react";

export default function About() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Text content split into parts for animation
    const textParts = [
        "I'm a ",
        "developer",
        " by day and a ",
        "lifter",
        " by habit, based in ",
        "Cebu, Philippines",
        ". Currently ",
        "building modern software experiences",
        " — passionate about writing ",
        "clean, efficient code",
        " and ",
        "lifting heavy circles",
        " outside the editor."
    ];

    return (
        <section id="about" className="scroll-mt-52 space-y-6 mt-24">
            <motion.div
                className="text-base sm:text-lg mt-5 sm:mt-8 text-center text-gray-400 leading-relaxed p-2 sm:p-6 md:p-8 m-4 sm:m-5 md:m-7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    I'm a
                </motion.span>
                <motion.i
                    className="text-slate-200 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    {" "}
                    <HoverSlideshow
                        label="developer"
                        images={[
                            "/developer/img1.png",
                            "/developer/img3.png",
                            "/developer/img4.png",
                        ]}
                    />
                    {"  "}
                </motion.i>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    by day and a
                </motion.span>
                <motion.i
                    className="text-slate-200 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    {" "}
                    <HoverSlideshow
                        label="lifter"
                        images={[
                            "/gym/img1.png",
                            "/gym/img2.png",
                            "/gym/img4.png",
                            "/gym/img5.png",
                        ]}
                    />
                    {"  "}
                </motion.i>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                >
                    by habit, based in
                </motion.span>
                <motion.span
                    className="text-slate-200 font-normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                >
                    {" "}Cebu, Philippines
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                >
                    . Currently
                </motion.span>
                <motion.i
                    className="text-slate-200 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 }}
                >
                    {" "}
                    <HoverSlideshow
                        label="building modern software experiences"
                        images={[
                            "/assets/ProductivIO/LandingPage.png",
                            "/assets/ProductivIO/Login.png",
                            "/assets/ProductivIO/Tasks.png",
                            "/assets/ProductivIO/Pomodoro.png",
                            "/assets/ProductivIO/Study.png",
                            "/assets/EQMS/Login.png",
                            "/assets/EQMS/Dashboard.png",
                            "/assets/SwiftShield/HomePage.png",
                            "/assets/SwiftShield/Login.png",
                            "/assets/SwiftShield/AccessRestriction.png",
                            "/assets/SwiftShield/LockScreen.png",
                        ]}
                    />
                    {" "}
                </motion.i>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.0 }}
                >
                    — passionate about writing
                </motion.span>
                <motion.span
                    className="text-slate-200 font-normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.1 }}
                >
                    {" "}clean, efficient code
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                >
                    {" "}and
                </motion.span>
                <motion.span
                    className="text-slate-200 font-normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 }}
                >
                    {" "}lifting heavy circles
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.4 }}
                >
                    {" "}outside the editor.
                </motion.span>


                <TechIcons />


                <div className="flex justify-center items-center gap-8 sm:gap-6 pt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                            duration: 0.5,
                            delay: 1.5,
                            ease: "easeOut"
                        }}
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 rounded border-2 border-gray-400/20 text-sm sm:text-xs px-4 py-2 cursor-pointer bg-gray-700/40 hover:bg-blue-600/40 hover:border-blue-400 text-gray-300 hover:text-gray-100 hover:scale-105 transition-all duration-300 font-semibold"
                    >
                        <span>Say Hello</span>
                        <span className="animate-wave inline-block">👋</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                            duration: 0.5,
                            delay: 1.7,
                            ease: "easeOut"
                        }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse-glow" />
                        <h4 className="text-xs text-gray-300 font-medium">Available for projects</h4>
                    </motion.div>
                </div>
            </motion.div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}