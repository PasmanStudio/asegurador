"use client";

import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Embebe el calendario de Calendly para agendar una llamada. Se muestra solo si
 * `site.calendly` tiene una URL. Cargá la URL real en lib/site.ts.
 */
export default function CalendlyEmbed() {
  if (!site.calendly) return null;

  return (
    <div>
      <div
        className="calendly-inline-widget overflow-hidden rounded-2xl border border-slate-200"
        data-url={site.calendly}
        style={{ minWidth: "320px", height: "640px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
