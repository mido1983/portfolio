"use client";

import { useEffect, useMemo, useState } from "react";

const CARD_BASE = "rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/30 to-slate-800/40 p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10";

const SMALL_TEXT = "mt-6 text-xs text-white/50";

type ClientInfo = {
  timezone: string;
  languages: string;
  viewport: string;
  networkType: string;
  cpuThreads: string;
  deviceMemory: string;
  prefersDark: string;
  prefersReducedMotion: string;
  onlineStatus: string;
};

type ServerInfo = {
  agent: {
    browser: string;
    os: string;
  };
  maskedIp: string;
  geo: {
    country: string;
    region: string;
    city: string;
    timezone: string;
  };
  acceptLanguage: string;
};

const UNKNOWN = "Unknown";

function AboutYou() {
  const [revealed, setRevealed] = useState(false);
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
  const [loadingServer, setLoadingServer] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gatherClientInfo = useMemo(
    () => () => {
      if (typeof window === "undefined" || typeof navigator === "undefined") {
        return null;
      }

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? UNKNOWN;
      const languages = navigator.languages?.length
        ? Array.from(new Set(navigator.languages)).join(", ")
        : navigator.language ?? UNKNOWN;
      const viewport = `${window.innerWidth} x ${window.innerHeight} @${window.devicePixelRatio ?? 1}x`;

      type ConnectionNavigator = Navigator & {
        connection?: {
          effectiveType?: string;
        };
      };

      const connection = (navigator as ConnectionNavigator).connection;
      const networkType = connection?.effectiveType ?? UNKNOWN;

      const cpuThreads = typeof navigator.hardwareConcurrency === "number" ? String(navigator.hardwareConcurrency) : UNKNOWN;
      const deviceMemoryValue = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const deviceMemory = typeof deviceMemoryValue === "number" ? `${deviceMemoryValue} GB` : UNKNOWN;

      const darkQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
      const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

      const prefersDark = darkQuery?.matches ? "Prefers dark" : "No preference";
      const prefersReducedMotion = reducedMotionQuery?.matches ? "Prefers reduced motion" : "No preference";

      const onlineStatus = navigator.onLine ? "Online" : "Offline";

      return {
        timezone,
        languages,
        viewport,
        networkType,
        cpuThreads,
        deviceMemory,
        prefersDark,
        prefersReducedMotion,
        onlineStatus
      } satisfies ClientInfo;
    },
    []
  );

  useEffect(() => {
    if (!revealed) {
      return;
    }

    const refreshClientInfo = () => {
      const info = gatherClientInfo();
      if (info) {
        setClientInfo(info);
      }
    };

    refreshClientInfo();

    const cleanupFns: Array<() => void> = [];

    window.addEventListener("online", refreshClientInfo);
    window.addEventListener("offline", refreshClientInfo);
    window.addEventListener("resize", refreshClientInfo);

    cleanupFns.push(() => {
      window.removeEventListener("online", refreshClientInfo);
      window.removeEventListener("offline", refreshClientInfo);
      window.removeEventListener("resize", refreshClientInfo);
    });

    const addMediaQueryListener = (query?: MediaQueryList) => {
      if (!query) {
        return;
      }
      const handler = () => refreshClientInfo();
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", handler);
        cleanupFns.push(() => query.removeEventListener("change", handler));
      } else if (typeof (query as MediaQueryList & { addListener?: (cb: (event: MediaQueryListEvent) => void) => void }).addListener === "function") {
        const legacy = query as MediaQueryList & {
          addListener: (cb: (event: MediaQueryListEvent) => void) => void;
          removeListener: (cb: (event: MediaQueryListEvent) => void) => void;
        };
        const legacyHandler = () => refreshClientInfo();
        legacy.addListener(legacyHandler);
        cleanupFns.push(() => legacy.removeListener(legacyHandler));
      }
    };

    addMediaQueryListener(window.matchMedia?.("(prefers-color-scheme: dark)"));
    addMediaQueryListener(window.matchMedia?.("(prefers-reduced-motion: reduce)"));

    type WithConnection = Navigator & {
      connection?: {
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
        addListener?: (listener: () => void) => void;
        removeListener?: (listener: () => void) => void;
      };
    };

    const connection = (navigator as WithConnection).connection;

    if (connection) {
      const handleConnectionChange = () => refreshClientInfo();
      if (typeof connection.addEventListener === "function") {
        connection.addEventListener("change", handleConnectionChange);
        cleanupFns.push(() => connection.removeEventListener?.("change", handleConnectionChange));
      } else if (typeof connection.addListener === "function") {
        connection.addListener(handleConnectionChange);
        cleanupFns.push(() => connection.removeListener?.(handleConnectionChange));
      }
    }

    setLoadingServer(true);
    fetch("/api/visitor")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load visitor data");
        }
        return (await response.json()) as ServerInfo;
      })
      .then((data) => {
        setServerInfo(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setServerInfo(null);
        setError("Unable to fetch server-side data.");
      })
      .finally(() => {
        setLoadingServer(false);
      });

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, [revealed, gatherClientInfo]);

  return (
    <section className="container-grid py-24">
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold">About you</h2>
        <p className="text-white/70 max-w-2xl">
          This little demo reveals what the browser and edge headers expose about you without cookies or tracking scripts.
        </p>

        {!revealed ? (
          <div className={CARD_BASE}>
            <p className="text-sm text-white/80">
              I can show what my site can learn about you without cookies or trackers. Nothing is stored.
            </p>
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 transition-transform hover:-translate-y-0.5"
            >
              Show my profile (no tracking)
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <article className={CARD_BASE}>
              <header className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Client</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">Browser API</span>
              </header>
              {clientInfo ? (
                <dl className="space-y-3 text-sm text-white/80">
                  <InfoRow label="Timezone" value={clientInfo.timezone} />
                  <InfoRow label="Language(s)" value={clientInfo.languages} />
                  <InfoRow label="Viewport" value={clientInfo.viewport} />
                  <InfoRow label="Network type" value={clientInfo.networkType} />
                  <InfoRow label="CPU threads" value={clientInfo.cpuThreads} />
                  <InfoRow label="Device memory" value={clientInfo.deviceMemory} />
                  <InfoRow label="Prefers dark mode" value={clientInfo.prefersDark} />
                  <InfoRow label="Prefers reduced motion" value={clientInfo.prefersReducedMotion} />
                  <InfoRow label="Online status" value={clientInfo.onlineStatus} />
                </dl>
              ) : (
                <p className="text-sm text-white/60">Loading client data...</p>
              )}
            </article>

            <article className={CARD_BASE}>
              <header className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Server</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">Edge headers</span>
              </header>
              {loadingServer && !serverInfo ? (
                <SkeletonList />
              ) : error ? (
                <p className="text-sm text-red-300">{error}</p>
              ) : (
                <dl className="space-y-3 text-sm text-white/80">
                  <InfoRow label="Browser" value={serverInfo?.agent.browser ?? UNKNOWN} />
                  <InfoRow label="OS" value={serverInfo?.agent.os ?? UNKNOWN} />
                  <InfoRow label="Masked IP" value={serverInfo?.maskedIp ?? UNKNOWN} />
                  <InfoRow
                    label="Geo"
                    value={`${serverInfo?.geo.city ?? UNKNOWN}, ${serverInfo?.geo.region ?? UNKNOWN}, ${
                      serverInfo?.geo.country ?? UNKNOWN
                    } (${serverInfo?.geo.timezone ?? UNKNOWN})`}
                  />
                  <InfoRow label="Accept-Language" value={serverInfo?.acceptLanguage ?? UNKNOWN} />
                </dl>
              )}
            </article>
          </div>
        )}

        <p className={SMALL_TEXT}>
          Data comes from request headers and browser APIs. Nothing gets persisted.
        </p>
      </div>
    </section>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-white/5 p-3 transition-colors duration-200 hover:bg-white/10">
      <dt className="text-xs uppercase tracking-[0.2em] text-white/60">{label}</dt>
      <dd className="text-sm text-white/90">{value || UNKNOWN}</dd>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-12 rounded-2xl bg-white/5">
          <div className="h-full w-full animate-pulse rounded-2xl bg-white/10" />
        </div>
      ))}
      <p className="text-xs text-white/50">...</p>
    </div>
  );
}

export default AboutYou;

