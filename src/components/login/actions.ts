"use server"

import { signIn } from "@/lib/login"

export async function submitLogin(login: string, password: string) {
  return await signIn(login, password)
}
