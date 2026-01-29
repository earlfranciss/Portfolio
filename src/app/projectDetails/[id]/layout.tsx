"use client"

import Snowfall from "react-snowfall";

// app/projectDetails/[id]/layout.tsx
export default function ProjectDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8">
      <main className="w-full max-w-4xl px-4 mx-auto">
        {/* <Snowfall
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 100,
            pointerEvents: "none",
          }}
          color="#daeeffff"
          snowflakeCount={250}
          speed={[2, 4]}
          wind={[1, 4]}
          radius={[0.5, 2.5]}
        /> */}
        {children}
      </main>
    </div>
  );
}