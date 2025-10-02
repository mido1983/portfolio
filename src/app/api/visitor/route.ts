import { NextResponse } from "next/server";

export const runtime = "edge";

type ParsedAgent = {
  browser: string;
  os: string;
};

type GeoInfo = {
  country: string;
  region: string;
  city: string;
  timezone: string;
};

type VisitorResponse = {
  agent: ParsedAgent;
  maskedIp: string;
  geo: GeoInfo;
  acceptLanguage: string;
};

const UNKNOWN = "Unknown";

function getHeaderValue(list: Headers, keys: string[]): string | null {
  for (const key of keys) {
    const value = list.get(key);
    if (value) {
      return value;
    }
  }
  return null;
}

function normalizeIpEntry(entry: string | null): string | null {
  if (!entry) {
    return null;
  }

  const first = entry.split(",")[0]?.trim();
  return first ?? null;
}

function maskIpAddress(entry: string | null): string {
  const raw = normalizeIpEntry(entry);
  if (!raw) {
    return UNKNOWN;
  }

  if (raw.includes(".")) {
    const [ipv4] = raw.split(":");
    if (!ipv4) {
      return UNKNOWN;
    }
    const segments = ipv4.split(".");
    if (segments.length === 4) {
      segments[3] = "0";
      return segments.join(".");
    }
    return UNKNOWN;
  }

  if (raw.includes(":")) {
    const segments = raw.split(":");
    if (segments.length > 1) {
      segments[segments.length - 1] = "0";
      return segments.join(":");
    }
  }

  return UNKNOWN;
}

function mapWindowsVersion(version: string): string {
  const mapping: Record<string, string> = {
    "10.0": "10/11",
    "6.3": "8.1",
    "6.2": "8",
    "6.1": "7",
    "6.0": "Vista",
    "5.1": "XP"
  };

  return mapping[version] ?? version;
}

function parseUserAgent(userAgent: string | null): ParsedAgent {
  if (!userAgent) {
    return { browser: UNKNOWN, os: UNKNOWN };
  }

  const browserMatchers: Array<{ name: string; regex: RegExp }> = [
    { name: "Edge", regex: /Edg\/(\d+[\.\w]*)/ },
    { name: "Chrome", regex: /Chrome\/(\d+[\.\w]*)/ },
    { name: "Firefox", regex: /Firefox\/(\d+[\.\w]*)/ },
    { name: "Safari", regex: /Version\/(\d+[\.\w]*).*Safari/ }
  ];

  let browser = UNKNOWN;
  for (const matcher of browserMatchers) {
    const match = matcher.regex.exec(userAgent);
    if (match) {
      browser = `${matcher.name} ${match[1]}`.trim();
      break;
    }
  }

  if (browser === UNKNOWN && /Safari/.test(userAgent)) {
    browser = "Safari";
  }

  const osMatchers: Array<{ name: string; regex: RegExp; formatter?: (input: string) => string }> = [
    { name: "Windows", regex: /Windows NT ([\d\.]+)/, formatter: (input) => `Windows ${mapWindowsVersion(input)}` },
    { name: "macOS", regex: /Mac OS X ([\d_]+)/, formatter: (input) => `macOS ${input.replace(/_/g, ".")}` },
    { name: "iOS", regex: /iP(?:hone|ad|od).*OS ([\d_]+)/, formatter: (input) => `iOS ${input.replace(/_/g, ".")}` },
    { name: "Android", regex: /Android ([\d\.]+)/, formatter: (input) => `Android ${input}` },
    { name: "Linux", regex: /Linux/ }
  ];

  let os = UNKNOWN;
  for (const matcher of osMatchers) {
    const match = matcher.regex.exec(userAgent);
    if (match) {
      const value = matcher.formatter ? matcher.formatter(match[1] ?? matcher.name) : matcher.name;
      os = value;
      break;
    }
  }

  return { browser, os };
}

function buildGeo(list: Headers): GeoInfo {
  const country =
    getHeaderValue(list, ["x-vercel-ip-country", "cf-ipcountry"]) ?? UNKNOWN;
  const region =
    getHeaderValue(list, ["x-vercel-ip-country-region", "x-vercel-ip-subdivision", "cf-region"]) ?? UNKNOWN;
  const city = getHeaderValue(list, ["x-vercel-ip-city", "cf-city"]) ?? UNKNOWN;
  const timezone =
    getHeaderValue(list, ["x-vercel-ip-timezone", "cf-timezone"]) ?? UNKNOWN;

  return { country, region, city, timezone };
}

export async function GET(request: Request) {
  const headerList = request.headers;

  const ip = getHeaderValue(headerList, [
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
    "x-vercel-forwarded-for"
  ]);

  const body: VisitorResponse = {
    agent: parseUserAgent(headerList.get("user-agent")),
    maskedIp: maskIpAddress(ip),
    geo: buildGeo(headerList),
    acceptLanguage: headerList.get("accept-language") ?? UNKNOWN
  };

  return NextResponse.json(body);
}
