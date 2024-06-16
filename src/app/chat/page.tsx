import { io } from "socket.io-client"
import Chat from "./chat"

export default function ChatPage() {
  "use client"

  return (
    <section className='chatroom'>
      <h1>Chat</h1>
      <Chat />
    </section>
  )
}
