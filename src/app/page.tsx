import About from "./about/page";
import Projects from "./projects/page";
import Experience from "./experience/page";
import Github from "./github/page";
import Contact from "./contact/page";

export default function Home() {
  return (
    <section className="space-y-4">
      <About />
      <Projects/>
      <Experience />
      <Github />
      <Contact />
    </section>
  );
}
