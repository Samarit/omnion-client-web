import { useEffect } from "react"

interface ChatBoxProps {
  position: "left" | "right"
  message: string
  pending?: boolean
  test?: any
}

export function ChatBox(props: ChatBoxProps) {
  useEffect(() => {
    if (String(props.pending) === "false" || String(props.pending) === "true") {
      console.log({ props })
    }
  })

  useEffect(() => {
    console.log("FIST: ", { props })

    return () => {
      console.log("LAST: ", { props })
    }
  }, [])

  return (
    <li
      className='chatbox w-3/4 min-h-11 p-2 border-2 border-solid border-white rounded-sm'
      style={{
        alignSelf: props.position === "left" ? "flex-start" : "flex-end",
      }}>
      {props.pending ? "..." : props.message}
    </li>
  )
}
