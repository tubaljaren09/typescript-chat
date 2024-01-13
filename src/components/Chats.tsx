import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

type UserInfo = {
  displayName: string;
  photoURL: string;
  uid: string;
};

type ChatType = {
  date: Timestamp;
  userInfo: UserInfo;
};

const Chats = (): React.JSX.Element => {
  const [chats, setChats] = useState<ChatType[]>([]);

  const { currentUser } = useContext(AuthContext);

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
  return (
    <div>
      {Object.entries(chats)?.map((chat) => (
        <div
          className="flex items-center p-2.5 gap-2.5 text-white cursor-pointer hover:bg-[#2f2d52]"
          key={chat[0]}
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
            <p className="text-sm text-gray-50">Last Messsaage</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
