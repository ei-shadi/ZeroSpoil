import React from 'react';
import { FaUserCircle, FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router';








const LoginForm = () => {


  const handleLogin = e => {
    e.preventDefault();
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#009CB3]">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md">
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-5xl text-[#00D3F2]" />
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">Welcome Back</h2>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleLogin}
        >
          <div>
            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
              <FaEnvelope className="text-[#00D3F2]" /> Email
            </label>
            <input
              type="email"
              name='email'
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-[#8338ec] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                <FaLock className="text-[#8338EC]" /> Password
              </label>
              <a href="/forgot-password" className="text-sm text-[#8338EC] hover:underline">Forgot Password?</a>
            </div>
            <input
              type="password"
              name='password'
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-[#00D3F2] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#8338EC]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00D3F2] hover:bg-[#8338ec] hover:scale-110 cursor-pointer text-white md:text-xl font-bold py-3 rounded-xl transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <button className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-[#8338ec] md:text-xl hover:scale-110 cursor-pointer text-white font-semibold py-3 rounded-xl transition duration-200 mt-2">
            <FaGoogle className="text-xl" />
            Sign in with Google
          </button>
        </div>

        <div className='flex justify-center items-center gap-1.5'>

          <p className="text-sm text-gray-700 mt-4">
            Don’t have an account?
          </p>

          <p className="text-[#8338EC] text-sm hover:text-[#00D3F2] font-medium hover:cursor-pointer hover:scale-110 mt-4 text-center">
            <Link to="/auth/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
