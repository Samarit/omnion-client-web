"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export default function Chat() {
  const [connected, setConnected] = useState(false)
  const [chatHistory, setChatHistory] = useState<string[]>([])

  useEffect(() => {
    const socket = io("ws://localhost:5000", {
      transports: ["websocket"],
    })

    socket.on("connect", () => {
      console.log("socket connected")
      setConnected(true)
    })

    socket.on("message", (message: any) => {
      setChatHistory((prev) => [...prev, message])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className='chat'>
      <h3>{connected ? "connected!" : "connecting..."}</h3>
      <ul>
        {chatHistory.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  )
}
