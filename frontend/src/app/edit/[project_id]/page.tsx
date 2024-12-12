"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/auth-context";
import { ProjectForm } from "@/features/project-form/project-form";
import { toast } from "@/hooks/use-toast";
import { Project } from "@/types/db-types";
import { ProjectFormValues } from "@/utils/project-schema";
import { getProject, updateProject } from "@/lib/api/projects";

export default function EditProjectPage({ params }: { params: { project_id: string } }) {
  const router = useRouter();
  const { token, user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const data = await getProject(params.project_id);
        if (data.creator_id !== user?.id) {
          toast({
            title: "Unauthorized",
            description: "You don't have permission to edit this project",
            variant: "destructive",
          });
          router.push("/");
          return;
        }
        setProject(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch project",
          variant: "destructive",
        });
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [params.project_id, token, user, router]);

  const handleSubmit = async (values: ProjectFormValues) => {
    if (!token) return;

    try {
      await updateProject(params.project_id, values, token);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="flex flex-col w-full gap-8 mt-12">
      <h1 className="text-3xl font-medium">Edit project</h1>
      <ProjectForm
        defaultValues={{
          title: project.title,
          description: project.description,
          github_link: project.github_link || "",
          live_site_link: project.live_site_link || "",
          collaborators: (project.collaborators || []).map(c => c.username),
          tags: project.tags || [],
        }}
        onSubmit={handleSubmit}
        submitLabel="Update project"
      />
    </div>
  );
}
