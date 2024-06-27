interface ChatBoxProps {
  position: "left" | "right"
  message: string
  pending?: boolean
}

export function ChatBox(props: ChatBoxProps) {
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
