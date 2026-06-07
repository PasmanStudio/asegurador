/**
 * Helper para registrar eventos de conversión en Google Analytics 4.
 * Es seguro llamarlo siempre: si GA no está cargado, no hace nada.
 */
type GtagFn = (
  command: "event",
  action: string,
  params?: Record<string, unknown>,
) => void;

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === "function") {
    gtag("event", action, params);
  }
}

/** Conversión: el usuario envió un formulario de cotización/contacto. */
export function trackLead(ramo: string) {
  trackEvent("generate_lead", { ramo });
}

/** Conversión: el usuario hizo click en un contacto de WhatsApp. */
export function trackWhatsApp(origen: string) {
  trackEvent("click_whatsapp", { origen });
}
