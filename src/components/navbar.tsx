"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Résumé" },
  { href: "#contact", label: "Contact" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur">
      <div className="container-grid flex items-center justify-between py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -2 }}
              className="relative"
            >
              <Link href={link.href} className="transition-colors">
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href={`mailto:${siteConfig.email}`}
          className="rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent"
        >
          Email me
        </motion.a>
      </div>
    </header>
  );
}
