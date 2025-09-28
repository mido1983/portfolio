"use client";

import { skills } from "@/data/experience";
import { motion } from "framer-motion";

const skillGroups = [
  { title: "Языки", key: "languages" as const },
  { title: "Фреймворки", key: "frameworks" as const },
  { title: "Инструменты", key: "tooling" as const },
  { title: "Soft Skills", key: "soft" as const }
];

export function SkillMatrix() {
  return (
    <section className="container-grid py-24">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Навыки</h2>
          <p className="text-white/70">
            Фокус на инженерии фронтенда и платформенных решений с сильным бекграундом в автоматизации и
            обработке данных.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {skills[group.key].map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
