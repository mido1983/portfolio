import { siteConfig } from "@/data/site";
import { format } from "date-fns";

export function Footer() {
  const socialLinks = [
    siteConfig.socials.linkedin
      ? { label: "LinkedIn", href: siteConfig.socials.linkedin }
      : null
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-grid flex flex-col gap-4 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© {format(new Date(), "yyyy")} {siteConfig.name}. All rights reserved.</p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
