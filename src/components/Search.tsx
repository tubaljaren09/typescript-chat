import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

type UserType = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};

type User = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const Search = (): React.JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState<boolean>(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data() as UserType;
        setUser({ user: data, setUser });
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = (e: React.KeyboardEvent) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // Check if chat exists
    if (currentUser && user) {
      const combinedId =
        currentUser?.uid > user?.user.uid
          ? currentUser.uid + user?.user.uid
          : user?.user.uid + currentUser?.uid;
      try {
        const chatDocRef = doc(db, "chats", combinedId);
        const res = await getDoc(chatDocRef);

        if (!res.exists()) {
          // create chat
          await setDoc(chatDocRef, { message: [] });

          // create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.user.uid,
              displayName: user.user.displayName,
              photoURL: user.user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", user.user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {
        setErr(true);
      }
      setUser(null);
      setUsername("");
    }
  };

  return (
    <div className="border-solid border-b-2 border-gray-500">
      <div className="p-2.5">
        <input
          className="bg-transparent border-none text-white outline-none"
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {err && <span>Something went wrong...</span>}
      {user && (
        <div
          className="flex items-center p-2.5 gap-2.5 text-white cursor-pointer hover:bg-[#2f2d52]"
          onClick={handleSelect}
        >
          <img
            className="w-14 h-14 rounded-[50%] object-cover"
            src={user?.user.photoURL}
            alt=""
          />
          <div>
            <span>{user?.user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
