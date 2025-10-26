import ExperienceCard from "@/components/ExperienceCard";
import { ExperienceData } from "../../lib/ExperienceData"

export default function Experience() {
    return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Experience</h2>
      <div className="flex flex-col ">
        {ExperienceData.map((exp) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div>
    </section>
  );
}