import { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import logo from "../assets/Logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import Btn from "../Utilities/Btn";
import {
  FaHome,
  FaSnowflake,
  FaPlus,
  FaClipboardList,
  FaSignInAlt,
  FaUserPlus,
  FaQuestionCircle,
} from "react-icons/fa";
import ThemeBtn from "../Utilities/ThemeBtn";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef();
  const hamburgerRef = useRef();
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Scroll listener to set blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
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

  // Center Links for large device
  const centerLinks = (
    <div className="lg:flex hidden nav-links-bg">
      <ul className="items-center hidden space-x-10 lg:flex center-bg rounded-full px-8 py-4">
        {[
          { to: "/", title: "Home", icon: FaHome },
          { to: "/fridge", title: "Fridge", icon: FaSnowflake },
          user && { to: "/add-food", title: "Add Food", icon: FaPlus },
          user && { to: "/my-items", title: "My Items", icon: FaClipboardList },
          { to: "/faq", title: "FAQ", icon: FaQuestionCircle },
        ]
          .filter(Boolean)
          .map(({ to, title, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                title={title}
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive
                    ? "text-2xl font-extrabold bg-[#8338ec] rounded-full text-[#ffd102] px-5 py-1"
                    : "text-xl italic font-bold hover:text-cyan-400 hover:scale-130 duration-300 ease-in-out"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`text-xl ${isActive ? "text-[#ffd102]" : "text-inherit"
                        }`}
                    />
                    {title}
                  </>
                )}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );

  // Mobile Menu Links
  const mobileMenuLinks = (
    <ul className="text-center space-y-2 mt-10 ">
      {[
        { path: "/", title: "Home", icon: <FaHome /> },
        { path: "/fridge", title: "Fridge", icon: <FaSnowflake /> },
        { path: "/faq", title: "FAQ", icon: <FaQuestionCircle /> },
        user && { path: "/add-food", title: "Add Food", icon: <FaPlus /> },
        user && { path: "/my-items", title: "My Items", icon: <FaClipboardList /> },
        user
          ? {
              path: "#",
              title: "Logout",
              icon: <FaSignInAlt />,
              action: () => {
                handleLogout();
                setIsMenuOpen(false);
              },
            }
          : {
              path: "/auth/login",
              title: "Login",
              icon: <FaSignInAlt />,
            }
      ]
        .filter(Boolean)
        .map(({ path, title, icon, action }) => (
          <li key={title}>
            <NavLink
              to={action ? "#" : path}
              onClick={() => {
                if (action) {
                  action();
                } else {
                  setIsMenuOpen(false);
                }
              }}
              className={({ isActive }) =>
                `flex items-center gap-2 justify-center ${action
                  ? "italic font-semibold text-cyan-400 text-2xl rounded-xl py-2 bg-[#3d405b] mx-auto"
                  : isActive
                  ? "text-2xl font-extrabold bg-[#8338ec] text-white py-2 rounded-2xl w-3/5 mx-auto"
                  : "italic font-semibold text-cyan-400 text-2xl rounded-xl py-2 bg-[#3d405b] w-4/5 mx-auto"
                }`
              }
            >
              {icon}
              {title}
            </NavLink>
          </li>
        ))}
    </ul>
  );

  // Handle logout
  const handleLogout = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout successfully!",
          showConfirmButton: true,
          confirmButtonText: "Continue",
          timer: 2000,
          timerProgressBar: true,
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition duration-300 py-2
        ${isScrolled ? "backdrop-blur-md bg-black/40 shadow-lg" : "bg-transparent"}`}
      style={{ WebkitBackdropFilter: isScrolled ? "blur(10px)" : "none" }}
    >
      <div className="px-4 py-1 mx-auto sm:max-w-xl md:max-w-full lg:w-10/12 md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Start */}
          <Link to="/" className="flex items-center">
            <img className="w-20" src={logo} alt="logo" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00D3F2] to-[#8338ec] text-transparent bg-clip-text">
              ZeroSpoil
            </h2>
          </Link>

          {/* Center */}
          {centerLinks}

          {/* End */}
          <div className="lg:flex gap-5 items-center hidden">
            {/* Theme Btn */}
            <ThemeBtn />
            {/* Login & Register Btn */}
            {user ? (
              <div className="flex items-center gap-5">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:ring-4 hover:ring-[#00D3F2] transition duration-200 cursor-pointer hover:scale-110"
                >
                  <div className="w-full h-12 rounded-full overflow-hidden">
                    <img
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-content={user?.displayName || user?.email}
                      alt="User Avatar"
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                      }
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <Tooltip
                    id="my-tooltip-inline"
                    place="bottom"
                    effect="solid"
                    style={{ color: "#00D3F2", fontSize: "1rem" }}
                  />
                </div>
                <Btn name="Logout" onClick={handleLogout} />
              </div>
            ) : (
              <div className="lg:flex gap-5 items-center hidden">
                <Link to="/auth/login">
                  <Btn name="Login" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden flex items-center gap-3 ">
            <button
              title="Toggle Menu"
              ref={hamburgerRef}
              className="p-2 transition rounded "
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg className="w-7 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>

            {isMenuOpen && (
              <motion.div
                className="absolute top-20 left-0 w-full z-50 rounded-2xl bg-amber-100"
                ref={menuRef}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="p-5 pt-10 nav-bg rounded">
                  <div className="flex items-center justify-between mb-4 relative">
                    {/* Close button */}
                    <button
                      title="Close Menu"
                      className="p-2 -mt-2 -ml-2 rounded hover:bg- absolute right-0"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg
                        className="w-8 bg-[#8338ec] rounded-full p-1.5 font-bold text-white"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6 5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9 4.7,20 5,20s0.5-0.1 0.7-0.3l6.3-6.3 6.3,6.3c0.2,0.2 0.5,0.3 0.7,0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4L13.4,12 19.7,5.7C20.1,5.3 20.1,4.7 19.7,4.3z"
                        />
                      </svg>
                    </button>

                    {/* Centered avatar */}
                    {user && (
                      <div className="flex flex-col items-center gap-2 mx-auto">
                        <img
                          src={
                            user?.photoURL ||
                            "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                          }
                          alt="User Avatar"
                          className="w-16 h-16 object-cover rounded-full border-2 border-green-500"
                        />
                        <p className="font-semibold text-2xl">
                          {user?.displayName || user?.email}
                        </p>
                      </div>
                    )}

                    {/* Right side theme toggle */}
                    <div className="absolute left-0">
                      <ThemeBtn />
                    </div>
                  </div>

                  {/* Mobile menu links */}
                  {mobileMenuLinks}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
