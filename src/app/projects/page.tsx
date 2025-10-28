import ProjectCard from "@/components/ProjectCard";
import { ProjectData } from "../../lib/ProjectsData";

const bgColors = [
  "hover:bg-gradient-to-b from-purple-900/50 to-black/90 hover:from-blue-900/60 hover:to-black/40",
  "hover:bg-gradient-to-b from-blue-900/50 to-black/90 hover:from-teal-900/60 hover:to-black/40",
  "hover:bg-gradient-to-b from-green-900/50 to-black/90 hover:from-green-900/60 hover:to-black/40",
];


export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 relative space-y-6 pt-6 pb-8">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />

      <h2 className="text-2xl font-bold text-center">Projects</h2>
      <div className="flex flex-col gap-8">
        {ProjectData.map((proj, index) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            bgColor={bgColors[index % bgColors.length]}
          />
        ))}
      </div>
    </section>
  );
}
