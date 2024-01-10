import React from "react";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";

const Chat = (): React.JSX.Element => {
  return (
    <div className="flex-[2_2_0%]">
      <div className="h-14 bg-[#5d5b8d] flex items-center justify-between p-2.5 text-gray-300">
        <span>Jane</span>
        <div className="flex gap-2.5">
          <img className="cursor-pointer h-6" src={Cam} alt="" />
          <img className="cursor-pointer h-6" src={Add} alt="" />
          <img className="cursor-pointer h-6" src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
