// src/App.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./Login";
import Chat from "./Chat";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  // Falls nicht eingeloggt, zeige Login-Seite
  if (!user) {
    return <Login />;
  }

  // Falls eingeloggt, zeige Chat
  return <Chat />;
}

export default App;
