
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";






const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <p>Loading...</p>,
    errorElement: <p>Error 404 Not Found</p>,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
]);



export default router;