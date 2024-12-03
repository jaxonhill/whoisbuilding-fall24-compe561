"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="w-full flex flex-col gap-8 p-16 rounded-md border border-slate-300">
      <h1 className="w-full text-center font-medium text-3xl">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-base text-slate-950">Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@gmail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password" 
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-base text-slate-950">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="h-12 bg-blue-700 font-medium text-base text-white hover:bg-blue-600" type="submit">
            Login
          </Button>
          <p className="text-slate-500 text-sm text-center">
            Don't have an account? <a href="/signup" className="text-blue-700 font-medium hover:underline">Sign up</a>
          </p>
        </form>
      </Form>
    </div>
  )
}
