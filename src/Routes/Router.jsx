import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Fridge from "../Pages/Fridge";
import AddFood from "../Pages/AddFood";
import MyItems from "../Pages/MyItems";
import Login from "../Pages/Auth/LoginForm";
import Register from "../Pages/Auth/RegisterForm";
import Loader from "../Shared/Loader";
import Error from "../Pages/Error";
import PrivateRoute from "../Provider/PrivateRoute";
import FoodDetails from "../Components/FoodDetails";
import axios from "axios";
import FAQ from "../Pages/Faq";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <Loader />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "fridge",
        Component: Fridge,
      },
      {
        path: "food-details/:id",
        hydrateFallbackElement: <Loader />,
        Component: FoodDetails,
        loader: ({ params }) => axios(`${import.meta.env.VITE_API_URL}/food-details/${params.id}`)
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
        path: "faq",
        element: <FAQ />
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