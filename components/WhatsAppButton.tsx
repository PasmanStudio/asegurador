"use client";

import { waLink } from "@/lib/site";
import { trackWhatsApp } from "@/lib/analytics";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/** Botón flotante de WhatsApp, visible en todas las páginas. */
export default function WhatsAppButton() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp("boton_flotante")}
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-[22px] w-[22px]" />
      WhatsApp
    </a>
  );
}
