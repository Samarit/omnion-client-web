import { AuthResponse } from "@/shared/types"
import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function signIn(login: string, password: string) {
  try {
    const { data } = await axios.post<AuthResponse>(
      `${process.env.API_URL}/auth/login`,
      {
        login,
        password,
      }
    )

    console.log({ data })
    if (!data) throw new Error("Bad signin response")
    if (data.status >= 400) throw new Error(data.message)

    cookies().set("token", data.token)
  } catch (error: any) {
    console.error(error)
    return { error: error.message }
  }
  redirect("/")
}
