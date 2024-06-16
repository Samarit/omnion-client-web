import { cookies } from "next/headers"

export default function Login() {
  async function login(login: string, password: string) {
    const response = await fetch("http://localhost:5000/auth/login", {
      headers: {
        login: login,
        password: password,
      },
    })

    if (response.ok) {
      const data = await response.json()
      cookies().set("token", data.token)
      console.log(data)
    }
  }

  async function actionHandler(formData: FormData) {
    "use server"
    await login("admin", "admin")
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
