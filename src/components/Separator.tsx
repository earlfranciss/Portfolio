"use client"

import { motion } from "motion/react";

{/* Gradient top border */}
export default function Separator() {
    return (
        <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
                duration: 2,
                ease: "easeOut"
            }}
            className="absolute top-0 left-1/2 h-[2px] -translate-x-1/2 
             bg-gradient-to-r from-transparent via-gray-400/70 to-transparent"
        />
    )
}