"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("loading");

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      setStatus("success");
      event.currentTarget.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="container-grid py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Let's build something great</h2>
          <p className="text-white/70">
            Share a project idea, partnership opportunity, or consultation request and I will respond within one business day.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span>Name</span>
              <input
                required
                name="name"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>Email</span>
              <input
                required
                type="email"
                name="email"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
          </div>
          <label className="space-y-1 text-sm">
            <span>Message</span>
            <textarea
              required
              name="message"
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>
          {status === "success" ? (
            <p className="text-sm text-emerald-400">Message delivered! I will get back to you shortly.</p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-red-400">Something went wrong. Please try again later.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
