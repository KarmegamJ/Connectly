import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatRoom from "./pages/ChatRoom";
import { useAuth } from "./context/AuthContext";
import ChatHeader from "./components/ChatHeader";

export default function App() {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <ChatHeader />
      <Route
        path="/"
        element={user ? <ChatRoom /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
