import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Arma la metadata de una página a partir de su título, descripción y ruta.
 *
 * ¿Por qué un helper y no escribir el objeto a mano en cada page.tsx?
 * Porque Next NO mergea `openGraph` entre layout y página: si una página no
 * declara su propio bloque `openGraph`, hereda el del layout *entero* — título,
 * descripción y URL del home incluidos. Sin esto, compartir /ramos/hogar por
 * WhatsApp muestra el preview de la portada. Centralizarlo evita que vuelva a
 * pasar cada vez que se agrega una página.
 *
 * Devuelve siempre los tres bloques que importan:
 *  - `alternates.canonical` → le dice a Google cuál es la URL oficial.
 *  - `openGraph`            → preview en WhatsApp, Instagram, Facebook.
 *  - `twitter`              → preview en X.
 *
 * La imagen se declara a mano por el mismo motivo: `app/opengraph-image.tsx`
 * se aplica sola solo mientras la página NO declare su propio `openGraph`.
 * En cuanto lo declara, reemplaza el bloque completo y la imagen desaparece,
 * dejando el preview sin foto (que es lo que más se mira al compartir).
 *
 * @param path Ruta absoluta del sitio, empezando con "/" ("" para el home).
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const base = site.url.replace(/\/$/, "");
  // Ruta de la OG image generada por app/opengraph-image.tsx. Es relativa:
  // `metadataBase` (definido en el layout) la convierte en URL absoluta.
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${site.nombre} — Productora Asesora de Seguros`,
  };
  // El template del layout (`%s | Sabrina Descalzi`) aplica solo al <title>.
  // Para OG y Twitter armamos el título completo a mano.
  const fullTitle = path === "" ? title : `${title} | ${site.nombre}`;

  return {
    title,
    description,
    alternates: { canonical: path === "" ? "/" : path },
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: site.nombre,
      title: fullTitle,
      description,
      url: `${base}${path}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
