import type { NavigateOptions } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NavBarLayout from "./layouts/NavBarLayout";
import CrashAnalysis from "./pages/CrashAnalysis";
import PerformanceAnalysis from "./pages/PerformanceAnalysis";
import DataOverview from "./pages/DataOverview";
import DataAnalytics from "./pages/DataAnalytics";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  return (
    <>
      <NavBarLayout>
        <main className="px-4 grid gap-3 grid-cols-12 mb-4">
          <Routes>
            <Route element={<DataOverview />} path="/data/overview" />
            <Route element={<DataAnalytics />} path="/data/analytics" />
            <Route element={<Dashboard />} path="/visitors/customer-type" />
            <Route element={<Dashboard />} path="/visitors/geography" />
            <Route element={<Dashboard />} path="/visitors/devices" />
            <Route element={<Dashboard />} path="/users/image" />
            <Route element={<Dashboard />} path="/users/loyalty" />
            <Route
              element={<PerformanceAnalysis />}
              path="/performance/analysis"
            />
            <Route element={<CrashAnalysis />} path="/performance/crash" />
          </Routes>
        </main>
      </NavBarLayout>
    </>
  );
}

export default App;
