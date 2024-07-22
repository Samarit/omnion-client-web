"use server"

import { AuthResponse } from "@/shared/types"
import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function register(login: string, password: string) {
  try {
    const { data } = await axios.post<AuthResponse>(
      `${process.env.API_URL}/auth/register`,
      {
        login,
        password,
      }
    )

    if (data.status !== 200) throw new Error(data.message)
    if (!data.token) throw new Error("No token provided")

    cookies().set("token", data.token)
  } catch (error) {
    console.error(error)
  }

  redirect("/")
}
