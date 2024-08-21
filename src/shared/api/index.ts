import axios from "axios"
import { ApiResponse } from "../types"

export async function fetchApi<T>(
  url: string,
  options: RequestInit | undefined = {}
) {
  const { headers } = options

  try {
    const res = await fetch(`${process.env.API_URL}${url}`, {
      headers: {
        "Content-Type":
          headers && "Content-Type" in headers
            ? headers["Content-Type"]
            : "application/json",
      },
      ...options,
    })
    const parsed = (await res.json()) as ApiResponse<T>

    if (!parsed.success) throw new Error(parsed.message!)

    return parsed
  } catch (error: any) {
    console.error(error)
    throw error
  }
}
