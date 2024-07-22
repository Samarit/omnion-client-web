"use server"

import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface ApiResponse {
  status: number
  message: string
}

interface AuthResponse extends ApiResponse {
  token: string
}

export async function register(login: string, password: string) {
  try {
    const res = await axios.post<AuthResponse>(
      `${process.env.API_URL}/auth/register`,
      {
        login,
        password,
      }
    )

    if (res.data.status !== 200) throw new Error(res.data.message)
    if (!res.data.token) throw new Error("No token provided")

    cookies().set("token", res.data.token)
    console.log("TOKEN SET: ", res.data.token)
  } catch (error) {
    console.error(error)
  }

  redirect("/")
}
