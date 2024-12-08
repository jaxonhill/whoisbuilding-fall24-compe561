"use client";

import { Button, PrimaryButton } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/context/auth-context";

export default function OnboardingPage() {
    return (
        <div className="flex flex-col w-full gap-16 mt-16">
            <div className="w-full flex flex-col gap-4">
                <h1 className="text-3xl font-medium">Welcome to whoisbuilding!</h1>
                <p className="text-slate-700 text-xl">Before you can use the site, please fill out the additional information below.</p>
            </div>
            <OnboardingForm />
        </div>
    )
}

const schema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  github: z.string().min(1, "GitHub username is required"),
  linkedin: z.string().optional(),
  discord: z.string().optional(),
  bio: z.string().min(1, "Biography is required"),
});

export function OnboardingForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      github: "",
      linkedin: "",
      discord: "",
      bio: "",
    }
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    // TODO: Implement form submission
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-12 gap-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel className="font-medium text-base text-slate-950">First Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel className="font-medium text-base text-slate-950">Last Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel className="font-medium text-base text-slate-950">Username *</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel className="font-medium text-base text-slate-950">Github *</FormLabel>
              <FormControl>
                <Input placeholder="Enter Github username" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel className="font-medium text-base text-slate-950">LinkedIn</FormLabel>
              <FormControl>
                <Input placeholder="Enter LinkedIn profile URL" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discord"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel className="font-medium text-base text-slate-950">Discord</FormLabel>
              <FormControl>
                <Input placeholder="Enter Discord username" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="col-span-8">
              <FormLabel className="font-medium text-base text-slate-950">Biography *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Tell us about yourself! You can use emojis too 💯" 
                  type="text" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PrimaryButton
            isLoading={false}
            type="submit"
            disabled={!form.formState.isValid}
            className="col-span-4 w-full self-end p-0 items-center bg-blue-700 h-12 hover:bg-blue-600 disabled:bg-slate-300"
        >
            <span className="text-white font-medium flex-shrink-0 text-base">Create profile</span>
        </PrimaryButton>
      </form>
    </Form>
  );
}
