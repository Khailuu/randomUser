import { RouteObject, useRoutes } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import HomePage from "../pages/HomePage";

const router: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <HomePage />
        }
    ],
  },
];

export const Router = () => useRoutes(router);
