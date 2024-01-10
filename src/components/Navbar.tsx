import React from "react";

const Navbar = (): React.JSX.Element => {
  return (
    <div className="flex items-center bg-[#2f2d52] h-14 p-2.5 justify-between text-[#ddddf7]">
      <span className="font-bold">Lama Chat</span>
      <div className="flex items-center gap-2.5">
        <img
          className="bg-[#ddddf7] rounded-[50%] object-cover"
          src="https://images.pexels.com/photos/15556345/pexels-photo-15556345/free-photo-of-woman-with-a-long-braid-sanding-in-the-field.jpeg"
          alt=""
          width={"24px"}
          height={"24px"}
        />
        <span>John</span>
        <button className="bg-[#5d5b8d] text-[#ddddf7] text-xs border-none cursor-pointer">
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
