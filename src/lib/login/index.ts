import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function signIn(login: string, password: string) {
  console.log("login", login, "password", password)
  console.log(JSON.stringify({ login, password }))
  const response = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  })

  if (!response.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const data = await response.json()
  console.log({ data })

  if (!data.token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 })
  }

  cookies().set("token", data.token)

  return redirect("/")
}
