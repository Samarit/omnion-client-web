import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function signIn(login: string, password: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    })

    if (!response.ok) throw new Error("Bad signin response")

    const data = await response.json()

    if (!data.token) throw new Error("No token provided")

    cookies().set("token", data.token)
  } catch (error) {
    console.error(error)
    return {
      message: "Something went wrong",
    }
  }
  return redirect("/")
}
