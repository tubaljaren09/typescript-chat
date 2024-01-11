import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = (): React.JSX.Element => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex items-center bg-[#2f2d52] h-14 p-2.5 justify-between text-[#ddddf7]">
      <span className="font-bold">Lama Chat</span>
      <div className="flex items-center gap-2.5">
        <img
          className="bg-[#ddddf7] rounded-[50%] object-cover"
          src={currentUser?.photoURL || undefined}
          alt=""
          width={"24px"}
          height={"24px"}
        />
        <span>{currentUser?.displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="bg-[#5d5b8d] text-[#ddddf7] text-xs border-none cursor-pointer"
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
