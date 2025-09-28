import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/data/projects";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container-grid py-24">
      <Link href="/projects" className="text-sm text-white/60">
        ← Back to projects
      </Link>
      <div className="mt-8 space-y-6">
        <span className="text-sm uppercase tracking-[0.2em] text-white/50">{project.year}</span>
        <h1 className="text-4xl font-semibold">{project.title}</h1>
        <p className="text-lg text-white/70">{project.summary}</p>
        <div className="flex flex-wrap gap-3 text-sm text-accent">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accent/10 px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/80">
          <h2 className="text-xl font-semibold">Impact</h2>
          <p>{project.content}</p>
          <div className="flex gap-4 text-sm font-semibold text-accent">
            {project.links.repo ? (
              <a href={project.links.repo} target="_blank" rel="noreferrer">
                Repository
              </a>
            ) : null}
            {project.links.demo ? (
              <a href={project.links.demo} target="_blank" rel="noreferrer">
                Live demo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
