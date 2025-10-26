import Link from "next/link";
import { MoveUpRight } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center pb-8 py-2 ">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black font-bold">
          E
        </div>
        <div>
            <h1 className="text-base font-bold">Earl Francis Ong</h1>
            <p className="text-xs font-serif italic">Software Engineer</p>
        </div>
      </div>
      <div className="flex items-center gap-4 ">
        <Link
          href="https://www.linkedin.com/in/earl-francis-o-3370a3205"
          target="_blank"
          className="flex items-center gap-1 text-sm text-gray-600 transition-all duration-300 hover:text-gray-400 hover:scale-103"
        >
          LinkedIn <MoveUpRight size={14}/>
        </Link>
        <Link
          href="/resume.pdf"
          target="_blank"
          className="flex items-center gap-1 text-sm text-gray-600 transition-all duration-300 hover:text-gray-400 hover:scale-103"
        >
          Resume <MoveUpRight size={14}/>
        </Link>
      </div>
    </header>
  );
}
