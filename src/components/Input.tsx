import React from "react";
import Attach from "../images/attach.png";
import Img from "../images/img.png";

const Input = (): React.JSX.Element => {
  return (
    <div className="h-14 bg-white p-2.5 flex items-center justify-between">
      <input
        className="w-full border-none outline-none text-[#2f2d52] text-lg"
        type="text"
        placeholder="Type something..."
      />
      <div className="flex items-center gap-2.5">
        <img className="cursor-pointer" src={Attach} alt="" width={"50px"} />
        <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <img className="cursor-pointer" src={Img} alt="" width={"50px"} />
        </label>
        <button className="border-none py-2.5 px-4 text-white bg-[#8da4f1]">
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
