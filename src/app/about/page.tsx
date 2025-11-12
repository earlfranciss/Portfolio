"use client";

import { useState } from 'react';
import HoverSlideshow from "@/components/HoverSlideshow";
import TechIcons from "@/components/TechIcons";
import BookingModal from "@/components/BookingModal";


export default function About() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="about" className="scroll-mt-52  space-y-6 mt-24 ">

            <div className="text-sm sm:text-lg mt-5 sm:mt-8 text-center text-gray-400 leading-relaxed p-4 sm:p-6 md:p-8 m-4 sm:m-5 md:m-7">
                I'm a
                <i className="text-slate-200 font-semibold">{" "}<HoverSlideshow
                    label="developer"
                    images={[
                        "/developer/img1.png",

                        "/developer/img3.png",
                        "/developer/img4.png",
                    ]}
                />{" "}</i>
                by day and a
                <i className="text-slate-200 font-semibold">{" "}<HoverSlideshow
                    label="lifter"
                    images={[
                        "/gym/img1.png",
                        "/gym/img2.png",
                        "/gym/img3.png",
                        "/gym/img4.png",
                        "/gym/img5.png",
                    ]}
                />{" "}</i>
                by habit, based in
                <span className="text-slate-200 font-normal"> Cebu, Philippines</span>.
                Currently
                <i className="text-slate-200 font-semibold">{" "}<HoverSlideshow
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
                />{" "}</i> —
                passionate about writing <span className="text-slate-200 font-normal"> clean, efficient code </span>
                and <span className="text-slate-200 font-normal"> lifting heavy circles </span> outside the editor.


                {/* <img alt="tech"
                    src="https://skillicons.dev/icons?i=dotnet,react,angular,tailwind,py,flask,vue,ts,js,figma,mongodb,azure,docker,git,github"
                    className="items-center mt-8" /> */}
                <TechIcons />
                <div className="flex justify-center items-center gap-6 pt-8">

                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 rounded border-2 border-gray-400/20 text-sm sm:text-xs px-4 py-2 cursor-pointer bg-gray-700/40 hover:bg-blue-600/40 hover:border-blue-400 text-gray-300 hover:text-gray-100 hover:scale-105 transition-all duration-300 font-semibold"
                    >
                        <span>Say Hello</span>
                        <span className="animate-wave inline-block">👋</span>
                    </div>
                    {/* Availability status */}
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse-glow" />
                        <h4 className="text-xs text-gray-300 font-medium">Available for projects</h4>
                    </div>
                </div>
            </div>

            {/* Say Hello button */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    )
}