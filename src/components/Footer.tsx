"use client"

import { motion } from "motion/react";
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const currentVersion = "v2";
  const [version, setVersion] = React.useState(currentVersion);


  return (
    <footer className="relative flex flex-col items-center pt-6 p-4 text-sm text-gray-400 justify-between mt-9">
      {/* Gradient bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 2,
          ease: "easeOut"
        }}
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gray-500/70 via-transparent to-gray-500/70"
      />

      <div className="w-full text-xs sm:text-sm flex justify-between max-w-5xl">
        <div>Earl Francis - © 2025</div>
        <div className="italic text-sm text-center">Sic Parvis Magna</div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline"
              className="bg-zinc-900 border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-white"
              >
                Version
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="right"
            align="start"
            className="w-44 bg-zinc-900 border border-zinc-700 text-zinc-100"
          >
            <DropdownMenuLabel className="text-zinc-400">Website Version</DropdownMenuLabel>

            <DropdownMenuRadioGroup
              value={version}
              onValueChange={(value) => {
                if (value === version) return; // Already on this version

                setVersion(value);

                if (value === "v1") {
                  window.location.href = "https://earlfranciss.github.io/Portfolio-Old/";
                } else {
                  router.push("/");
                }
              }}
            >
              <DropdownMenuRadioItem value="v1" className="focus:bg-zinc-800 focus:text-white">
                Version 1
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem value="v2" className="focus:bg-zinc-800 focus:text-white">
                Version 2
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </footer>
  );
}
