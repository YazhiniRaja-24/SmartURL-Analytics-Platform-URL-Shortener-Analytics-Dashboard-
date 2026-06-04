import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineArrowRight,
} from "react-icons/hi";

import { useAuth } from "../context/AuthContext";

import bgImage from "../assets/login-bg.jpg";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
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

      await register(formData);

      toast.success(
        "Registration Successful "
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020B2D]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex">

          <img
            src={bgImage}
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover scale-110 brightness-125 contrast-110"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 flex flex-col justify-center px-14 text-white">

            <div className="mb-10 flex items-center gap-4">

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xl">
                
              </div>

              <h1 className="text-6xl font-bold">
                SmartURL
              </h1>

            </div>

            <h2 className="text-7xl font-extrabold leading-tight">

              Join.
              <br />

              Create.
              <br />

              <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">
                Grow.
              </span>

            </h2>

            <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-sky-500" />

            <p className="mt-8 max-w-lg text-3xl text-slate-200">
              Create branded short links and
              unlock powerful analytics.
            </p>

            <div className="mt-20 grid grid-cols-3 gap-8">

              <div>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                  🔗
                </div>

                <h4 className="text-2xl font-bold">
                  Create
                </h4>

                <p className="text-slate-300">
                  Smart links
                </p>
              </div>

              <div>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                  📊
                </div>

                <h4 className="text-2xl font-bold">
                  Analyze
                </h4>

                <p className="text-slate-300">
                  Real-time stats
                </p>
              </div>

              <div>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                  🛡️
                </div>

                <h4 className="text-2xl font-bold">
                  Secure
                </h4>

                <p className="text-slate-300">
                  Enterprise ready
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8">

          <div className="w-full max-w-xl rounded-[36px] border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">

            <div className="mb-8 text-center">

              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5">
                
              </div>

              <h1 className="text-6xl font-bold text-white">
                Create Account
              </h1>

              <p className="mt-3 text-2xl text-slate-400">
                Start using SmartURL today
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}
              <div className="relative">

                <HiOutlineUser
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={24}
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-5 pl-14 pr-4 text-lg text-white outline-none"
                />

              </div>

              {/* EMAIL */}
              <div className="relative">

                <HiOutlineMail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={24}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-5 pl-14 pr-4 text-lg text-white outline-none"
                />

              </div>

              {/* PASSWORD */}
              <div className="relative">

                <HiOutlineLockClosed
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={24}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-5 pl-14 pr-4 text-lg text-white outline-none"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-sky-500 py-5 text-xl font-semibold text-white transition hover:opacity-90"
              >
                {loading
                  ? "Creating Account..."
                  : "Register"}

                <HiOutlineArrowRight
                  size={24}
                />
              </button>

            </form>

            <p className="mt-8 text-center text-slate-400">

              Already have an account?

              <Link
                to="/login"
                className="ml-2 text-sky-400 hover:text-sky-300"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;