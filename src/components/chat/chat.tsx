"use client"

import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import { ChatBox } from "./chatbox"

const sendSocketMessage = (socket: Socket, message: string) => {
  if (!socket) {
    console.log("no socket to send")
    return
  }
  console.log("message to send", message)
  socket.emit("message", message)
}

interface IMessage {
  text: string
  position: "left" | "right"
}

export default function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const [messageToSend, setMessageToSend] = useState("")
  const [chatHistory, setChatHistory] = useState<IMessage[]>([])
  const [pendingResponse, setPendingResponse] = useState(false)
  const [draftingResponse, setDraftingResponse] = useState<string>("")
  const draftingResponseRef = useRef(draftingResponse)

  useEffect(() => {
    setSocket(
      io("ws://localhost:5000", {
        transports: ["websocket"],
        reconnection: false,
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
        sendSocketMessage(socket, messageToSend)
        setPendingResponse(true)
        console.log("messageToSend", messageToSend)
        setMessageToSend("")
      }
    }

    window.addEventListener("keydown", enterHandler)

    return () => {
      window.removeEventListener("keydown", enterHandler)
    }
  }, [messageToSend])

  useEffect(() => {
    if (!socket) return

    socket.on("connect", () => {
      console.log("socket connected")

      setConnected(true)
    })

    socket.on("response:start", () => {
      console.log("response:start")
      setPendingResponse(false)
    })

    socket.on("response:chunk", (chunk: string) => {
      console.log("response:chunk")
      setDraftingResponse(draftingResponseRef.current + chunk)
      draftingResponseRef.current += chunk
    })

    socket.on("response:end", () => {
      console.log("response:end")
      const response = draftingResponseRef.current
      setChatHistory((prev) => [
        ...prev,
        {
          text: response,
          position: "left",
        },
      ])

      setDraftingResponse("")
      draftingResponseRef.current = ""
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

      <ul className='flex flex-col w-full gap-2'>
        {chatHistory.map((msg, i) => (
          <ChatBox position={msg.position} message={msg.text} key={i}></ChatBox>
        ))}

        {(pendingResponse || draftingResponse) && (
          <ChatBox
            position={"left"}
            message={draftingResponse}
            pending={pendingResponse}
          />
        )}
      </ul>

      <Input
        value={messageToSend}
        onChange={(e) => {
          setMessageToSend(e.target.value)
        }}
        placeholder='Enter message...'
      />

      <Button
        variant={"outline"}
        onClick={() => {
          if (!messageToSend || !socket) return

          sendSocketMessage(socket, messageToSend)
          setPendingResponse(true)
          setMessageToSend("")
        }}>
        Send
      </Button>
    </div>
  )
}
