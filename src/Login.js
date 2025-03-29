// src/Login.js
import React, { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error("Login error:", error);
        alert(error.message);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, {
          displayName: username,
        });
      } catch (error) {
        console.error("Registration error:", error);
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-pink-900 flex flex-col items-center justify-center text-white font-mono">
      <div className="bg-black/60 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center tracking-wider">
          Retro Chat Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          )}
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 py-2 rounded font-bold tracking-wider transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            {isLogin ? "No account yet?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="underline hover:text-pink-300 transition"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
      <footer className="mt-8 text-xs text-gray-300">
        &copy; {new Date().getFullYear()} CCOS Chat by Tati
      </footer>
    </div>
  );
}

export default Login;
