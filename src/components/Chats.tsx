import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

type UserInfo = {
  displayName: string;
  photoURL: string;
  uid: string;
};

type MessageType = {
  text: string;
};

type ChatType = {
  date: Timestamp;
  userInfo: UserInfo;
  lastMessage: MessageType;
};

const Chats = (): React.JSX.Element => {
  const [chats, setChats] = useState<ChatType[]>([]);

  const { currentUser } = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  if (!chatContext) {
    return <div>Loading or fallback content...</div>;
  }
  const { dispatch } = chatContext;

  useEffect(() => {
    try {
      if (currentUser?.uid) {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser?.uid),
          (doc) => {
            setChats(doc.data() as ChatType[]);
          }
        );
        return () => unsub();
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentUser?.uid]);

  console.log(chats);

  const handleSelect = (u: UserInfo) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => {
          const dateA = a[1].date ? a[1].date.toMillis() : 0; // Convert Firestore Timestamp to milliseconds
          const dateB = b[1].date ? b[1].date.toMillis() : 0;

          return dateB - dateA;
        })
        .map((chat) => (
          <div
            className="flex items-center p-2.5 gap-2.5 text-white cursor-pointer hover:bg-[#2f2d52]"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              className="w-14 h-14 rounded-[50%] object-cover"
              src={chat[1].userInfo.photoURL}
              alt=""
            />
            <div>
              <span className="text-lg font-medium">
                {chat[1].userInfo.displayName}
              </span>
              <p className="text-sm text-gray-50">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
