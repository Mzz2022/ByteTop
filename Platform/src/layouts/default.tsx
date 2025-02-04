import NavigationBar from "@/components/NavigationBar";

export default function Navbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <NavigationBar />
      <main className="flex-1 w-full overflow-auto">
        {children}
      </main>
    </div>
  );
}
