"use client";

import Link from "next/link";
import type { Route } from "next";
import { siteConfig } from "@/data/site";
import { motion } from "framer-motion";
import { CallMeBtn } from "./call-me-btn";

type NavLink =
  | { href: Route; label: string }
  | { href: `#${string}`; label: string; isAnchor: true };

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "#contact", label: "Contact", isAnchor: true }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur ">
      <div className="container-grid flex items-center justify-between py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <motion.div key={link.href} whileHover={{ y: -2 }} className="relative">
              {"isAnchor" in link ? (
                <a href={link.href} className="transition-colors">
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className="transition-colors">
                  {link.label}
                </Link>
              )}
            </motion.div>
          ))}
        </nav>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href={`mailto:${siteConfig.email}`}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/40 transition-transform hover:-translate-y-0.5 hover:shadow-cyan-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <span>Email me</span>
          <span aria-hidden="true" className="text-base leading-none">&gt;</span>
        </motion.a>
        <CallMeBtn/>
      </div>
    </header>
  );
}