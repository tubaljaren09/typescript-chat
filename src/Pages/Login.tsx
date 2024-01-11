import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

type FormLogin = {
  email: string;
  password: string;
};

const Login = (): React.JSX.Element => {
  const [err, setErr] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormLogin>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="bg-[#a7bcff] h-screen flex items-center justify-center">
      <div className="bg-white py-5 px-16 rounded-xl flex flex-col gap-2.5 items-center">
        <span className="text-[#5d5b8d] font-bold text-2xl">Lama Chat</span>
        <span className="text-[#5d5b8d] text-xs">Login</span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-4 border-b border-[#a7bcff] w-64 placeholder-gray-400"
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="p-4 border-b border-[#a7bcff] w-64 placeholder-gray-400"
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="bg-[#7b96ec] text-white p-2.5 font-bold border-none cursor-pointer">
            Sign In
          </button>
          {err && <span>Something went wrong...</span>}
        </form>
        <p className="text-[#5d5b8d] font-xs mt-2.5">
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
