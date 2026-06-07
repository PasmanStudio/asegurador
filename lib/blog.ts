/**
 * Blog con arquitectura SILO: categorías temáticas → artículos.
 * Estructura de URLs:  /blog  ·  /blog/[categoria]  ·  /blog/[categoria]/[slug]
 *
 * El contenido vive acá como data para mantener el SEO ordenado y permitir
 * enlazado interno (clave para posicionar). Para sumar un artículo, agregá un
 * objeto a `posts` con su categoría.
 */

export type Categoria = {
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
};

export type Bloque =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "ul"; items: string[] };

export type Post = {
  slug: string;
  categoria: string; // slug de categoría
  titulo: string;
  descripcion: string; // meta description / excerpt
  fecha: string; // ISO
  keywords: string[];
  cuerpo: Bloque[];
  /** Slug del cotizador relacionado para enlazar (opcional). */
  cotizadorRelacionado?: string;
};

export const categorias: Categoria[] = [
  {
    slug: "autos",
    nombre: "Seguros de Auto",
    descripcion:
      "Todo sobre el seguro de tu vehículo: coberturas, precios, siniestros y consejos para pagar menos.",
    icono: "🚗",
  },
  {
    slug: "hogar-y-familia",
    nombre: "Hogar y Familia",
    descripcion:
      "Cómo proteger tu casa, tu familia y tu patrimonio con la cobertura adecuada.",
    icono: "🏠",
  },
  {
    slug: "consejos",
    nombre: "Consejos y Trámites",
    descripcion:
      "Guías prácticas para entender los seguros y tomar mejores decisiones.",
    icono: "💡",
  },
];

