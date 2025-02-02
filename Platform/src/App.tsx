import type { NavigateOptions } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NavigationBar from "./components/navbar";
import LoginPage from "./pages/LoginPage";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* 带导航栏的主布局 */}
        <Route path="/*" element={
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
        } />
      </Routes>
    </>
  );
}

export default App;
