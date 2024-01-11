import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBI9EykUtI3b5REcNdJsLHsloBNDb-3_TQ",
  authDomain: "chat-typescript-12410.firebaseapp.com",
  projectId: "chat-typescript-12410",
  storageBucket: "chat-typescript-12410.appspot.com",
  messagingSenderId: "61230272120",
  appId: "1:61230272120:web:0126b012b1ba717362678d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
