import React from "react";

export default function UserCard({ user, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`user-card ${active ? "bg-gray-100" : ""}`}
    >
      <img
        src={
          user.photoURL ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${
            user.displayName || user.email
          }`
        }
        alt="avatar"
      />
      <div>
        <div className="font-medium">{user.displayName || user.email}</div>
        <div className="text-sm text-gray-500">
          {user.online ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
}
