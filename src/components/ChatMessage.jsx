import React from 'react'


export default function ChatMessage({ msg, isOwn }){
const time = msg.createdAt && msg.createdAt.toDate ? msg.createdAt.toDate().toLocaleTimeString() : ''
return (
<div className={`chat-message ${isOwn? 'own':''}`}>
<div className="bubble">
<div className="text">{msg.text}</div>
<div className="text-xs text-gray-400 mt-1 text-right">{time}</div>
</div>
</div>
)
}