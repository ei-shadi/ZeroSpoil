import React from 'react';
import { FaUserCircle, FaEnvelope, FaLock, FaImage, FaUser } from 'react-icons/fa';
import { Link } from 'react-router';

const RegisterForm = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target
    const formData = new FormData(form)
    const userData = Object.fromEntries(formData.entries())
    console.log(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8338EC]">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md">
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-5xl text-[#8338EC]" />
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">Create Account</h2>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
              <FaUser className="text-[#8338EC]" /> Name
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-[#8338EC] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#8338EC]"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
              <FaEnvelope className="text-[#00D3F2]" /> Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-[#8338EC] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
              <FaImage className="text-[#00D3F2]" /> Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-[#8338EC] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
              placeholder="https://example.com/photo.jpg"
              required
            />
          </div>

          <div>
            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
              <FaLock className="text-[#8338EC]" /> Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-[#00D3F2] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#8338EC]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8338EC] hover:bg-[#00D3F2] hover:scale-110 cursor-pointer text-white md:text-xl font-bold py-3 rounded-xl transition duration-200"
          >
            Register
          </button>
        </form>

        <div className='flex justify-center items-center gap-1.5'>
          <p className="text-sm text-gray-700 mt-4">Already have an account?</p>
          <p className="text-[#00D3F2] text-sm hover:text-[#8338EC] font-medium hover:cursor-pointer hover:scale-110 mt-4 text-center">
            <Link to="/auth/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
