import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>


      <main>
        <Outlet />
      </main>


      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;