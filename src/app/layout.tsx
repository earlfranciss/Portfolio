// app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next"
import ShaderBackground from "@/components/ShaderGradient";

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
      <body className={`${inter.className} antialiased text-white`}>
        <ShaderBackground />

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