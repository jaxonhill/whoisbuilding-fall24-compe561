import ContentSection from "./content-section";

export default function ProjectCard({ project }) {
  return (
    <section className="p-8 flex flex-col gap-6 border border-slate-300 rounded-lg">
        <ContentSection project={project} />
    </section>
  )
}
