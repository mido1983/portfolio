import type { Metadata } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Poppins } from "next/font/google";
import { siteConfig } from "@/data/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website"
  }
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru" className={poppins.variable}>
      <body>
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {children}
        </div>
      </body>
    </html>
  );
}
