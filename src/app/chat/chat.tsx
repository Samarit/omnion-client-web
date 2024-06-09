"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export default function Chat() {
  const [connected, setConnected] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    const socket = io("ws://localhost:5000", {
      path: "/",
    })

    socket.on("connect", () => {
      console.log("socket connected")
      setConnected(true)
    })

    socket.on("message", (message: any) => {
      setText(message)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className='chat'>
      <h3>{connected ? "connected!" : "connecting..."}</h3>
      <span>{text}</span>
    </div>
  )
}
