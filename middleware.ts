import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BOT_SIGNATURES = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /crawl/i,
  /slurp/i,
  /bingpreview/i,
  /facebookexternalhit/i,
  /Embedly/i,
  /LinkedInBot/i,
  /Pinterest/i,
  /WhatsApp/i,
  /TelegramBot/i,
  /Python-requests/i,
  /okhttp/i,
  /curl/i
];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (BOT_SIGNATURES.some((signature) => signature.test(userAgent))) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet"
      }
    });
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: ["/:path*"]
};
