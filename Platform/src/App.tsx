import React from "react";
import type { NavigateOptions } from "react-router-dom";

import { useNavigate, useHref, Routes, Route } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import Dashboard from "./pages/Dashboard";
import NavigationBar from "./components/navbar";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <div className="flex flex-col h-screen">
        <div className="fixed top-0 w-full z-50">
          <NavigationBar />
        </div>
        <main className="flex-1 mt-16 px-6">
          <Routes>
            <Route path="/data/overview" element={<Dashboard />} />
            <Route path="/data/analytics" element={<Dashboard />} />
            <Route path="/visitors/customer-type" element={<Dashboard />} />
            <Route path="/visitors/geography" element={<Dashboard />} />
            <Route path="/visitors/devices" element={<Dashboard />} />
            <Route path="/users/image" element={<Dashboard />} />
            <Route path="/users/loyalty" element={<Dashboard />} />
            <Route path="/performance/analysis" element={<Dashboard />} />
            <Route path="/performance/crash" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </HeroUIProvider>
  );
}

export default App;
