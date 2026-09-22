# SEO del sitio

Qué está implementado en el código y qué falta hacer a mano (todo gratis).

## En el código

| Qué | Dónde |
| --- | --- |
| Título, descripción, canónica, OG y Twitter de cada página | `lib/seo.ts` → `pageMetadata()` |
| Ficha de la productora para Google (schema.org) | `app/layout.tsx` |
| Migas de pan + catálogo de coberturas por ramo | `app/ramos/[slug]/page.tsx` |
| Preguntas frecuentes como `FAQPage` | `app/preguntas-frecuentes/page.tsx` |
| Imagen de preview al compartir (1200×630) | `app/opengraph-image.tsx` |
| Sitemap y robots | `app/sitemap.ts`, `app/robots.ts` |

### Al agregar una página nueva

Usá siempre el helper, no escribas el objeto `metadata` a mano:

```tsx
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Título de la página",      // sin " | Sabrina Descalzi": lo agrega el template
  description: "Entre 120 y 160 caracteres, con el beneficio concreto.",
  path: "/la-ruta",                  // tiene que coincidir con la carpeta en app/
});
```

Después sumá la ruta a la lista de `app/sitemap.ts`.

> **Por qué el helper y no `metadata` a mano:** Next *reemplaza* el bloque
> `openGraph` entero cuando una página lo define — no lo mezcla con el del
> layout. Escribirlo a mano hace que la página se comparta con el título del
> home o directamente sin imagen. El helper arma los tres bloques juntos
> (canónica, OG y Twitter) para que eso no pueda pasar.

### Al editar el contenido de las páginas

Actualizá `LAST_CONTENT_UPDATE` en `app/sitemap.ts`. Es la fecha que ve Google para
saber qué volver a rastrear.

## Lo que falta hacer a mano (gratis, ~1 hora)

Esto no se puede programar: son cuentas que hay que crear con el mail de Sabrina.

1. **Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console)
   Es lo más importante de la lista. Agregar la propiedad `sabrinadescalziseguros.com`,
   verificar el dominio (Vercel lo hace con un registro DNS) y enviar el sitemap:
   `https://www.sabrinadescalziseguros.com/sitemap.xml`.
   Sin esto Google igual va a indexar el sitio, pero a su ritmo y a ciegas: no hay
   forma de ver por qué búsquedas aparece ni de pedir que re-indexe una página.

2. **Perfil de Empresa de Google** — [business.google.com](https://business.google.com)
   Para un PAS es el canal gratuito que más consultas trae: es lo que hace que
   aparezca en el mapa y en "productor de seguros cerca mío". Al ser atención
   100% online, se configura como *área de servicio* (sin dirección pública).
   Cargar: rubro "Agencia de seguros", teléfono, sitio web, horarios y fotos.
   **Pedirle una reseña a cada cliente que queda conforme** — las reseñas son el
   factor que más pesa en el ranking local, y son gratis.

3. **Bing Webmaster Tools** — [bing.com/webmasters](https://www.bing.com/webmasters)
   Importa la propiedad directo desde Search Console en dos clics. Bing es poco
   tráfico, pero es de donde ChatGPT saca sus resultados de búsqueda web.

4. **Validar los datos estructurados** — [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
   Pegar la URL del home, de `/ramos/automotor` y de `/preguntas-frecuentes`.
   Tienen que dar sin errores.

5. **Coherencia de datos (NAP)** — nombre, teléfono y ciudad tienen que estar
   escritos **igual** en el sitio, en el Perfil de Empresa y en Instagram. Google
   los cruza para confirmar que es la misma persona; si no coinciden, desconfía.

## Qué NO hacer

- **No agregar `aggregateRating` al schema** sin reseñas públicas y verificables
  que lo respalden. Google lo detecta como spam y puede sacar todos los
  resultados enriquecidos del sitio, no solo ese.
- **No comprar enlaces.** Es la vía más rápida a una penalización manual.
- Las métricas de `statsCreibles` en `lib/site.ts` (500 clientes, 4.9★) están
  marcadas como pendientes de reemplazar por datos reales. Mientras sean
  estimadas, que sigan solo como texto en la página y fuera del schema.
