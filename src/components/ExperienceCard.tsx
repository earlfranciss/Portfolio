import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export type Experience = {
  id: number;
  title: string;
  description: string;
  date: string;
  link: string;
};

export default function ExperienceCard({ title, description, date, link }: Experience) {
  return (
    <div className="flex rounded-lg p-4 transition">
      <p className="flex-shrink-0 pr-5 pt-1 w-44 text-sm text-gray-500 text-end">
        { date }
      </p>

      <div className="gap-1">
        <Link href={link} className="flex items-center gap-2 text-normal font-semibold text-slate-200">{title}  <SquareArrowOutUpRight  size={12}/></Link>
        <p className="text-gray-400 mt-2 leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  );
}
