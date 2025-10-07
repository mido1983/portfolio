"use client";

import { experiences } from "@/data/experience";
import { motion } from "framer-motion";

export function ExperienceTimeline() {
  return (
    <section className="container-grid py-24">

      <h2 className="text-3xl font-semibold">Experience</h2>

      <div className="mt-10 space-y-10 border-l border-white/10 pl-6">
        {experiences.map((item, index) => (
          <motion.article
            key={item.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[37px] h-4 w-4 rounded-full border-2 border-accent bg-slate-950" />
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-white/60">
                <span>{item.period}</span>
                <span>{item.tech.slice(0, 30).join(" · ")}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {item.role} · {item.company}
              </h3>
              <p className="mt-3 text-sm text-white/70">{item.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {item.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
