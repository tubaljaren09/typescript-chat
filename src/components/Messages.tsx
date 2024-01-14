import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = (): React.JSX.Element => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const user = useContext(ChatContext);

  if (!user) {
    return <div>Loading or fallback content...</div>;
  }

  const { data } = user;

  // useEffect(() => {
  //   const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
  //     doc.exists() && setMessages(doc.data().messages as DocumentData[]);
  //   });
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages((doc.data().messages as DocumentData[]) || []);
      }
    });

    return () => unsub();
  }, [data.chatId]);

  console.log(messages);
  return (
    <div className="bg-[#ddddf7] p-2.5 h-[calc(100%-112px)] overflow-y-scroll">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
