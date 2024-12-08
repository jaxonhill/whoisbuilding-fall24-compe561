import ProjectCard from "./project-card";
import { Project } from "@/types/db-types";

export default function ProjectsContainer({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-8 overflow-auto">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
