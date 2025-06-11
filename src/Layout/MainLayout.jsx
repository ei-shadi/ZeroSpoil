import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <header className="bg-[#f4f1de] h-[88px]">
        <Navbar />
      </header>


      <main className="min-h-screen">
        <Outlet />
      </main>


      <footer className="bg-[#81b29a] ">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;