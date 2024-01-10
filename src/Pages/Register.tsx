import React from "react";

const Register = (): React.JSX.Element => {
  return (
    <div className="bg-[#a7bcff] h-screen flex items-center justify-center">
      <div className="bg-white py-5 px-16 rounded-xl flex flex-col gap-2.5 items-center">
        <span className="text-[#5d5b8d] font-bold text-2xl">Lama Chat</span>
        <span className="text-[#5d5b8d] text-xs">Register</span>
        <form className="flex flex-col gap-4">
          <input
            className="p-4 border-b border-[#a7bcff] w-64 placeholder-gray-400"
            type="text"
            placeholder="display name"
          />
          <input
            className="p-4 border-b border-[#a7bcff] w-64 placeholder-gray-400"
            type="email"
            placeholder="email"
          />
          <input
            className="p-4 border-b border-[#a7bcff] w-64 placeholder-gray-400"
            type="password"
            placeholder="password"
          />
          <input
            className="p-4 border-b border-[#a7bcff] w-64 placeholder-gray-400"
            type="file"
          />
          <button className="bg-[#7b96ec] text-white p-2.5 font-bold border-none cursor-pointer">
            Sign Up
          </button>
        </form>
        <p className="text-[#5d5b8d] font-xs mt-2.5">
          You do have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Register;
