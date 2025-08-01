import { Link } from "react-router";
import logo from "../assets/Logo.png";
import SocialBTN from "../Utilities/SocialBTN";



const Footer = () => {
  return (
    <div className="footer-bg">
      <div className="px-5 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:w-10/12 md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className=" lg:col-span-2 text-center lg:text-left">
            <Link
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <img src={logo} alt="" className="w-28" />
              <h2 className=" text-4xl font-bold tracking-wide bg-gradient-to-r from-[#00D3F2] to-[#8338ec] text-transparent bg-clip-text">
                ZeroSpoil
              </h2>
            </Link>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-md md:text-base text-gray-800">
                Track your food, reduce waste. Food Expiry Tracker helps you manage expiry dates with ease and stay alerted—built for smarter, sustainable living.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">

            <div>
              <p className="font-semibold text-lg text-[#8338EB]">
                Category
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    World
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Games
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    References
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-lg text-[#8338EB]">
                About
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Web
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    eCommerce
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Entertainment
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-lg text-[#8338EB]">Copyright</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Media
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Brochure
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Nonprofit
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Educational
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Projects
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-lg  text-[#8338EB]">Information</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Infopreneur
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Personal
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Wiki
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-600 transition-colors duration-300 hover:text-cyan-500"
                  >
                    Forum
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row ">
          <p className="text-sm text-gray-600 inline-flex justify-center">
            © Copyright 2020 <span className="pl-1 my-font">ZeroSpoil</span>. All rights reserved.
          </p>
          <div className="">
            <SocialBTN />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;