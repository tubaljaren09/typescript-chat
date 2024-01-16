import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Add from "../images/addAvatar.png";

type Form = {
  displayName: string;
  email: string;
  password: string;
};

const Register = (): React.JSX.Element => {
  const [err, setErr] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>();
  const [formData, setFormData] = useState<Form>({
    displayName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileSelect = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { displayName, email, password } = formData;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (typeof file === "undefined") return;
      const storage = getStorage();
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
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
          setErr(true);
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="bg-[#a7bcff] h-screen flex items-center justify-center">
      <div className="bg-white py-5 px-16 rounded-xl flex flex-col gap-2.5 items-center">
        <span className="text-[#5d5b8d] font-bold text-2xl">Yay Chat</span>
        <span className="text-[#5d5b8d] text-xs">Register</span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-4 border-b border-[#a7bcff] w-64 placeholder-gray-400"
            type="text"
            placeholder="display name"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
          <input
            className="p-4 border-b border-[#a7bcff] w-64 placeholder-gray-400"
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="p-4 border-b border-[#a7bcff] w-64 placeholder-gray-400"
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="p-4 border-b border-[#a7bcff] w-64 placeholder-gray-400"
            style={{ display: "none" }}
            type="file"
            id="file"
            name="file"
            onChange={handleFileSelect}
          />
          <label
            className="flex items-center gap-2.5 text-[#8da4f1] text-xs cursor-pointer"
            htmlFor="file"
          >
            <img src={Add} alt="" width={"32px"} />
            <span>Add an avatar</span>
          </label>
          <button className="bg-[#7b96ec] text-white p-2.5 font-bold border-none cursor-pointer">
            Sign Up
          </button>
          {err && <span>Something went wrong...</span>}
        </form>
        <p className="text-[#5d5b8d] font-xs mt-2.5">
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
