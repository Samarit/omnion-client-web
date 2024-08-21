"use server"

import { fetchApi } from "@/shared/api"
import { ApiResponse } from "@/shared/types"
import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function register(
  login: string,
  password: string
): Promise<string> {
  try {
    const response = await fetchApi<{ token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    })

    const { success, status, message, data } = response

    if (!data || !success) throw new Error(message!)

    if (data.token) {
      cookies().set("token", data.token)
    } else {
      console.error(`No token provided for ${login}`)
    }
  } catch (error: any) {
    console.log(error.message)
    return error.message
  }
  redirect("/")
}
