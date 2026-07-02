import React, { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [loginType, setLoginType] = useState("email"); // "email" | "contact"
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login →", { loginType, ...form });
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
      <main className="flex-1 w-full max-w-[480px] py-20 md:py-24 flex flex-col justify-center">
        {/* Title */}
        <div className="mb-24 text-left">
          <p className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-8">
            Welcome back
          </p>
          <h1 className="text-[42px] sm:text-[48px] font-bold font-brand text-black leading-[1.15]">
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
              className={`flex-1 py-4 font-code text-[12px] tracking-[0.05em] uppercase border-b-2 text-center transition-all cursor-pointer ${loginType === "email"
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
              className={`flex-1 py-4 font-code text-[12px] tracking-[0.05em] uppercase border-b-2 text-center transition-all cursor-pointer ${loginType === "contact"
                ? "border-black text-black font-bold"
                : "border-transparent text-[#7e7576]"
                }`}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Form with generous gap for breathing space */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Identifier Input */}
          <div className="flex flex-col">
            <label
              htmlFor="identifier"
              className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-4"
            >
              {loginType === "email" ? "Email Address" : "Contact Number"}
            </label>
            <div className="flex items-center h-14 px-4 border-b border-[#cfc4c5] focus-within:border-black transition-all">
              <i
                className={`${loginType === "email" ? "ri-mail-line" : "ri-phone-line"} mr-4 text-[20px] text-[#7e7576]`}
              />
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
              <i className="ri-lock-line mr-4 text-[20px] text-[#7e7576]" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
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
                <i
                  className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}
                  style={{ fontSize: "22px" }}
                />
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="font-code text-[14px] tracking-[0.05em] uppercase text-[#7e7576] hover:text-black hover:underline transition-all cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="btn-sign-in"
            className="w-full h-16 flex items-center justify-center bg-black text-white font-brand font-bold text-[14px] tracking-[0.2em] uppercase hover:bg-[#1b1c1c] active:scale-[0.99] transition-all cursor-pointer mt-4"
          >
            Sign In
          </button>
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
