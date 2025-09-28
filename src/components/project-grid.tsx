"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export function ProjectGrid() {
  return (
    <section id="projects" className="container-grid space-y-10 py-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Проекты</h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Подборка ключевых кейсов, демонстрирующих экспертизу в архитектуре, визуализации данных и DevOps.
          </p>
        </div>
        <Link href="/projects" className="hidden text-sm font-semibold text-accent md:inline-flex">
          Все проекты →
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.slice(0, 2).map((project, index) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>{project.year}</span>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm text-white/70">{project.summary}</p>
            <div className="mt-6 flex items-center justify-between">
              <Link href={`/projects/${project.slug}`} className="text-sm font-semibold text-accent">
                Подробнее →
              </Link>
              <div className="flex gap-3 text-xs text-white/50">
                {project.links.repo ? <a href={project.links.repo}>GitHub</a> : null}
                {project.links.demo ? <a href={project.links.demo}>Live</a> : null}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
