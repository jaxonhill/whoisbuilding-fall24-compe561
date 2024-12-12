import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  github_link: z.string().url("Please enter a valid GitHub URL").optional(),
  live_site_link: z.string().url("Please enter a valid URL").optional(),
  collaborators: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  image: z.instanceof(File).optional(),
});

export type ProjectFormValues = z.infer<typeof schema>;
