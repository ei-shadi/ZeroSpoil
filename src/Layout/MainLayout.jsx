import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ScrollToTop from "../Utilities/ScrollToTop";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import Loader from "../Utilities/Loader";


const MainLayout = () => {

  const {loading} = useContext(AuthContext);

  return (
    <div>
      <ScrollToTop />

      {
        loading && <Loader className="h-screen" />  
      }

      <header className="h-[88px]">
        <Navbar />
      </header>


      <main className="min-h-screen">
        <Outlet />
      </main>


      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;