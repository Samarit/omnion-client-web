import Chat from "@/components/chat/chat"

export default function Home() {
  return (
    <>
      <header>
        <h1 className='text-center text-4xl'>Omnion</h1>
      </header>
      <main className={"m-2"}>
        <Chat />
      </main>
    </>
  )
}
