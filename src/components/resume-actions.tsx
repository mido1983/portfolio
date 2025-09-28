"use client";

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
        Скачать PDF
      </button>
      <a
        href="mailto:hello@ivanpetrov.dev"
        className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold"
      >
        Связаться по резюме
      </a>
    </div>
  );
}
