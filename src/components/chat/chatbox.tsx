export default function ChatBox(props: {
  position: "left" | "right"
  message: string
}) {
  return (
    <li
      className='chatbox w-3/4 p-2 border-2 border-solid border-white rounded-sm'
      style={{
        alignSelf: props.position === "left" ? "flex-start" : "flex-end",
      }}>
      {props.message}
    </li>
  )
}
