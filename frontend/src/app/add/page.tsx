"use client";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";

export default function AddProjectPage() {
  return (
    <div className="flex flex-col w-full gap-8 mt-16">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-medium">Create a project</h1>
        <Button className="bg-blue-700 hover:bg-blue-600">Edit Preview</Button>
      </div>
      <AddProjectForm />
    </div>
  );
}

const schema = z.object({
  title: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  github_link: z.string().url("Please enter a valid GitHub URL"),
  live_site_link: z.string().url("Please enter a valid URL"),
  collaborators: z.array(z.string()),
  tags: z.array(z.string()),
  status: z.enum(["In Progress", "Completed"]),
  image: z.string().optional(),
});

function AddProjectForm() {
  const router = useRouter();
  const { token } = useAuth();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      github_link: "",
      live_site_link: "",
      collaborators: [],
      tags: [],
      status: "In Progress",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    // TODO: Implement form submission to backend
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-8 pb-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium text-base text-slate-950">Add Image</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium text-base text-slate-950">Project Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium text-base text-slate-950">Project Description *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Explain what the project is about, the purpose behind it, how long you&apos;ve been working on it, anything you want!" 
                  className="resize-none h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium text-base text-slate-950">Status</FormLabel>
              <FormControl>
                <select {...field} className="w-full border border-gray-300 rounded-md p-2">
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="github_link"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium text-base text-slate-950">Github URL *</FormLabel>
              <FormControl>
                <Input placeholder="Enter the GitHub URL of the project" type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="live_site_link"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium text-base text-slate-950">Live Site URL *</FormLabel>
              <FormControl>
                <Input placeholder="Enter the URL of the live site" type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="collaborators"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium text-base text-slate-950">Add Collaborator</FormLabel>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <FormControl>
                    <Input 
                      placeholder="Enter collaborator's username" 
                      type="text"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          if (input.value.trim()) {
                            field.onChange([...field.value, input.value.trim()]);
                            input.value = '';
                          }
                        }
                      }}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling?.querySelector('input');
                      if (input?.value.trim()) {
                        field.onChange([...field.value, input.value.trim()]);
                        input.value = '';
                      }
                    }}
                    className="bg-blue-700 h-12 hover:bg-blue-600"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {field.value.map((collaborator, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-md"
                    >
                      <span>{collaborator}</span>
                      <button
                        type="button"
                        onClick={() => {
                          field.onChange(field.value.filter((_, i) => i !== index));
                        }}
                        className="text-slate-500 hover:text-slate-700"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium text-base text-slate-950">Add Tags</FormLabel>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <FormControl>
                    <Input 
                      placeholder="Enter tag"
                      type="text"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          if (input.value.trim()) {
                            field.onChange([...field.value, input.value.trim()]);
                            input.value = '';
                          }
                        }
                      }}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling?.querySelector('input');
                      if (input?.value.trim()) {
                        field.onChange([...field.value, input.value.trim()]);
                        input.value = '';
                      }
                    }}
                    className="bg-blue-700 h-12 hover:bg-blue-600"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {field.value.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-md"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => {
                          field.onChange(field.value.filter((_, i) => i !== index));
                        }}
                        className="text-slate-500 hover:text-slate-700"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="w-full self-end p-0 items-center bg-blue-700 h-12 hover:bg-blue-600 disabled:bg-slate-300"
        >
          <span className="text-white font-medium flex-shrink-0 text-base">Create project</span>
        </Button>
      </form>
    </Form>
  );
}
