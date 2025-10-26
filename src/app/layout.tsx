import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >

        <div className="grid grid-cols-5 min-h-screen">
          <Sidebar />
          <main className="col-span-3 px-6 py-6 ">
            <Header />
            {children}
            <Footer />
          </main>
          <div></div>
        </div>
      </body>
    </html>
  );
}
