import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Chats from "../components/Chats";

const Sidebar = (): React.JSX.Element => {
  return (
    <div className="flex-1 bg-[#3e3c61]">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
