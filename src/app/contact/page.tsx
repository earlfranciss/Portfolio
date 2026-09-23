"use client";

import Image from "next/image";
import { ContactData } from "../../lib/ContactData";
import { motion } from "motion/react";
import Separator from "@/components/Separator";
import { Dock, DockIcon } from "@/components/ui/dock";

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 relative space-y-6 pt-6 pb-8"
    >
      <Separator />

      <h2 className="text-xl sm:text-2xl font-semibold sm:font-bold text-center">
        Contact
      </h2>

      <div className="flex justify-center">
        <Dock
          direction="middle"
          iconSize={60}
          iconMagnification={80}
          iconDistance={120}
          className="border-none bg-transparent shadow-none"
        >
          {ContactData.map((contact, index) => (
            <DockIcon key={contact.id}>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center justify-center w-full h-full"
              >
                <Image
                  src={contact.logo}
                  alt="contact logo"
                  width={60}
                  height={60}
                  unoptimized
                />
              </motion.a>
            </DockIcon>
          ))}
        </Dock>
      </div>
    </section>
  );
}