import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Fridge from "../Pages/Fridge";
import AddFood from "../Pages/AddFood";
import MyItems from "../Pages/MyItems";
import Login from "../Pages/Auth/LoginForm";
import Register from "../Pages/Auth/RegisterForm";
import Loader from "../Utilities/Loader";
import Error from "../Pages/Error";
import PrivateRoute from "../Provider/PrivateRoute";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <Loader />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "fridge",
        Component: Fridge,
      },
      {
        path: "add-food",
        element: <PrivateRoute>
          <AddFood />
        </PrivateRoute>
      },
      {
        path: "my-items",
        element: <PrivateRoute>
          <MyItems />
        </PrivateRoute>
      },
      {
        path: "auth/login",
        Component: Login
      },
      {
        path: "auth/register",
        Component: Register
      }
    ],
  },
]);



export default router;