// app/projectDetails/[id]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h2 className="text-2xl font-bold">Project Not Found</h2>
      <p className="text-gray-400">The project you're looking for doesn't exist.</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}