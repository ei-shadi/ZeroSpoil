import { useContext, useState } from 'react';
import { FaUserCircle, FaEnvelope, FaLock, FaImage, FaUser, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';




const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setUser, createUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target
    const formData = new FormData(form)
    const userData = Object.fromEntries(formData.entries())
    const { name, email, password, confirmPassword } = userData;


    // Password match check
    if (password !== confirmPassword) {
      return toast.error('Password does not match!');
    }
    // Password validation
    if (!/[A-Z]/.test(password)) return toast.error("Password must contain at least 1 Uppercase letter.");
    if (!/[a-z]/.test(password)) return toast.error("Password must contain at least 1 Lowercase letter.");
    if (!/[0-9]/.test(password)) return toast.error("Password must contain at least 1 Number.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return toast.error("Password must contain at least 1 Special Character.");
    if (password.length < 8) return toast.error("Password must be at least 8 characters long.");


    // Create User
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          icon: 'success',
          title: 'Account created successfully!',
          html: `<span class="font-bold text-green-500 text-2xl">Welcome <span class="text-amber-600 font-bold text-2xl">${name}</span></span>`,
          showConfirmButton: true,
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
        });
        navigate(`${location.state ? location.state : '/'}`);
        
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className=" py-20 flex items-center justify-center bg-gradient-to-br from-[#8338EC]">
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
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-red-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#8338EC]"
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
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-red-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
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
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-red-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className='relative'>
            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
              <FaLock className="text-[#8338EC]" /> Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-red-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#8338EC]"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute top-11 right-3 cursor-pointer bg-[#8338ec] p-1 rounded-full text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className='relative'>
            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
              <FaLock className="text-[#8338EC]" />Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-red-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#8338EC]"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute top-11 right-3 cursor-pointer bg-[#8338ec] p-1 rounded-full text-white"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#8338EC] hover:bg-[#00D3F2] hover:scale-110 cursor-pointer text-white md:text-xl font-bold py-3 rounded-xl transition duration-200"
          >
            Register
          </button>

        </form>

        <div className='flex justify-center items-center gap-1.5 text-sm md:text-base'>
          <p className="text-gray-700 mt-4">Already have an account?</p>
          <p className="text-[#00D3F2] hover:text-[#8338EC] font-medium hover:cursor-pointer hover:scale-110 mt-4 text-center">
            <Link to="/auth/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
