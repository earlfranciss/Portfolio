"use client"

import About from "./about/page";
import Projects from "./projects/page";
import Experience from "./experience/page";
import Github from "./github/page";
import Contact from "./contact/page";
import Snowfall from "react-snowfall";

export default function Home() {
  return (
    <section className="space-y-4">
      <Snowfall
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
      />
      <About />
      <Projects />
      <Experience />
      <Github />
      <Contact />
    </section>
  );
}
