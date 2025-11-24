// app/projectDetails/[id]/layout.tsx
export default function ProjectDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8">
      <main className="w-full max-w-4xl px-4 mx-auto">
        {children}
      </main>
    </div>
  );
}