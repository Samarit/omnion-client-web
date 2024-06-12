"use client"

import { useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

const sendSocketMessage = (socket: Socket, message: string) => {
  if (!socket) {
    console.log("no socket to send")
    return
  }
  console.log("message to send", message)
  socket.emit("message", message)
}

export default function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<string[][]>([])

  useEffect(() => {
    setSocket(
      io("ws://localhost:5000", {
        transports: ["websocket"],
      })
    )
  }, [])

  useEffect(() => {
    const enterHandler = (e: KeyboardEvent) => {
      if (!socket) {
        console.log("no socket in handler")
        return
      }
      if (e.key === "Enter") {
        sendSocketMessage(socket, message)
        console.log("message", message)
        setMessage("")
      }
    }

    window.addEventListener("keydown", enterHandler)

    return () => {
      window.removeEventListener("keydown", enterHandler)
    }
  }, [message])

  useEffect(() => {
    if (!socket) return

    socket.on("connect", () => {
      console.log("socket connected")

      setConnected(true)
    })

    socket.on("response:start", () => {
      console.log("response:start")
      setChatHistory((prev) => [...prev, []])
    })

    socket.on("response:chunk", (message: any) => {
      console.log("response:chunk")
      setChatHistory((prev) => {
        const newHistory = [...prev]
        newHistory[newHistory.length - 1].push(message)
        return newHistory
      })
    })

    socket.on("disconnect", () => {
      console.log("socket disconnected")
      setConnected(false)
    })

    return () => {
      socket.disconnect()
    }
  }, [socket])

  return (
    <div className='chat'>
      <h3>{connected ? "connected!" : "connecting..."}</h3>
      <ul>
        {chatHistory.map((message, i) => (
          <li key={i} style={{ border: "1px solid white" }}>
            {message.join("")}
          </li>
        ))}
      </ul>
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
        }}
      />
      <button
        onClick={() => {
          if (!socket) return
          sendSocketMessage(socket, message)
        }}>
        Send
      </button>
    </div>
  )
}
