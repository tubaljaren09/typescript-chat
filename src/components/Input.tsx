import React, { useContext, useState } from "react";
import Attach from "../images/attach.png";
import Img from "../images/img.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = (): React.JSX.Element => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const { currentUser } = useContext(AuthContext);
  const user = useContext(ChatContext);

  if (!user) {
    return <div>Loading or fallback content...</div>;
  }

  const { data } = user;

  const handleFileSelect = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    };
    setImg(target.files[0]);
  };

  const handleSend = async () => {
    if (img) {
      const imageUuid = uuid();
      const storageRef = ref(storage, imageUuid);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // setErr(true);
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }

    if (currentUser?.uid) {
      await updateDoc(doc(db, "userChats", currentUser?.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="h-14 bg-white p-2.5 flex items-center justify-between">
      <input
        className="w-full border-none outline-none text-[#2f2d52] text-lg"
        type="text"
        placeholder="Type something..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        value={text}
      />
      <div className="flex items-center gap-2.5">
        <img className="cursor-pointer" src={Attach} alt="" width={"50px"} />
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <label htmlFor="file">
          <img className="cursor-pointer" src={Img} alt="" width={"50px"} />
        </label>
        <button
          className="border-none py-2.5 px-4 text-white bg-[#8da4f1]"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
