import { siteConfig } from "@/data/site";
import { format } from "date-fns";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-grid flex flex-col gap-4 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {format(new Date(), "yyyy")} {siteConfig.name}. Все права защищены.
        </p>
        <div className="flex gap-4">
          <a href={siteConfig.socials.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={siteConfig.socials.telegram} target="_blank" rel="noreferrer">
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
