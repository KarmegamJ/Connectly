import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import UserCard from "./UserCard";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

export default function Sidebar() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const { selectedUser, setSelectedUser } = useChat();

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((doc) => list.push({ uid: doc.id, ...doc.data() }));
      setUsers(list.filter((u) => u.uid !== (user && user.uid)));
    });
    return () => unsub();
  }, [user]);

  return (
    <aside className="sidebar flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Connectly</h2>
      </div>
      <div className="flex-1 overflow-auto">
        {users.map((u) => (
          <UserCard
            key={u.uid}
            user={u}
            onClick={() => setSelectedUser(u)}
            active={selectedUser?.uid === u.uid}
          />
        ))}
      </div>
    </aside>
  );
}
