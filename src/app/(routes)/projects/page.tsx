import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="container-grid py-24">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-semibold">Projects</h1>
        <p className="text-white/70">
          Every engagement blends engineering rigor with business context to ship resilient experiences that drive
          measurable outcomes.
        </p>
      </div>
      <div className="mt-12 grid gap-8">
        {projects.map((project) => (
          <article key={project.slug} className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/60">
              <span>{project.year}</span>
              <span>{project.tags.join(" · ")}</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{project.title}</h2>
            <p className="mt-3 text-white/70">{project.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-accent">
              <Link href={`/projects/${project.slug}`}>Case study →</Link>
              {project.links.repo ? (
                <a href={project.links.repo} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : null}
              {project.links.demo ? (
                <a href={project.links.demo} target="_blank" rel="noreferrer">
                  Live demo
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
