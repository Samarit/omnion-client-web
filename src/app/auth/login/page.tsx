import { signIn } from "@/app/auth/login/api/"
export default async function LoginPage() {
  const actionHandler = async (formData: FormData) => {
    "use server"

    const login = formData.get("login")
    const password = formData.get("password")

    if (!login || !password) {
      console.log("no login or password")
      return
    }

    const response = await signIn(login.toString(), password.toString())
  }

  return (
    <>
      <form action={actionHandler}>
        <input type='text' name='login' placeholder='Login' />
        <input type='password' name='password' placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
    </>
  )
}
