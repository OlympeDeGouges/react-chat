// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDTJh9LAwfDEuzGA1nICARAYi5qzu9KX_k",
  authDomain: "react-chat-706d2.firebaseapp.com",
  projectId: "react-chat-706d2",
  storageBucket: "react-chat-706d2.firebasestorage.app",
  messagingSenderId: "51698066082",
  appId: "1:51698066082:web:5bcb94b9be38e3c7b5edfb",
  measurementId: "G-2ND9EKKLSP"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Jetzt korrekt exportieren:
export { auth, provider, db, storage };