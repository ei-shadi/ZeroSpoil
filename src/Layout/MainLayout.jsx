import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ScrollToTop from "../Utilities/ScrollToTop";


const MainLayout = () => {


  return (
    <div>
      <ScrollToTop />
      
      <header className="h-[104px]">
        <Navbar />
      </header>

      <main >
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;