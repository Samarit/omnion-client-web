import { register } from "@/lib/reg"

export async function submitReg(login: string, password: string) {
  return await register(login, password)
}
