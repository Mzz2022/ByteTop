import type { NavigateOptions } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Analytics from "./pages/Analytics";
import NavBarLayout from "./layouts/NavBarLayout";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  return (
    <>
      <NavBarLayout>
        <div className="px-4 grid gap-3 grid-cols-12 mb-4">
          <Routes>
            <Route element={<Overview />} path="/data/overview" />
            <Route element={<Analytics />} path="/data/analytics" />
            <Route element={<Dashboard />} path="/visitors/customer-type" />
            <Route element={<Dashboard />} path="/visitors/geography" />
            <Route element={<Dashboard />} path="/visitors/devices" />
            <Route element={<Dashboard />} path="/users/image" />
            <Route element={<Dashboard />} path="/users/loyalty" />
            <Route element={<Dashboard />} path="/performance/analysis" />
            <Route element={<Dashboard />} path="/performance/crash" />
          </Routes>
        </div>
      </NavBarLayout>
    </>
  );
}

export default App;
