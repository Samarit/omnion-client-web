import { fetchApi } from "@/shared/api"
import { ApiResponse } from "@/shared/types"
import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function signIn(login: string, password: string) {
  try {
    // const response = await axios.post<ApiResponse<{ token: string }>>(
    //   `${process.env.API_URL}/auth/login`,
    //   {
    //     login,
    //     password,
    //   }
    // )

    // const response = await fetch(`${process.env.API_URL}/auth/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     login,
    //     password,
    //   }),
    // })

    // const parsed = await response.json()
    // console.log({ parsed })

    // const { success, status, message, data } = parsed as ApiResponse<{
    //   token: string
    // }>

    const res = await fetchApi<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    })
    console.log(res)
    const { success, status, message, data } = res

    if (!success) throw new Error(message!)

    if (data?.token) {
      cookies().set("token", data.token)
    } else {
      console.error(`No token provided for ${login}`)
    }
  } catch (error: any) {
    console.error(error.message)
    return { error: error.message }
  }
  redirect("/")
}
