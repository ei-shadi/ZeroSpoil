import { useState, useRef, useEffect, useContext, use } from "react";
import logo from "../assets/Logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import Btn from "../Utilities/Btn";
import { FaHome, FaSnowflake, FaPlus, FaClipboardList, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import ThemeBtn from "../Utilities/ThemeBtn";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Close the menu when a link is clicked or anywhere
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

  // Center Links of the navbar For Large Device
  const centerLinks = (
    <div className="lg:flex hidden nav-links-bg">
      <ul className="items-center hidden space-x-10 lg:flex">

        {[
          { to: "/", title: "Home", icon: FaHome },
          { to: "/fridge", title: "Fridge", icon: FaSnowflake },
          user && { to: "/add-food", title: "Add Food", icon: FaPlus },
          user && { to: "/my-items", title: "My Items", icon: FaClipboardList },
        ].filter(Boolean).map(({ to, title, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              title={title}
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive
                  ? "text-2xl font-extrabold text-[#8338ec] border-b-4 rounded px-4 pb-0.5"
                  : "italic font-semibold hover:text-cyan-400 hover:text-2xl duration-100 hover:border-b-4 rounded text-lg hover:px-3"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`text-xl ${isActive ? "text-[#8338ec]" : "text-inherit"}`} />
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
    <ul className="text-center space-y-2 mt-10">
      {[
        { path: "/", title: "Home", icon: <FaHome /> },
        { path: "/fridge", title: "Fridge", icon: <FaSnowflake /> },
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
          },
        !user && {
          path: "/auth/register",
          title: "Register",
          icon: <FaUserPlus />,
        },
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
                  ? "italic font-semibold text-cyan-400 text-xl border-b-8 border-t-8 rounded-xl py-2 bg-[#3d405b] mx-auto"
                  : isActive
                    ? "text-2xl font-extrabold bg-[#8338ec] text-white py-2 rounded-2xl w-3/5 mx-auto"
                    : "italic font-semibold text-cyan-400 text-xl border-b-8 border-t-8 rounded-xl py-2 bg-[#3d405b] mx-auto"
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



  // Handle Logout
  const handleLogout = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logout successfully!',
          showConfirmButton: true,
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
        });
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="nav-bg fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-w shadow-lg transition duration-300">
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
            {
              user ?
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
                        src={user?.photoURL || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <Tooltip
                      id="my-tooltip-inline"
                      place="bottom"
                      effect="solid"
                      style={{ color: '#00D3F2', fontSize: '1rem' }}
                    />
                  </div>
                  <Btn name="Logout" onClick={handleLogout} />
                </div>
                : <div className="lg:flex gap-5 items-center hidden">
                  <Link to="/auth/login">
                    <Btn name="Login" />
                  </Link>
                  <Link to="/auth/register">
                    <Btn name="Register" />
                  </Link>
                </div>
            }
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden flex items-center gap-3">

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
                <div className="p-5 nav-bg border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4 relative">
                    {/* Close button - left side */}
                    <button
                      title="Close Menu"
                      className="p-2 -mt-2 -ml-2 rounded hover:bg- absolute right-0"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-6 bg-[#8338ec] rounded-full p-1 text-[#00D3F2]" viewBox="0 0 24 24">
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
                          src={user?.photoURL || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"}
                          alt="User Avatar"
                          className="w-16 h-16 object-cover rounded-full border-2 border-green-500"
                        />
                        <p className="font-semibold text-2xl">{user?.displayName || user?.email}</p>
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
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
