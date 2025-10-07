"use client";

import { siteConfig } from "@/data/site";

type ContactItem = {
  label: string;
  value: string;
  href: string;
};

const phoneHref = siteConfig.phone.replace(/[^\d+]/g, "");

const contactItems: ContactItem[] = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`
  },
  ...(phoneHref
    ? [{ label: "Phone", value: siteConfig.phone, href: `tel:${phoneHref}` }]
    : []),
  {
    label: "LinkedIn",
    value: siteConfig.socials.linkedin,
    href: siteConfig.socials.linkedin
  },
  {
    label: "GitHub",
    value: siteConfig.socials.github,
    href: siteConfig.socials.github
  }
];

export function ContactForm() {
  return (
    <section id="contact" className="container-grid py-24">
      <div className="space-y-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">Contact Details</h2>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            {contactItems.map((item) => (
              <li key={item.label} className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-white">{item.label}:</span>
                <a
                  href={item.href}
                  className="text-accent underline-offset-4 hover:underline"
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/*
          Original contact form is temporarily disabled.
          <form>
            ...
          </form>
        */}
      </div>
    </section>
  );
}
