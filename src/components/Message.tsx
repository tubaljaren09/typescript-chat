import { DocumentData } from "firebase/firestore";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

type MessageProp = {
  message: DocumentData;
};

const Message = ({ message }: MessageProp): React.JSX.Element => {
  const { currentUser } = useContext(AuthContext);
  const user = useContext(ChatContext);

  const ref = useRef<HTMLDivElement | null>(null);

  if (!user) {
    return <div>Loading or fallback content...</div>;
  }

  const { data } = user;

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <>
      {message.senderId === currentUser?.uid ? (
        <div ref={ref} className="flex flex-row-reverse gap-5 mb-5">
          <div className="flex flex-col text-gray-500 font-light">
            <img
              className="w-10 h-10 rounded-[50%] object-cover"
              src={currentUser?.photoURL ?? undefined}
            />
          </div>
          <div className="max-w-[80%] flex flex-col gap-2.5 items-end">
            <p className="bg-[#8da4f1] text-white py-2.5 px-5 rounded-tl-xl rounded-br-xl rounded-bl-xl max-w-max">
              {message.text}
            </p>
            {message.img && (
              <img className="w-[50%]" src={message.img} alt="" />
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-5 mb-5">
          <div className="flex flex-col text-gray-500 font-light">
            <img
              className="w-10 h-10 rounded-[50%] object-cover"
              src={data.user.photoURL}
              alt=""
            />
          </div>
          <div className="max-w-[80%] flex flex-col gap-2.5">
            <p className="bg-white py-2.5 px-5 rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-max">
              {message.text}
            </p>
            {message.img && (
              <img className="w-[50%]" src={message.img} alt="" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
