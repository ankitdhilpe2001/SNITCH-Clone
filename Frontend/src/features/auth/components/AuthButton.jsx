import React from "react";

const AuthButton = ({ type = "button", onClick, className = "", children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-16 flex items-center justify-center bg-black text-white font-brand font-bold text-[14px] tracking-[0.2em] uppercase hover:bg-[#1b1c1c] active:scale-[0.99] transition-all cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default AuthButton;
