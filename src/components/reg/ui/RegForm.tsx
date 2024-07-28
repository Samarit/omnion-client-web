"use client"

import { Button } from "@/shared/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { submitReg } from "../actions"

const schema = z
  .object({
    login: z.string().trim().min(5, "Login must be at least 5 characters long"),
    password: z
      .string()
      .trim()
      .min(5, "Password must be at least 5 characters long"),
    confirmPassword: z
      .string()
      .trim()
      .min(5, "Password must be at least 5 characters long"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
    }
  })

export default function RegForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { login: "", password: "", confirmPassword: "" },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { login, password } = values
    const err = await submitReg(login, password)
    if (err) form.setError("root", { message: err })
  }

  return (
    <Form {...form}>
      {form.formState.errors.root?.message && (
        <span>{form.formState.errors.root?.message}</span>
      )}

      <form
        onSubmit={form.handleSubmit((values) => {
          onSubmit(values)
        })}
        className='space-y-8'>
        <FormField
          name='login'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input placeholder='Login' {...field} />
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
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Confirm password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' variant={"outline"}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
