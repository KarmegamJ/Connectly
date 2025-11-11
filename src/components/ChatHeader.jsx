import React from 'react'
import { useAuth } from '../context/AuthContext'


export default function ChatHeader({ toUser }){
const { logout, user } = useAuth()
return (
<div className="chat-header">
<div className="flex items-center gap-3">
{toUser ? (
<>
<img src={toUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${toUser.displayName||toUser.email}`} className="w-10 h-10 rounded-full" />
<div>
<div className="font-semibold">{toUser.displayName || toUser.email}</div>
<div className="text-sm text-gray-500">{toUser.online ? 'Online' : 'Offline'}</div>
</div>
</>
) : (
<div className="text-gray-500">Select a user to start chat</div>
)}
</div>


<div className="flex items-center gap-3">
<div className="text-sm text-gray-600">{user?.displayName}</div>
<button onClick={logout} className="px-3 py-1 rounded bg-red-50 text-red-600 border">Logout</button>
</div>
</div>
)
}



