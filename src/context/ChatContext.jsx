import React, { createContext, useContext, useState } from "react";
const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export function ChatProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <ChatContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </ChatContext.Provider>
  );
}
