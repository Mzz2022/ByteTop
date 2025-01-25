import type { RouteObject } from "react-router-dom";
import IndexPage from "@/pages/index";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <IndexPage />,
    },
];

export default routes;
