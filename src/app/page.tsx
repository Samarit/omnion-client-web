import Image from "next/image"
import styles from "./page.module.css"
import Chat from "@/components/chat/chat"

export default function Home() {
  return (
    <>
      <header>
        <h1 className='text-center text-4xl'>Omnion</h1>
      </header>
      <main className={styles.main}>
        <Chat />
      </main>
    </>
  )
}
