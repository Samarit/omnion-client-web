"use server"

import { signIn } from ".."

export async function submitLogin(login: string, password: string) {
  const response = await signIn(login, password)
  console.log("SIGN IN RESPONSE", await response.json())
}
