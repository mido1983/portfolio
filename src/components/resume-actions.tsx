"use client";


import { siteConfig } from "@/data/site";


export function ResumeActions() {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="flex flex-wrap gap-4">
      <button
        type="button"
        onClick={handlePrint}
        className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900"
      >

        Save as PDF
      </button>
      <a
        href={`mailto:${siteConfig.email}`}
        className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold"
      >
        Discuss opportunities

      </a>
    </div>
  );
}
