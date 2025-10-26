import ProjectCard from "@/components/ProjectCard";
// import projects from "@/lib/ProjectsData";

export default function Projects() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Projects</h2>
      {/* <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} {...proj} />
        ))}
      </div> */}
    </section>
  );
}
