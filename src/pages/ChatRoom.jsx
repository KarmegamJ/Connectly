import React, { useEffect, useRef, useState, useContext } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import SideBar from "../components/SideBar";
import ChatHeader from "../components/ChatHeader";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

const ChatRoom = () => {
  const { user } = useContext(AuthContext);
  const { selectedUser, conversationIdFor } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const messagesRef = useRef(null);

  // 🔹 Heartbeat presence (online indicator)
  useEffect(() => {
    if (!user) return;

    const updatePresence = async () => {
      try {
        await setDoc(
          doc(db, "users", user.uid),
          { online: true, lastSeen: serverTimestamp() },
          { merge: true }
        );
      } catch (e) {
        console.error("Presence update failed:", e);
      }
    };

    updatePresence();
    const timer = setInterval(updatePresence, 30000);

    return () => clearInterval(timer);
  }, [user]);

  // 🔹 Set active conversation based on selected user
  useEffect(() => {
    if (!selectedUser || !user) return;
    const conv = conversationIdFor(user.uid, selectedUser.uid);
    setActiveConv(conv);
  }, [selectedUser, user, conversationIdFor]);

  // 🔹 Fetch real-time messages
  useEffect(() => {
    if (!activeConv) return;

    const q = query(
      collection(db, `chats/${activeConv}/messages`),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setMessages(list);
      setTimeout(
        () => messagesRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    });

    return () => unsub();
  }, [activeConv]);

  // 🔹 Send new message
  async function sendMessage(text) {
    if (!activeConv || !selectedUser) return;
    const msg = {
      text,
      from: user.uid,
      to: selectedUser.uid,
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, `chats/${activeConv}/messages`), msg);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex flex-col flex-1">
        <ChatHeader toUser={selectedUser} />

        <main className="flex-1 overflow-y-auto p-4">
          {!selectedUser && (
            <div className="text-center text-gray-500 mt-20">
              Select a user to start chatting
            </div>
          )}
          {messages.map((m) => (
            <ChatMessage key={m.id} msg={m} isOwn={m.from === user.uid} />
          ))}
          <div ref={messagesRef} />
        </main>

        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatRoom;
