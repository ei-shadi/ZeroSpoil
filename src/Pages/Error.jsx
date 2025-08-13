import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaRegSadTear } from "react-icons/fa";
import Btn from "../Shared/Btn";
import Lottie from "lottie-react";
import ErrorAnimation from "../assets/Lottie/Error.json";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#8338ec] to-[#00D3F2] flex flex-col items-center justify-center px-4 text-center">
      <Lottie animationData={ErrorAnimation} loop={true} className="w-full md:w-[40%]" />
      <h1 className="text-white text-4xl font-bold mb-2 flex items-center gap-2">
        <FaRegSadTear className="text-white md:text-5xl" />
        Page Not Found
      </h1>
      <p className="text-white text-lg mb-6 max-w-xl">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Btn name="Go Back" />
      </Link>

    </div>
  );
}
