"use client";

import { siteConfig } from "@/data/site";

const phoneHref = siteConfig.phone.replace(/[^\d+]/g, "");
const telLink = phoneHref ? `tel:${phoneHref}` : `tel:${siteConfig.phone}`;

export function CallMeBtn() {
  return (
    <a
      href={telLink}
      className="group inline-flex min-w-[140px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/40 transition-transform hover:-translate-y-0.5 hover:shadow-cyan-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-4 w-4 transition-transform group-hover:rotate-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 8.5C2 6.015 4.015 4 6.5 4h1A1.5 1.5 0 0 1 9 5.5v2A1.5 1.5 0 0 1 7.5 9h-.764a11.965 11.965 0 0 0 5.764 5.764V14.5A1.5 1.5 0 0 1 14 16h2a1.5 1.5 0 0 1 1.5 1.5v1A2.5 2.5 0 0 1 15 21c-7.18 0-13-5.82-13-13Z"
        />
      </svg>
      <span className="transition-transform group-hover:translate-x-0.5">Call me</span>
    </a>
  );
}
