// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import { FiMail, FiLock } from "react-icons/fi";
// import { HiOutlineArrowRight } from "react-icons/hi";

// import { useAuth } from "../context/AuthContext";

// import bgImage from "../assets/login-bg.jpg";

// function Login() {
//   const navigate = useNavigate();

//   const { login } = useAuth();

//   const [loading, setLoading] =
//     useState(false);

//   const [formData, setFormData] =
//     useState({
//       email: "",
//       password: "",
//     });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   const handleSubmit = async (
//     e
//   ) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await login(formData);

//       toast.success(
//         "Login Successful 🚀"
//       );

//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(
//         error?.response?.data
//           ?.message ||
//           "Login Failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">

//       {/* LEFT SIDE */}
//       <div className="relative hidden w-1/2 lg:block">

//         <img
//           src={bgImage}
//           alt="Network"
//           className="h-full w-full object-cover"
//         />

//         <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

//         <div className="absolute left-12 top-1/2 z-10 max-w-lg -translate-y-1/2">

//           <div className="mb-6 flex items-center gap-3">
//             <div className="rounded-xl bg-white/10 p-3 backdrop-blur-lg">
//               🚀
//             </div>

//             <h1 className="text-4xl font-bold text-white">
//               SmartURL
//             </h1>
//           </div>

//           <h2 className="mb-4 text-5xl font-bold text-white">
//             Shorten.
//             <br />
//             Track.
//             <br />
//             Grow.
//           </h2>

//           <p className="text-lg text-slate-200">
//             Professional URL
//             management and
//             analytics platform
//             built for modern
//             businesses.
//           </p>

//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex flex-1 items-center justify-center bg-slate-950 px-6">

//         <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl">

//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-white">
//               Welcome Back
//             </h2>

//             <p className="mt-2 text-slate-400">
//               Login to access your
//               dashboard
//             </p>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5"
//           >

//             {/* EMAIL */}
//             <div className="relative">

//               <FiMail
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={20}
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={
//                   formData.email
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 required
//                 className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-12 pr-4 text-white outline-none focus:border-sky-500"
//               />

//             </div>

//             {/* PASSWORD */}
//             <div className="relative">

//               <FiLock
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={20}
//               />

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={
//                   formData.password
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 required
//                 className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-12 pr-4 text-white outline-none focus:border-sky-500"
//               />

//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-sky-500 py-3 font-semibold text-white transition hover:opacity-90"
//             >
//               {loading
//                 ? "Logging in..."
//                 : "Sign In"}

//               <HiOutlineArrowRight />
//             </button>

//           </form>

//           <p className="mt-6 text-center text-slate-400">
//             Don't have an account?

//             <Link
//               to="/register"
//               className="ml-2 text-sky-400 hover:text-sky-300"
//             >
//               Register
//             </Link>
//           </p>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

import bgImage from "../assets/login-bg.jpg";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(formData);

      toast.success(
        "Login Successful 🚀"
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020817]">

      {/* LEFT */}
      <div className="relative hidden lg:flex w-1/2">

        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div className="relative z-10 flex flex-col justify-center px-14">

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
              🚀
            </div>

            <h1 className="text-5xl font-bold text-white">
              SmartURL
            </h1>

          </div>

          <h2 className="leading-none text-white font-black text-7xl">
            Shorten.
            <br />
            Track.
            <br />
            <span className="bg-gradient-to-r from-violet-500 to-sky-400 bg-clip-text text-transparent">
              Grow.
            </span>
          </h2>

          <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-sky-500" />

          <p className="mt-8 max-w-md text-2xl text-slate-200">
            Professional URL
            management and analytics
            platform built for modern
            businesses.
          </p>

          <div className="mt-16 flex gap-10">

            <div>
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                🔗
              </div>

              <h4 className="text-xl font-bold text-white">
                Shorten
              </h4>

              <p className="text-slate-300">
                Create branded links
              </p>
            </div>

            <div>
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                📊
              </div>

              <h4 className="text-xl font-bold text-white">
                Track
              </h4>

              <p className="text-slate-300">
                Analytics & insights
              </p>
            </div>

            <div>
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                🛡️
              </div>

              <h4 className="text-xl font-bold text-white">
                Secure
              </h4>

              <p className="text-slate-300">
                Enterprise ready
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 items-center justify-center p-10">

        <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-slate-900/60 p-10 backdrop-blur-2xl">

          <div className="mb-8 text-center">

            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5">
              🚀
            </div>

            <h1 className="text-5xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="mt-3 text-lg text-slate-400">
              Login to access your dashboard
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="relative">

              <FiMail
                size={22}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-800/60 py-4 pl-12 pr-4 text-white outline-none focus:border-sky-500"
              />

            </div>

            <div className="relative">

              <FiLock
                size={22}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-800/60 py-4 pl-12 pr-12 text-white outline-none focus:border-sky-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>

            </div>

            <div className="flex items-center justify-between text-sm">

              <label className="text-slate-400">
                <input
                  type="checkbox"
                  className="mr-2"
                />
                Remember me
              </label>

              <span className="cursor-pointer text-sky-400">
                Forgot Password?
              </span>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-sky-500 py-4 text-lg font-bold text-white transition hover:opacity-90"
            >
              {loading
                ? "Signing In..."
                : "Sign In →"}
            </button>

          </form>

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-slate-700" />
            <span className="px-4 text-slate-400">
              or
            </span>
            <div className="h-px flex-1 bg-slate-700" />
          </div>

          <button className="w-full rounded-2xl border border-slate-700 py-4 text-white hover:bg-slate-800">
            Continue with Google
          </button>

          <p className="mt-8 text-center text-slate-400">
            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-sky-400"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;