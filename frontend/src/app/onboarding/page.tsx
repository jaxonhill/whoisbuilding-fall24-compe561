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
import { fetchUserFieldValidation, onboardUser } from "@/lib/api/user";
import { UniqueUserFields } from "@/types/db-types";
import { checkIfUsernameExistsOnGitHub } from "@/lib/api/github";
import { UserOnboard } from "@/lib/api/schemas/userSchemas";
import { toast } from "@/hooks/use-toast";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col w-full gap-16 mt-16">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-3xl font-medium">Welcome to whoisbuilding!</h1>
        <p className="text-slate-700 text-xl">
          Before you can use the site, please fill out the additional
          information below.
        </p>
      </div>
      <OnboardingForm />
    </div>
  );
}

const schema = z.object({
  first_name: z.string().superRefine((value, ctx) => {
    if (value.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "First name is required",
      });
    } else if (value.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "First name must be at least 2 characters",
      });
    }
  }),
  last_name: z.string().superRefine((value, ctx) => {
    if (value.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "First name is required",
      });
    } else if (value.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "First name must be at least 2 characters",
      });
    }
  }),
  username: z
    .string()
    .min(1, "Username is required")
    .refine(async (username) => {
      // validate the field by checking the db for existence
      const fieldExists = await fetchUserFieldValidation(
        UniqueUserFields.USERNAME,
        username
      );
      return !fieldExists;
    }, "Username already registered"),
  github: z.string().superRefine(async (github_username, ctx) => {
    if (github_username.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "GitHub username is required",
      });
    } else {
      const github_username_registered_on_github =
        await checkIfUsernameExistsOnGitHub(github_username);

      if (!github_username_registered_on_github) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Username provided is not valid on GitHub",
        });
      } else {
        const github_username_exists_in_db = await fetchUserFieldValidation(
          UniqueUserFields.GITHUB_USERNAME,
          github_username
        );

        if (github_username_exists_in_db) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Username is already registered to an account",
          });
        }
      }
    }
  }),
  linkedin: z.string().optional(),
  discord: z.string().optional(),
  bio: z.string().min(1, "Biography is required"),
});

export function OnboardingForm() {
  const router = useRouter();
  const { token, updateUser } = useAuth();

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
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const onboard_details: UserOnboard = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      github_username: values.github,
      linkedin: values.linkedin === "" ? null : (values.linkedin ?? null),
      discord: values.discord === "" ? null : (values.discord ?? null),
      biography: values.bio,
      is_onboarding_complete: true,
    };

    try {
      if (!token) {
        console.log("Onboarding form: user not logged in");
      }
      const updatedUser = await onboardUser(onboard_details, token!);
      updateUser(updatedUser);
      toast({
        title: "Onboarding Complete",
        description: "Welcome to whoisbuilding!",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: "Onboarding Failed",
        description: "There was an error onboarding. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-12 gap-8"
      >
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel className="font-medium text-base text-slate-950">
                First Name *
              </FormLabel>
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
              <FormLabel className="font-medium text-base text-slate-950">
                Last Name *
              </FormLabel>
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
              <FormLabel className="font-medium text-base text-slate-950">
                Username *
              </FormLabel>
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
              <FormLabel className="font-medium text-base text-slate-950">
                GitHub *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter GitHub username"
                  type="text"
                  {...field}
                />
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
              <FormLabel className="font-medium text-base text-slate-950">
                LinkedIn
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter LinkedIn profile URL"
                  type="text"
                  {...field}
                />
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
              <FormLabel className="font-medium text-base text-slate-950">
                Discord
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Discord username"
                  type="text"
                  {...field}
                />
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
              <FormLabel className="font-medium text-base text-slate-950">
                Biography *
              </FormLabel>
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
          disabled={false}
          type="submit"
          className="col-span-4 w-full self-end p-0 items-center bg-blue-700 h-12 hover:bg-blue-600 disabled:bg-slate-300"
        >
          <span className="text-white font-medium flex-shrink-0 text-base">
            Create profile
          </span>
        </PrimaryButton>
      </form>
    </Form>
  );
}
