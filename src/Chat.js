// src/Chat.js
import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Nachrichten in Echtzeit laden
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Nachricht senden
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName || "Anonymous",
      });
    } catch (error) {
      console.error("Fehler beim Speichern in Firestore:", error);
      alert("Fehler beim Senden der Nachricht.");
    }

    setMessage("");
    setShowEmojiPicker(false);
  };

  // Emoji auswählen
  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
  };

  // Ausloggen
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-pink-900 flex flex-col text-white">
      {/* Header */}
      <header className="bg-black/60 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold tracking-wider">
            Retro Chat
          </h1>
          <button
            onClick={handleSignOut}
            className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-sm font-semibold transition"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Hauptbereich */}
      <main className="flex-grow container mx-auto p-4">
        <div className="bg-black/60 rounded-lg shadow-xl flex flex-col h-full">
          {/* Nachrichtenliste */}
          <div className="flex-1 overflow-y-scroll p-4">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-4">
                <p className="text-pink-400 text-sm mb-1">
                  {msg.displayName}
                </p>
                <div className="bg-gray-800 text-white p-3 rounded-lg w-fit max-w-xl">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Emoji-Picker */}
          {showEmojiPicker && (
            <div className="p-2 border-t border-pink-600 bg-black/70">
              <Picker data={emojiData} onEmojiSelect={handleEmojiSelect} theme="dark" />
            </div>
          )}

          {/* Eingabefeld */}
          <form
            onSubmit={sendMessage}
            className="flex items-center border-t border-pink-600 p-3 bg-black/60"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-gray-800 text-white px-3 py-2 rounded-l focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 transition"
            >
              😊
            </button>
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-r transition"
            >
              Send
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/60 text-center py-2 text-xs">
        <p className="opacity-80">
          &copy; {new Date().getFullYear()} CCOS Chat. All rights reserved by Tati
        </p>
      </footer>
    </div>
  );
}

export default Chat;
