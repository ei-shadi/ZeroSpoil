import { useState, useRef, useEffect } from "react";
import logo from "../assets/favicon.png";
import { Link, NavLink } from "react-router";
import Btn from "../Utilities/Btn";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();


  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);


  // Center Links
  const centerLinks = (
    <ul className="items-center hidden space-x-8 lg:flex">
      <li>
        <NavLink
          to="/"
          title="Home"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-extrabold text-[#8338ec] border-b-4 rounded px-4 pb-0.5"
              : "italic font-semibold hover:text-cyan-400 hover:text-2xl duration-100 hover:border-b-4 rounded text-lg hover:px-3"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/fridge"
          title="Fridge"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-extrabold text-[#8338ec] border-b-4 rounded px-4 pb-0.5"
              : "italic font-semibold hover:text-cyan-400 hover:text-2xl duration-100 hover:border-b-4 rounded text-lg hover:px-3"
          }
        >
          Fridge
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-food"
          title="Add Food"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-extrabold text-[#8338ec] border-b-4 rounded px-4 pb-0.5"
              : "italic font-semibold hover:text-cyan-400 hover:text-2xl duration-100 hover:border-b-4 rounded text-lg hover:px-3"
          }
        >
          Add Food
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-items"
          title="My Items"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-extrabold text-[#8338ec] border-b-4 rounded px-4 pb-0.5"
              : "italic font-semibold hover:text-cyan-400 hover:text-2xl duration-100 hover:border-b-4 rounded text-lg hover:px-3"
          }
        >
          My Items
        </NavLink>
      </li>
    </ul>
  );


  // Mobile Menu Links
  const mobileMenuLinks = (
    <ul className="text-center space-y-2">
      {["/", "/fridge", "/add-food", "/my-items", "/auth/login", "/auth/register"].map((path, index) => {
        const titles = ["Home", "Fridge", "Add Food", "My Items", "Login", "Register"];
        return (
          <li key={path}>
            <NavLink
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-2xl font-extrabold bg-[#8338ec] text-white py-2 rounded-2xl block w-3/5 mx-auto"
                  : "italic font-semibold text-cyan-400 text-xl border-b-8 border-t-8 rounded-xl block py-2 bg-[#3d405b]"
              }
            >
              {titles[index]}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );


  return (
    <div className="px-4 py-1 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">

        {/* Start */}
        <Link to="/" className="flex items-center">
          <img className="w-20" src={logo} alt="logo" />
          <h2 className="text-2xl md:text-3xl font-bold">ZeroSpoil</h2>
        </Link>

        {/* Center */}
        {centerLinks}

        {/* End */}
        <div className="lg:flex gap-5 items-center hidden">
          {/* Login BTN */}
          <Link to="/auth/login">
            <Btn name="Login" />
          </Link>
          {/* Register BTN */}
          <Link to="/auth/register">
            <Btn name="Register" />
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <button
            title="Open Menu"
            className="p-2 transition rounded hover:bg-gray-100"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-7 text-gray-600" viewBox="0 0 24 24">
              <path fill="currentColor" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
              <path fill="currentColor" d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z" />
              <path fill="currentColor" d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z" />
            </svg>
          </button>

          {/* Menu */}
          {isMenuOpen && (
            <div className="absolute top-14 left-0 w-full z-50" ref={menuRef}>
              <div className="p-5 bg-[#f4f1de] border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <Link to="/" className="inline-flex items-center">
                    <svg
                      className="w-8 text-purple-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="1" width="7" height="12" />
                      <rect x="3" y="17" width="7" height="6" />
                      <rect x="14" y="1" width="7" height="6" />
                      <rect x="14" y="11" width="7" height="12" />
                    </svg>
                    <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                      Company
                    </span>
                  </Link>
                  <button
                    title="Close Menu"
                    className="p-2 -mt-2 -mr-2 rounded hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6 5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3-6.3,6.3 
                        c-0.4,0.4-0.4,1,0,1.4C4.5,19.9 4.7,20 5,20s0.5-0.1 0.7-0.3l6.3-6.3 6.3,6.3c0.2,0.2 0.5,0.3 0.7,0.3s0.5-0.1 
                        0.7-0.3c0.4-0.4 0.4-1 0-1.4L13.4,12 19.7,5.7C20.1,5.3 20.1,4.7 19.7,4.3z"
                      />
                    </svg>
                  </button>
                </div>
                {mobileMenuLinks}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
