"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/data/site";

const highlights = ["React", "Next.js", "Node.js", "PHP", "WordPress", "AI tools"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container-grid grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div className="space-y-8">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            Full Stack Web Developer | React | Node.js
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Building practical web platforms that move businesses forward.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/70"
          >
            Michael Doroshenko is a full stack developer with 7+ years of experience across React, Next.js, Node.js, PHP,
            and WordPress, delivering secure, performant solutions for e-commerce and marketing teams.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#projects"
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30"
            >
              View projects
            </Link>
            <a href="/resume" className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold">
              Resume
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/40 transition-transform hover:-translate-y-0.5 hover:shadow-cyan-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <span>Contact me</span>
              <span aria-hidden="true" className="text-base leading-none">&gt;</span>
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/20 p-8">
            <div className="space-y-4 text-sm">
              <p className="text-white/70">Core focus areas</p>
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center font-semibold">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </section>
  );
}
