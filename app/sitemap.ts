import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const rutas = [
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
  const cotizadores = site.ramos.map((r) => `/cotizar/${r.slug}`);
  const ramos = site.ramos.map((r) => `/ramos/${r.slug}`);

  return [...rutas, ...ramos, ...cotizadores].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.7,
    }),
  );
}