export const posts: Post[] = [
  {
    slug: "que-pasa-si-me-chocan-y-no-tengo-seguro",
    categoria: "autos",
    titulo: "¿Qué pasa si me chocan y no tengo seguro?",
    descripcion:
      "Manejar sin seguro en Argentina tiene consecuencias legales y económicas. Te explico qué arriesgás y cómo cubrirte.",
    fecha: "2026-05-20",
    keywords: ["seguro de auto", "responsabilidad civil", "choque sin seguro", "Argentina"],
    cotizadorRelacionado: "automotor",
    cuerpo: [
      {
        tipo: "p",
        texto:
          "Circular sin seguro de auto no solo es una infracción: te deja expuesto a pagar de tu bolsillo todos los daños de un accidente. En Argentina, el seguro de Responsabilidad Civil es obligatorio para todos los vehículos.",
      },
      { tipo: "h2", texto: "Las consecuencias de no tener seguro" },
      {
        tipo: "ul",
        items: [
          "Multas y retención del vehículo en un control de tránsito.",
          "Si chocás a alguien, pagás vos los daños materiales y lesiones.",
          "Si te chocan a vos y el otro no tiene seguro, el reclamo se complica.",
        ],
      },
      { tipo: "h2", texto: "¿Qué cobertura mínima conviene?" },
      {
        tipo: "p",
        texto:
          "La Responsabilidad Civil cubre los daños que le causes a terceros, pero no tu propio auto. Si querés cubrir robo, incendio o destrucción total, conviene un Terceros Completo. Para autos más nuevos, el Todo Riesgo con franquicia suele ser la mejor relación precio-tranquilidad.",
      },
      {
        tipo: "p",
        texto:
          "Lo importante es no quedar descubierto. Te ayudo a comparar opciones y encontrar una cobertura que se ajuste a tu auto y a tu presupuesto.",
      },
    ],
  },
  {
    slug: "terceros-completo-o-todo-riesgo",
    categoria: "autos",
    titulo: "Terceros completo o todo riesgo: ¿cuál me conviene?",
    descripcion:
      "Las diferencias entre terceros completo y todo riesgo, y cómo elegir según tu auto, tu uso y tu presupuesto.",
    fecha: "2026-05-28",
    keywords: ["terceros completo", "todo riesgo", "franquicia", "seguro de auto"],
    cotizadorRelacionado: "automotor",
    cuerpo: [
      {
        tipo: "p",
        texto:
          "Es la pregunta más común al asegurar un auto. La respuesta depende del valor del vehículo, de cuánto lo usás y de cuánto estás dispuesto a pagar mes a mes.",
      },
      { tipo: "h2", texto: "Terceros completo" },
      {
        tipo: "p",
        texto:
          "Cubre responsabilidad civil + incendio, robo y destrucción total. No cubre daños parciales de tu auto (por ejemplo, una abolladura). Es la opción más elegida por su buena relación precio-cobertura.",
      },
      { tipo: "h2", texto: "Todo riesgo" },
      {
        tipo: "p",
        texto:
          "Suma la cobertura de daños parciales de tu propio vehículo, con una franquicia (un monto fijo que pagás vos en cada siniestro). Conviene en autos nuevos o de alto valor.",
      },
      { tipo: "h2", texto: "¿Cómo decidir?" },
      {
        tipo: "ul",
        items: [
          "Auto con varios años y valor medio → Terceros completo suele alcanzar.",
          "Auto 0 km o de alto valor → Todo riesgo te da más tranquilidad.",
          "Mirá el monto de la franquicia: a menor franquicia, mayor prima.",
        ],
      },
    ],
  },
  {
    slug: "seguro-de-hogar-que-cubre",
    categoria: "hogar-y-familia",
    titulo: "Seguro de hogar: qué cubre y qué no",
    descripcion:
      "Incendio, robo, daños por agua y responsabilidad civil: te explico qué incluye un seguro de hogar y para qué sirve.",
    fecha: "2026-05-30",
    keywords: ["seguro de hogar", "incendio", "robo", "responsabilidad civil"],
    cotizadorRelacionado: "hogar",
    cuerpo: [
      {
        tipo: "p",
        texto:
          "Tu casa es donde construís tus recuerdos, y también una de tus mayores inversiones. Un seguro de hogar te protege ante imprevistos que pueden salir muy caros.",
      },
      { tipo: "h2", texto: "Qué suele cubrir" },
      {
        tipo: "ul",
        items: [
          "Incendio del edificio y del contenido.",
          "Robo y hurto de tus pertenencias.",
          "Daños por agua (roturas de cañerías, filtraciones).",
          "Cristales y responsabilidad civil hacia terceros.",
        ],
      },
      { tipo: "h2", texto: "Qué no cubre (en general)" },
      {
        tipo: "p",
        texto:
          "El desgaste por uso, las fallas de mantenimiento o los daños preexistentes no entran. Por eso es clave declarar bien el contenido y revisar las sumas aseguradas.",
      },
      {
        tipo: "p",
        texto:
          "Tanto si sos propietario como inquilino, te ayudo a armar la cobertura justa para tu vivienda.",
      },
    ],
  },
  {
    slug: "preguntas-antes-de-contratar-un-seguro",
    categoria: "consejos",
    titulo: "5 preguntas que tenés que hacerte antes de contratar un seguro",
    descripcion:
      "Una guía simple para no equivocarte al contratar: qué mirar más allá del precio para elegir bien tu seguro.",
    fecha: "2026-06-01",
    keywords: ["consejos seguros", "cómo contratar un seguro", "productor de seguros"],
    cuerpo: [
      {
        tipo: "p",
        texto:
          "El seguro más barato no siempre es el mejor. Antes de firmar, hacete estas preguntas para tomar una decisión informada.",
      },
      {
        tipo: "ul",
        items: [
          "¿Qué cubre exactamente y qué queda afuera?",
          "¿Cuál es la suma asegurada y alcanza para reponer lo que aseguro?",
          "¿Qué franquicia o deducible tiene?",
          "¿Cómo y en cuánto tiempo se resuelve un siniestro?",
          "¿Tengo a alguien que me asesore y me acompañe si pasa algo?",
        ],
      },
      { tipo: "h2", texto: "El valor de un productor asesor" },
      {
        tipo: "p",
        texto:
          "Un productor matriculado compara compañías por vos, te explica la letra chica y te acompaña ante un siniestro, sin costo extra. Esa es la diferencia entre comprar un seguro y estar bien asegurado.",
      },
    ],
  },
];

// ─────────────────────────── Helpers ───────────────────────────
export function getCategoria(slug: string): Categoria | undefined {
  return categorias.find((c) => c.slug === slug);
}

export function getPost(categoria: string, slug: string): Post | undefined {
  return posts.find((p) => p.categoria === categoria && p.slug === slug);
}

export function postsDeCategoria(categoria: string): Post[] {
  return posts
    .filter((p) => p.categoria === categoria)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function postsRecientes(n = 6): Post[] {
  return [...posts].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, n);
}
