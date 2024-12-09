"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PrimaryButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../context/auth-context";
import {
  UserLoginError,
  UserLoginErrorName,
} from "@/core/errors/types/UserLoginError";
import { fetchUserFieldValidation } from "@/lib/api/user";
import { UniqueUserFields, User } from "@/types/db-types";
import { useState } from "react";

// Schema for login form
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Schema for signup form
const signupSchema = loginSchema
  .extend({
    // add api validation on email for sign up only
    email: loginSchema.shape.email.refine(async (email) => {
      // validate the field by checking the db for existence
      const fieldExists = await fetchUserFieldValidation(
        UniqueUserFields.EMAIL,
        email
      );
      return !fieldExists;
    }, "Email already registered"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface AuthFormProps {
  type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const isLogin = type === "login";
  const schema = isLogin ? loginSchema : signupSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(isLogin ? {} : { confirmPassword: "" }),
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setIsLoading(true);
      if (isLogin) {
        try {
          const user_void = await login(values.email, values.password);

          if (user_void) {
            const user: User = user_void;
            if (user.is_onboarding_complete) {
              // ready to access site
              router.push("/");
            } else {
              // still needs to onboard
              router.push("/onboarding");
            }
          }
          router.refresh();
        } catch (error) {
          if (error instanceof UserLoginError) {
            switch (error.name) {
              case UserLoginErrorName.INVALID_CREDENTIALS:
                toast({
                  title: "Login Failed",
                  description: error.message,
                  variant: "destructive",
                });
                break;
              case UserLoginErrorName.LOGIN_ATTEMPT_THRESHOLD_MET:
                toast({
                  title: "Login Attempt Threshold Exceeded",
                  description: `Exceeded requests: ${error.message}`,
                  variant: "destructive",
                });
                break;
            }
          }
        }
        //router.refresh();
      } else {
        await signup(values.email, values.password);
        router.push("/onboarding");
        router.refresh();
        console.log("Signup values:", values);
      }
    } catch (error) {
      console.log(`${isLogin ? "Login" : "Signup"} failed: `, error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col gap-8 p-16 rounded-md border border-slate-300">
      <h1 className="w-full text-center font-medium text-3xl">
        {isLogin ? "Login" : "Create account"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-base text-slate-950">
                  Email
                </FormLabel>
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
                <FormLabel className="font-medium text-base text-slate-950">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isLogin && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-base text-slate-950">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <PrimaryButton isLoading={isLoading} type="submit" disabled={!form.formState.isValid}>
            {isLogin ? 'Login' : 'Create account'}
          </PrimaryButton>
          <p className="text-slate-500 text-sm text-center">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a
              href={isLogin ? "/signup" : "/login"}
              className="text-blue-700 font-medium hover:underline"
            >
              {isLogin ? "Sign up" : "Log In"}
            </a>
          </p>
        </form>
      </Form>
    </div>
  );
}