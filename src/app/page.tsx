import Image from "next/image"
import styles from "./page.module.css"

export default function Home() {
  return (
    <>
      <header>
        <h1>Omnion</h1>
      </header>
      <main className={styles.main}></main>
    </>
  )
}
