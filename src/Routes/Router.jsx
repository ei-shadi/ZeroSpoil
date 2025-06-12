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
        Component: AddFood
      },
      {
        path: "my-items",
        Component: MyItems
      },
      {
        path:"auth/login",
        Component: Login
      },
      {
        path:"auth/register",
        Component: Register
      }
    ],
  },
]);



export default router;