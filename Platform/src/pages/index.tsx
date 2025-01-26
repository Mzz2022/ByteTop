import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import NotDesktop from "./NotDesktop";
import LoginPage from "./LoginPage";

export default function IndexPage() {
  // 判断是否为移动端, 放在 App 更合适?
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <DefaultLayout>{isMobile ? <NotDesktop /> : <LoginPage />}</DefaultLayout>
  );
}
