import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loader from "../Utilities/Loader";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  const location = useLocation()

  if (loading) {
    return <Loader className="h-screen" />
  }

  if (user) {
    return children
  }
  else {
    return <Navigate to="/auth/login" state={location.pathname} />
  }
};
export default PrivateRoute;