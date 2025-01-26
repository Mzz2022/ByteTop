import type { RouteObject } from "react-router-dom";
import IndexPage from "@/pages/index";
import Dashboard from "@/pages/Dashboard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/dashboard", 
    element: <Dashboard />,
  },
];

export default routes;
