// app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next"
import ShaderBackground from "@/components/ShaderGradient";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import { cn } from "@/styles/lib/utils";
import { LightRays } from "@/components/ui/light-rays"
import { FlickeringGrid } from "@/components/ui/flickering-grid"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  // Check if pathname starts with /projectDetails/
  const hideHeaderFooter = pathname.startsWith("/projectDetails/");

  return (
    <html lang="en">
      <head>
        <title>Earl Francis | Software Engineer</title>
        <meta name="description" content="Personal portfolio website built with Next.js and Tailwind CSS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased text-white bg-[#09090b]`}>
        <ShaderBackground />




        {/* Top */}
        <LightRays
          count={12}
          color="rgba(160, 210, 255, 0.12)"
          blur={36}

          speed={14}
          length="70vh"
          className="absolute inset-0 h-full w-full"
        />



        <div className="relative z-10">
          {!hideHeaderFooter && <Header />}

          <div
            className={`min-h-screen flex justify-center px-4 sm:px-6 lg:px-8 ${!hideHeaderFooter ? "pt-16" : ""
              }`}
          >
            <main className="w-full max-w-4xl px-4 mx-auto">
              {children}
              {!hideHeaderFooter && <Footer />}
            </main>

            <Analytics />
          </div>
        </div>
      </body>
    </html>
  );
}