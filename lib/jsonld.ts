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
