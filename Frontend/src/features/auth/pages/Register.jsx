import React, { useState } from "react";
import { Link } from "react-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register →", { ...form, isSeller });
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
            New here?
          </p>
          <h1 className="text-[42px] sm:text-[48px] font-bold font-brand text-black leading-[1.15]">
            CREATE ACCOUNT
          </h1>
        </div>

        {/* Form with generous gap for breathing space */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-4"
            >
              Full Name
            </label>
            <div className="flex items-center h-14 px-4 border-b border-[#cfc4c5] focus-within:border-black transition-all">
              <i className="ri-user-line mr-4 text-[20px] text-[#7e7576]" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-[16px] outline-none placeholder-[#cfc4c5]"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-4"
            >
              Email Address
            </label>
            <div className="flex items-center h-14 px-4 border-b border-[#cfc4c5] focus-within:border-black transition-all">
              <i className="ri-mail-line mr-4 text-[20px] text-[#7e7576]" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-[16px] outline-none placeholder-[#cfc4c5]"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <label
              htmlFor="contact"
              className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-4"
            >
              Contact Number
            </label>
            <div className="flex items-center h-14 px-4 border-b border-[#cfc4c5] focus-within:border-black transition-all">
              <i className="ri-phone-line mr-4 text-[20px] text-[#7e7576]" />
              <input
                id="contact"
                name="contact"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={form.contact}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-[16px] outline-none placeholder-[#cfc4c5]"
              />
            </div>
          </div>

          {/* Password */}
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
                autoComplete="new-password"
                placeholder="Create a strong password"
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
                <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"} style={{ fontSize: "22px" }} />
              </button>
            </div>
          </div>

          {/* Seller Mode */}
          <div className="flex flex-col">
            <label
              htmlFor="toggle-is-seller"
              className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-4"
            >
              Account Type
            </label>
            <div className="flex items-center h-14 px-4 border-b border-[#cfc4c5] focus-within:border-black transition-all">
              <i className="ri-store-2-line mr-4 text-[20px] text-[#7e7576]" />
              <span className="flex-1 text-[16px] text-[#1b1c1c]">
                I am a seller
              </span>
              <button
                type="button"
                id="toggle-is-seller"
                role="switch"
                aria-checked={isSeller}
                onClick={() => setIsSeller(!isSeller)}
                className={`relative flex-shrink-0 w-[52px] h-[28px] border transition-all cursor-pointer ${
                  isSeller ? "bg-black border-black" : "bg-[#efeded] border-[#cfc4c5]"
                }`}
                aria-label="Toggle seller mode"
              >
                <span
                  className={`absolute top-[4px] w-[18px] h-[18px] transition-all ${
                    isSeller ? "bg-white left-[28px]" : "bg-[#7e7576] left-[4px]"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="btn-create-account"
            className="w-full h-16 flex items-center justify-center bg-black text-white font-brand font-bold text-[14px] tracking-[0.2em] uppercase hover:bg-[#1b1c1c] active:scale-[0.99] transition-all cursor-pointer"
          >
            Create Account
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-16 text-[16px] leading-[1.5] text-[#4c4546]">
          Already have an account?{" "}
          <Link
            to="/login"
            id="link-to-login"
            className="font-code text-[14px] font-bold tracking-[0.05em] uppercase text-black hover:text-[#D96E54] hover:underline transition-all"
          >
            Sign In
          </Link>
        </p>
      </main>

      <footer className="w-full py-8 border-t border-[#cfc4c5] mt-auto"></footer>
    </div>
  );
};

export default Register;
