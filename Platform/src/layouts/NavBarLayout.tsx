import { useState, useEffect } from "react";

import NavigationBar from "@/components/NavigationBar";

export default function NavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex flex-col">
        {/* 占位元素防止布局跳动 */}
        <div className={`h-16 ${isScrolled ? "block" : "hidden"}`} />
        <nav
          className={`
        w-full 
        ${
          isScrolled
            ? "fixed top-0 bg-white shadow-md z-50"
            : "relative bg-transparent"
        }
        transition-all duration-300
      `}
        >
          <NavigationBar />
        </nav>
        <main className="flex-1 w-full overflow-auto px-16 pb-4">
          {children}
        </main>
      </div>
    </>
  );
}
