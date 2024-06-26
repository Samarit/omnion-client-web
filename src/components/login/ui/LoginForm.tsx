"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/shared/ui/input"
import { submitLogin } from "./actions"
import { Button } from "@/shared/ui/button"

const schema = z.object({
  login: z.string().trim().min(5, "Login must be at least 5 characters long"),
  password: z
    .string()
    .trim()
    .min(5, "Password must be at least 5 characters long"),
})

export default function LoginForm() {
  const form = useForm<z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { login: "", password: "" },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { login, password } = values

    await submitLogin(login, password)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            name='login'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder='Login...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' variant={"outline"}>
            Sign In
          </Button>
        </form>
      </Form>
    </>
  )
}
