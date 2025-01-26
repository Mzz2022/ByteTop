import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full overflow-auto">
        {children}
      </main>
    </div>
  );
}
