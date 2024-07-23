"use server"

import { ApiResponse } from "@/shared/types"
import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function register(login: string, password: string) {
  try {
    const response = await axios.post<ApiResponse<{ token: string }>>(
      `${process.env.API_URL}/auth/login`,
      {
        login,
        password,
      }
    )

    const { success, status, message, data } = response.data
    console.log({ data })

    if (!data) throw new Error(message!)
    if (!success) throw new Error(message!)

    if (data.token) {
      cookies().set("token", data.token)
    } else {
      console.error(`No token provided for ${login}`)
    }
  } catch (error: any) {
    return { error: error.message }
  }
  redirect("/")
}
