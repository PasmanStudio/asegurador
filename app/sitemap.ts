import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Fecha de última revisión del contenido del sitio.
 *
 * 👉 ACTUALIZAR cuando se edite el contenido de las páginas.
 *
 * Antes acá iba `new Date()`, que devuelve la fecha del build: cada deploy —
 * aunque solo cambiara un color — le decía a Google que todas las páginas se
 * habían modificado. Google aprende a ignorar un `lastmod` que miente. Una
 * fecha fija que se toca solo cuando el contenido cambia de verdad es una
 * señal que sí se respeta.
 */
const LAST_CONTENT_UPDATE = new Date("2026-09-21");

/** Prioridad relativa de cada sección dentro del sitio (0 a 1). */
function priorityFor(path: string): number {
  if (path === "") return 1;
  if (path === "/cotizar" || path === "/ramos") return 0.9;
  if (path.startsWith("/cotizar/") || path.startsWith("/ramos/")) return 0.8;
  if (path === "/privacidad" || path === "/terminos") return 0.3;
  return 0.6;
}

/** Cada cuánto cambia el contenido de cada sección. */
function changeFrequencyFor(path: string): "monthly" | "yearly" {
  return path === "/privacidad" || path === "/terminos" ? "yearly" : "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const routes = [
    "",
    "/ramos",
    "/cotizar",
    "/sobre-mi",
    "/contacto",
    "/preguntas-frecuentes",
    "/siniestros",
    "/privacidad",
    "/terminos",
  ];
  const quoteRoutes = site.ramos.map((r) => `/cotizar/${r.slug}`);
  const ramoRoutes = site.ramos.map((r) => `/ramos/${r.slug}`);

  return [...routes, ...ramoRoutes, ...quoteRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: changeFrequencyFor(path),
    priority: priorityFor(path),
  }));
}
