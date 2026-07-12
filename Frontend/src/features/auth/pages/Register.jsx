import React, { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import AuthButton from "../components/AuthButton.jsx";

const Register = () => {
  const { handleRegister,  } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
  });

  //
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // sending the form object to the handleRegsiter function which expects obj
    try {
      const payload = {
        fullname: form.fullname,
        email: form.email,
        contact: form.contact,
        password: form.password,
        isSeller,
      };
      await handleRegister(payload);
      navigate("/home");
    } catch (error) {
      console.log("message : ",error.message)
      console.log(error)
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
        <div className="mb-10 -mt-8 text-left flex flex-col gap-8">
          <p className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase">
            New here?
          </p>
          <h1 className="text-[42px] sm:text-[48px] font-bold font-brand text-black leading-none">
            CREATE ACCOUNT
          </h1>
        </div>

        {/* Form with generous gap for breathing space */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
          {/* Full Name */}
          <div className="flex flex-col">
            <label
              htmlFor="fullname"
              className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-4"
            >
              Full Name
            </label>
            <div className="flex items-center h-14 px-4 border-b border-[#cfc4c5] focus-within:border-black transition-all">
              <input
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={form.fullname}
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

          {/* Seller Mode */}
          <div className="flex flex-col">
            <label
              htmlFor="toggle-is-seller"
              className="font-code text-[12px] tracking-[0.05em] text-[#7e7576] uppercase mb-4"
            >
              Account Type
            </label>
            <div className="flex items-center h-14 px-4 border-b border-[#cfc4c5] focus-within:border-black transition-all">
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

          <button
            type="button"
            onClick={() => (window.location.href = "/api/auth/google")}
            className="w-full h-14 flex items-center justify-center gap-3 border border-[#cfc4c5] bg-white text-[#1b1c1c] font-code text-[13px] font-semibold tracking-[0.12em] uppercase hover:border-black hover:bg-[#faf7f7] transition-all cursor-pointer"
          >
            <i className="ri-google-fill text-lg" aria-hidden="true"></i>
            <span>Sign In with Google</span>
          </button>

          {/* Submit Button */}
          <AuthButton type="submit" id="btn-create-account">
            Create Account
          </AuthButton>
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
