/**
 * Serializa un objeto a JSON-LD seguro para insertar en un <script
 * type="application/ld+json"> via dangerouslySetInnerHTML. Aunque la data sea
 * controlada (config del sitio, posts, FAQs), escapamos los caracteres con
 * significado en HTML para que una secuencia como `</` + `script>` dentro de un
 * string nunca cierre el tag ni permita inyeccion. El contenido se parsea como
 * JSON (no como JS), por lo que escapar `<`, `>` y `&` es suficiente.
 */
const ESCAPES: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
};

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/[<>&]/g, (c) => ESCAPES[c]);
}

/**
 * Arma un BreadcrumbList de schema.org. Google lo usa para mostrar la ruta de
 * navegacion (Inicio > Blog > Autos > Articulo) en vez de la URL cruda en los
 * resultados de busqueda, lo que mejora el CTR.
 *
 * `items` va en orden, del nivel mas general al mas especifico. Las rutas son
 * relativas (empiezan con "/") y se completan con la URL del sitio.
 */
export function breadcrumbJsonLd(
  base: string,
  items: { name: string; path: string }[],
) {
  const root = base.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${root}${item.path}`,
    })),
  };
}
