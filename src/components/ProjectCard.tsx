type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
};

export default function ProjectCard({ title, description, link }: Project) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <a
        href={link}
        target="_blank"
        className="text-blue-600 hover:underline mt-3 inline-block"
      >
        View Project
      </a>
    </div>
  );
}
