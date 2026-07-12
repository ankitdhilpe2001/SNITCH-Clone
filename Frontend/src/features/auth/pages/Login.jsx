import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import AuthButton from "../components/AuthButton.jsx";

const Login = () => {
  const [loginType, setLoginType] = useState("email"); // "email" | "contact"
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ identifier: "", password: "" });

  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload =
        loginType === "email"
          ? { email: form.identifier, password: form.password }
          : { contact: form.identifier, password: form.password };

      const result = await handleLogin(payload);

      if (!result?.error) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f9] text-[#1b1c1c] font-body flex flex-col items-center px-6 md:px-16">
      {/* Header */}
      <header className="w-full py-16 border-b border-[#cfc4c5] text-center">
        <span className="text-[22px] font-black tracking-[0.35em] font-brand uppercase text-black">
          SNITCH
        </span>
      </header>

      {/* Main Container - max-w-480px */}
      <main className="flex-1 w-full max-w-[480px] py-20 md:py-24 flex flex-col justify-center gap-8">
        {/* Title */}
        <div className="mb-10 text-left flex flex-col gap-8">
          <p className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase">
            Welcome back
          </p>
          <h1 className="text-[42px] sm:text-[48px] font-bold font-brand text-black leading-none">
            SIGN IN
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="mb-14">
          <p className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-6">
            Login with
          </p>
          <div className="flex border-b border-[#cfc4c5]">
            <button
              type="button"
              id="toggle-email"
              onClick={() => {
                setLoginType("email");
                setForm({ identifier: "", password: "" });
              }}
              className={`flex-1 py-4 font-code text-[12px] tracking-[0.05em] uppercase border-b-2 text-center transition-all cursor-pointer ${
                loginType === "email"
                  ? "border-black text-black font-bold"
                  : "border-transparent text-[#7e7576]"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              id="toggle-contact"
              onClick={() => {
                setLoginType("contact");
                setForm({ identifier: "", password: "" });
              }}
              className={`flex-1 py-4 font-code text-[12px] tracking-[0.05em] uppercase border-b-2 text-center transition-all cursor-pointer ${
                loginType === "contact"
                  ? "border-black text-black font-bold"
                  : "border-transparent text-[#7e7576]"
              }`}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Form with generous gap for breathing space */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
          {/* Identifier Input */}
          <div className="flex flex-col">
            <label
              htmlFor="identifier"
              className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-4"
            >
              {loginType === "email" ? "Email Address" : "Contact Number"}
            </label>
            <div className="flex items-center h-14 px-4 border-b border-[#cfc4c5] focus-within:border-black transition-all">
              <input
                id="identifier"
                name="identifier"
                type={loginType === "email" ? "email" : "tel"}
                autoComplete={loginType === "email" ? "email" : "tel"}
                placeholder={
                  loginType === "email" ? "you@example.com" : "+91 98765 43210"
                }
                value={form.identifier}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-[16px] outline-none placeholder-[#cfc4c5]"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-4"
            >
              Password
            </label>
            <div className="flex items-center h-14 px-4 border-b border-[#cfc4c5] focus-within:border-black transition-all">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-[16px] outline-none placeholder-[#cfc4c5]"
              />
              <button
                type="button"
                id="toggle-password-visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-[#7e7576] hover:text-black transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-[22px] h-[22px]"
                  aria-hidden="true"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              id="btn-forgot-password"
              className="font-code text-[14px] tracking-[0.05em] uppercase text-[#7e7576] hover:text-black hover:underline transition-all cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="button"
            onClick={() => (window.location.href = "/api/auth/google")}
            className="w-full h-14 flex items-center justify-center gap-3 border border-[#cfc4c5] bg-white text-[#1b1c1c] font-code text-[13px] font-semibold tracking-[0.12em] uppercase hover:border-black hover:bg-[#faf7f7] transition-all cursor-pointer"
          >
            <i className="ri-google-fill text-lg" aria-hidden="true"></i>
            <span>Sign In with Google</span>
          </button>

          {/* Submit Button */}
          <AuthButton type="submit" id="btn-sign-in" className="mt-4">
            Sign In
          </AuthButton>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-16 text-[16px] leading-[1.5] text-[#4c4546]">
          Don't have an account?{" "}
          <Link
            to="/"
            id="link-to-register"
            className="font-code text-[14px] font-bold tracking-[0.05em] uppercase text-black hover:text-[#D96E54] hover:underline transition-all"
          >
            Register
          </Link>
        </p>
      </main>

      <footer className="w-full py-8 border-t border-[#cfc4c5] mt-auto"></footer>
    </div>
  );
};

export default Login;
