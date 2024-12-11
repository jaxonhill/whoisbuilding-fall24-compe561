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
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { createProject } from "@/lib/api/projects";
import { toast } from "@/hooks/use-toast";
import { UserDisplay } from "@/types/db-types";
import { searchUsers } from "@/lib/api/users";
import { useDebounce } from "@/hooks/use-debounce";
import { X } from "lucide-react";

export default function AddProjectPage() {
  return (
    <div className="flex flex-col w-full gap-8 mt-12">
      <h1 className="text-3xl font-medium">Create a project</h1>
      <AddProjectForm />
    </div>
  );
}

const schema = z.object({
  title: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  github_link: z.string().url("Please enter a valid GitHub URL").optional(),
  live_site_link: z.string().url("Please enter a valid URL").optional(),
  collaborators: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  image: z.instanceof(File).optional(),
});

export type ProjectFormValues = z.infer<typeof schema>;

function AddProjectForm() {
  const router = useRouter();
  const { token, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [possibleCollaborators, setPossibleCollaborators] = useState<UserDisplay[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    async function fetchUsers() {
      if (!debouncedSearchText || debouncedSearchText === "@") {
        setPossibleCollaborators([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchUsers(debouncedSearchText);
        setPossibleCollaborators(results);
      } catch (error) {
        toast({
          title: "Failed to fetch users",
          description: "Please try again later",
          variant: "destructive",
        });
        setPossibleCollaborators([]);
      } finally {
        setIsSearching(false);
      }
    }

    fetchUsers();
  }, [debouncedSearchText]);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      github_link: "",
      live_site_link: "",
      collaborators: [],
      tags: [],
      image: undefined,
    },
  });

  async function onSubmit(values: ProjectFormValues) {
    setIsLoading(true);
    try {
      const response = await createProject(values, token!); 
      toast({
        title: "Success",
        description: "Project created successfully!",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-8 pb-16">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-medium text-base text-slate-950">Add Image</FormLabel>
              <div className="flex flex-col gap-4">
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                      
                      // Create preview URL for the image
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setImagePreview(url);
                      } else {
                        setImagePreview(null);
                      }
                    }}
                    onBlur={() => {
                      field.onBlur();
                    }}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                {imagePreview && (
                  <div className="relative w-full aspect-video">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        field.onChange(undefined);
                        setImagePreview(null);
                      }}
                      className="absolute w-10 h-10 top-2 right-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="stroke-white w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
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
                  className="h-48 p-4"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="github_link"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-medium text-base text-slate-950">Github URL</FormLabel>
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
                <FormLabel className="font-medium text-base text-slate-950">Live Site URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the URL of the live site" type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="collaborators"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-medium text-base text-slate-950">Add Collaborator</FormLabel>
                <div className="flex flex-col gap-4">
                  <div className="relative w-full">
                    <div className="flex gap-2 items-center border border-slate-300 rounded-lg px-4 h-12 w-full">
                      <Input 
                        placeholder="Search collaborator by username" 
                        type="text"
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => {
                          setTimeout(() => setIsSearchFocused(false), 200);
                        }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="border-0 p-0 focus-visible:ring-0"
                      />
                    </div>

                    {isSearchFocused && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
                        {isSearching ? (
                          <div className="px-4 py-2 text-sm text-slate-500">Loading...</div>
                        ) : possibleCollaborators.length > 0 ? (
                          <div className="px-2">
                            {possibleCollaborators.map((user) => (
                              <button
                                key={user.username}
                                onClick={() => {
                                  if (!field.value?.includes(user.username)) {
                                    field.onChange([...field.value ?? [], user.username]);
                                  }
                                  setSearchText("");
                                  setPossibleCollaborators([]);
                                }}
                                className="w-full text-left px-2 py-2 hover:bg-slate-50 rounded-md"
                              >
                                <div className="flex items-center gap-2">
                                  <img 
                                    src={user.profile_image_url} 
                                    alt={`${user.username}'s avatar`}
                                    className="w-6 h-6 rounded-full"
                                  />
                                  <span className="text-sm text-slate-500">@{user.username}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : searchText ? (
                          <div className="px-4 py-2 text-sm text-slate-500">No users found</div>
                        ) : (
                          <div className="px-4 py-2 text-sm text-slate-500">
                            Start typing to search...
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {field.value?.map((collaborator, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-md"
                      >
                        <span>{collaborator}</span>
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(field.value?.filter((_, i) => i !== index));
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
                              field.onChange([...field.value ?? [], input.value.trim()]);
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
                          field.onChange([...field.value ?? [], input.value.trim()]);
                          input.value = '';
                        }
                      }}
                      className="bg-blue-700 h-12 hover:bg-blue-600"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {field.value?.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-md"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(field.value?.filter((_, i) => i !== index));
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
        </div>

        <PrimaryButton
          type="submit"
          disabled={!form.formState.isValid}
          isLoading={isLoading}
          className="w-full self-end p-0 items-center h-12 disabled:bg-slate-300"
        >
          <span className="text-white font-medium flex-shrink-0 text-base">Create project</span>
        </PrimaryButton>
      </form>
    </Form>
  );
}
