import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Home = (): React.JSX.Element => {
  return (
    <div className="bg-[#a7bcff] h-screen flex items-center justify-center">
      <div className="border-solid border-2 border-white rounded-xl w-[65%] h-[80%] flex overflow-hidden corsair:w-full">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
