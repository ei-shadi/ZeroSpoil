import { useContext, useState } from 'react';
import { FaUserCircle, FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.config';



const LoginForm = () => {
  const { logInUser, setUser } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogin = e => {
    e.preventDefault();
    const form = e.target
    const formData = new FormData(form)
    const userData = Object.fromEntries(formData.entries())
    const { email, password } = userData


    // Login User
    logInUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log(user.displayName);
        Swal.fire({
          icon: "success",
          title: "Logged in successfully!",
          html: `<span class="font-bold text-green-500 text-2xl">Welcome <span class="text-[#00D3F2] font-bold text-2xl">${user.email}</span></span>`,
          showConfirmButton: true,
          confirmButtonText: "Continue",
          timer: 2000,
          timerProgressBar: true,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }



  // Login with Google
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        Swal.fire({
          icon: "success",
          title: "Logged in successfully with Google!",
          html: `<span class="font-bold text-green-500 text-2xl">Welcome <span class="text-amber-600 font-bold text-2xl">${user.displayName}</span></span>`,
          showConfirmButton: true,
          confirmButtonText: "Continue",
          timer: 2000,
          timerProgressBar: true,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };



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

            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-[#00D3F2] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#8338EC]"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute top-4 right-3 cursor-pointer bg-[#8338ec] p-1 rounded-full text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00D3F2] hover:bg-[#8338ec] hover:scale-110 cursor-pointer text-white md:text-xl font-bold py-3 rounded-xl transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-[#8338ec] md:text-xl hover:scale-110 cursor-pointer text-white font-semibold py-3 rounded-xl transition duration-200 mt-2">
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
