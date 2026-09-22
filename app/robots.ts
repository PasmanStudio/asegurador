import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Las rutas de /api devuelven JSON (cotizaciones y leads): no son páginas
      // y no aportan nada en los resultados de búsqueda.
      disallow: "/api/",
    },
    sitemap: `${base}/sitemap.xml`,
    // Le dice a Google cuál es el dominio oficial del sitio.
    host: base,
  };
}
