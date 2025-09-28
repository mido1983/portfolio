"use client";

import { skills } from "@/data/experience";
import { motion } from "framer-motion";

const skillGroups = [
  { title: "Frontend", key: "frontend" as const },
  { title: "Backend", key: "backend" as const },
  { title: "Databases", key: "databases" as const },
  { title: "AI Tools", key: "aiTools" as const },
  { title: "DevOps & Process", key: "devops" as const },
  { title: "Specialties", key: "specialties" as const }
];

const IMPORTANT_SKILLS = new Set([
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "RESTful APIs",
  "PostgreSQL",
  "Docker",
  "CI/CD (GitLab, Jenkins)",
  "GitHub Copilot",
  "ChatGPT",
  "Workflow automation"
]);

type SkillKey = (typeof skillGroups)[number]["key"];

const skillLookup: Record<SkillKey, string[]> = {
  frontend: skills.frontend,
  backend: skills.backend,
  databases: skills.databases,
  aiTools: skills.aiTools,
  devops: skills.devops,
  specialties: skills.specialties
};

function chunkSkills(items: string[]) {
  const pairs: string[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
}

export function SkillMatrix() {
  return (
    <section className="container-grid py-24">
      <div className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-semibold">Skills snapshot</h2>
          <p className="text-white/70">
            A balanced toolkit spanning modern frontend frameworks, backend services, databases, DevOps practices, and
            AI-assisted productivity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, groupIndex) => {
            const pairs = chunkSkills(skillLookup[group.key]);

            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.08 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-semibold uppercase tracking-[0.08em] text-cyan-200">{group.title}</h3>
                <div className="mt-4 space-y-3 text-sm">
                  {pairs.map((pair, pairIndex) => {
                    const entries = pair.length === 2 ? pair : [...pair, ""];

                    return (
                      <div key={`${group.key}-${pairIndex}`} className="grid grid-cols-2 gap-3">
                        {entries.map((skill, skillIndex) => {
                          if (!skill) {
                            return (
                              <span
                                key={`${group.key}-${pairIndex}-${skillIndex}`}
                                aria-hidden="true"
                                className="select-none opacity-0"
                              >
                                -
                              </span>
                            );
                          }

                          const emphasis = IMPORTANT_SKILLS.has(skill)
                            ? "font-semibold text-cyan-300"
                            : "text-white/80";

                          return (
                            <span key={skill} className={emphasis}>
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
