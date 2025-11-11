import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Earl Francis | Software Engineer",
  description: "Personal portfolio website built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />

        <div className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-x-hidden">

          {/* Main content wrapper */}
          <main className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto overflow-x-hidden">
  {children}
  <Footer />
</main>

        </div>
      </body>
    </html>
  );
}

