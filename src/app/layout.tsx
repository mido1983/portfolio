import type { Metadata } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Poppins } from "next/font/google";
import { AnimatedBackground } from "@/components/animated-background";
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
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      noarchive: true,
      nosnippet: true
    }
  }
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-slate-950">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <AnimatedBackground />
          <div className="relative flex flex-1 flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
