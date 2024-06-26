"use server"

import { signIn } from "../../../lib/login"

export async function submitLogin(login: string, password: string) {
  const response = await signIn(login, password)
}
