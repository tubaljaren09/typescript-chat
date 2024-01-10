import React from "react";
import Message from "./Message";

const Messages = (): React.JSX.Element => {
  return (
    <div className="bg-[#ddddf7] p-2.5 h-[calc(100%-112px)] overflow-y-scroll">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
