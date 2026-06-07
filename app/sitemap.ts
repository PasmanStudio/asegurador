import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { categorias, posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const rutas = [
    "",
    "/ramos",
    "/cotizar",
    "/sobre-mi",
    "/contacto",
    "/preguntas-frecuentes",
    "/blog",
    "/siniestros",
    "/privacidad",
    "/terminos",
  ];
  const cotizadores = site.ramos.map((r) => `/cotizar/${r.slug}`);
  const ramos = site.ramos.map((r) => `/ramos/${r.slug}`);
  const blogCats = categorias.map((c) => `/blog/${c.slug}`);
  const blogPosts = posts.map((p) => `/blog/${p.categoria}/${p.slug}`);

  return [...rutas, ...ramos, ...cotizadores, ...blogCats, ...blogPosts].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.7,
    }),
  );
}
