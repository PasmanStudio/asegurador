/**
 * Configuración central del sitio.
 *
 * 👉 EDITAR ESTOS DATOS con la información real del productor.
 * Todo lo que se muestra en la web (nombre, contacto, ramos, compañías)
 * sale de este archivo para tener una sola fuente de verdad.
 */

export type Ramo = {
  /** slug para la URL: /ramos/[slug] */
  slug: string;
  nombre: string;
  /** Resumen corto para tarjetas y meta description */
  resumen: string;
  /** Descripción larga para la página del ramo */
  descripcion: string;
  /** Ícono emoji simple (se puede reemplazar por SVG más adelante) */
  icono: string;
  /** Coberturas / beneficios destacados */
  coberturas: string[];
  /** Si este ramo tiene cotizador online disponible */
  cotizable?: boolean;
};

export type Compania = {
  nombre: string;
  /** Estado de integración del cotizador */
  integracion: "api" | "pendiente" | "manual";
  /** Ruta al logo en /public (png/svg/webp con fondo transparente) */
  logo?: string;
  /** Si el logo es blanco (hecho para fondo oscuro), lo invertimos a negro para que se vea en el chip blanco. */
  logoInvert?: boolean;
  /** Nota interna opcional */
  nota?: string;
};

export const site = {
  // ───────────────────────────── Datos del productor ─────────────────────────
  nombre: "Sabrina Descalzi",
  // Iniciales para el logo monograma
  iniciales: "SD",
  // Razón / nombre comercial que aparece en el header y footer
  marca: "Productora Asesora de Seguros",
  // Matrícula de Productor Asesor de Seguros (SSN). Obligatorio mostrarla.
  matriculaSSN: "Matrícula Nacional N° 89115",
  // 👉 COMPLETAR/VERIFICAR con datos reales (los usan los textos legales):
  nombreLegal: "Sabrina Descalzi", // nombre y apellido como figuran en la matrícula
  cuit: "", // ej "27-29752642-4". Si queda vacío, no se muestra en los textos.
  domicilioLegal: "Ciudad Autónoma de Buenos Aires, Argentina",
  descripcionCorta:
    "Te ayudo a elegir un seguro que se adapte a tus necesidades. Más de 10 años asesorando en autos, hogar, comercio y más, con la mejor cobertura al precio justo.",
  // Frase corta de marca (la usa en su Instagram)
  tagline: "Te ayudo a elegir un seguro que se adapte a tus necesidades.",

  // Checklist del hero
  heroChecklist: [
    "Atención 100% online en todo el país",
    "Comparo las mejores compañías por vos",
    "Respuesta rápida y trato cercano",
  ],

  // ───────────────────────────── Contacto ────────────────────────────────────
  // Teléfono en formato internacional SIN signos, para wa.me
  whatsapp: "5491136542657",
  // Cómo se muestra el teléfono al usuario
  telefonoDisplay: "+54 9 11 3654-2657",
  email: "sabridescalzi@gmail.com",
  ciudad: "Buenos Aires, Argentina",
  // Atención 100% online en todo el país
  atencion: "Atención online en toda Argentina",
  instagram: "https://www.instagram.com/sabrinadescalzi.ar/",

  // Link de Calendly para agendar una llamada.
  // Vacío ("") = la sección de agendar no se muestra (estado actual: Sabrina
  // todavía no tiene cuenta de Calendly).
  // 👉 Para activarla: pegá acá la URL real de tu evento, p. ej.
  //    "https://calendly.com/tu-usuario/llamada-30min"
  calendly: "",

  // URL pública del sitio (para metadata / sitemap). Cambiar al dominio real.
  url: "https://www.sabrinadescalzi.com.ar",

  // ────────────────── Beneficios "¿Por qué elegirme?" ───────────────────────
  beneficios: [
    {
      icon: "Handshake" as const,
      titulo: "Asesoramiento personalizado",
      texto:
        "No te vendo un seguro: te ayudo a elegir la cobertura justa para tu situación, sin pagar de más.",
    },
    {
      icon: "Building2" as const,
      titulo: "Las mejores compañías",
      texto:
        "Trabajo con las aseguradoras líderes del país para conseguirte la mejor relación precio-cobertura.",
    },
    {
      icon: "Zap" as const,
      titulo: "Respuesta rápida",
      texto:
        "Cotización ágil y acompañamiento real ante un siniestro. Estoy cuando me necesitás.",
    },
  ],

  // ────────── Comparativa "¿Por qué una productora?" ─────────────────────────
  comparativa: [
    { tema: "Comparar compañías", solo: "Las recorrés una por una", conmigo: "Lo hago yo por vos" },
    { tema: "Costo del asesoramiento", solo: "Sin guía experta", conmigo: "Sin cargo: ya viene en la prima" },
    { tema: "La letra chica", solo: "La interpretás solo/a", conmigo: "Te explico qué cubre y qué no" },
    { tema: "Si tenés un siniestro", solo: "Gestionás con la compañía solo/a", conmigo: "Te acompaño hasta resolverlo" },
    { tema: "Quién te atiende", solo: "Un 0800 distinto cada vez", conmigo: "Siempre yo, por WhatsApp" },
  ],

  // ──────── Métricas creíbles (con count-up) ──────────────────────────────────
  // NOTA: reemplazar con datos reales cuando estén disponibles.
  statsCreibles: [
    { num: 10, prefix: "+", suffix: "", decimals: 0, etiqueta: "años asesorando" },
    { num: 500, prefix: "+", suffix: "", decimals: 0, etiqueta: "clientes acompañados" },
    { num: 6, prefix: "", suffix: "", decimals: 0, etiqueta: "compañías que comparo" },
    { num: 4.9, prefix: "", suffix: "★", decimals: 1, etiqueta: "en reseñas" },
  ],

  // ──────────────────────── Cómo trabajo (proceso) ───────────────────────────
  pasos: [
    {
      numero: "1",
      titulo: "Me contás qué necesitás",
      texto:
        "Por WhatsApp o el formulario. Me decís qué querés asegurar y tu situación.",
    },
    {
      numero: "2",
      titulo: "Comparo por vos",
      texto:
        "Cotizo en las principales compañías y te cuento las diferentes opciones.",
    },
    {
      numero: "3",
      titulo: "Elegís y contratás",
      texto:
        "Te recomiendo la mejor relación precio-cobertura y gestiono la emisión de tu póliza.",
    },
    {
      numero: "4",
      titulo: "Te acompaño siempre",
      texto:
        "Ante un siniestro o una duda, estoy de tu lado para que se resuelva rápido.",
    },
  ],

  // ───────────────────────────── Ramos / Servicios ───────────────────────────
  ramos: [
    {
      slug: "automotor",
      nombre: "Seguro de Auto",
      resumen:
        "¿Estás pagando mucho por el seguro de tu auto? Escribime y bajamos el costo con la cobertura justa.",
      descripcion:
        "Te ayudo a comparar coberturas de automotor entre las principales compañías y elegir la que mejor se adapta a tu vehículo y tu presupuesto, desde responsabilidad civil obligatoria hasta todo riesgo con franquicia. También seguros para autos híbridos y eléctricos.",
      icono: "🚗",
      coberturas: [
        "Responsabilidad Civil",
        "Responsabilidad Civil + robo total",
        "Todo riesgo con franquicia",
        "Terceros completos",
        "Terceros completos premium",
      ],
      cotizable: true,
    },
    {
      slug: "motos",
      nombre: "Seguro de Moto",
      resumen:
        "Asegurá tu moto y andá tranquilo, con coberturas pensadas para cada tipo de uso.",
      descripcion:
        "Cobertura para tu moto adaptada a tu uso: responsabilidad civil, robo e incendio y coberturas amplias. Te asesoro para que estés protegido sin pagar de más.",
      icono: "🏍️",
      coberturas: [
        "Responsabilidad Civil",
        "Servicio de asistencia",
        "Robo o hurto total",
        "Incendio total",
        "Destrucción total",
      ],
      cotizable: true,
    },
    {
      slug: "hogar",
      nombre: "Seguro de Hogar",
      resumen:
        "Protegé tu hogar y lo que amás. Tu casa es donde construís recuerdos.",
      descripcion:
        "Cobertura integral para tu vivienda: incendio del edificio y contenido, robo, daños por agua, cristales y responsabilidad civil hacia terceros. Ideal para propietarios e inquilinos, para brindarle tranquilidad a tu familia.",
      icono: "🏠",
      coberturas: [
        "Incendio de edificio y contenido",
        "Robo y hurto de contenido",
        "Daños por agua y cristales",
        "Responsabilidad civil",
        "Cobertura todo riesgo electro",
      ],
    },
    {
      slug: "asistencia-viajero",
      nombre: "Asistencia al Viajero",
      resumen:
        "¿Estás por viajar? Contratá tu asistencia y viajá tranquilo con cobertura 24/7.",
      descripcion:
        "Asistencia médica y personal las 24 horas en todo el mundo: urgencias, medicamentos, pérdida de equipaje, demoras y mucho más. Asesorate conmigo y contratá la mejor cobertura para tu viaje.",
      icono: "✈️",
      coberturas: [
        "Asistencia médica por enfermedad o accidente",
        "Cobertura de equipaje",
        "Asistencia 24 hs en español",
        "Planes por días y destino",
      ],
      cotizable: true,
    },
    {
      slug: "tecnologia",
      nombre: "Tecnología y Equipos",
      resumen:
        "Protegé tu herramienta de trabajo: asegurá tu notebook y trabajá tranquilo.",
      descripcion:
        "Cobertura para notebooks, celulares y equipos electrónicos ante robo, daño accidental y más. Ideal si tu computadora o tu celular son tu herramienta de trabajo.",
      icono: "💻",
      coberturas: [
        "Robo y hurto",
        "Daño accidental",
        "Cobertura dentro y fuera del hogar",
        "Equipos electrónicos",
      ],
    },
    {
      slug: "celulares",
      nombre: "Seguro de Celular",
      resumen:
        "Protegé tu celular ante robo, hurto y daño accidental, dentro y fuera de casa.",
      descripcion:
        "Cobertura para tu teléfono ante robo, hurto y roturas accidentales (pantalla, líquidos), con respaldo dentro y fuera del país. Ideal para no quedarte sin tu herramienta del día a día.",
      icono: "📱",
      coberturas: [
        "Robo y hurto",
        "Daño accidental y rotura de pantalla",
        "Cobertura en todo el país",
        "Gestión rápida del siniestro",
      ],
    },
    {
      slug: "accidentes-personales",
      nombre: "Accidentes Personales",
      resumen:
        "Cobertura ante accidentes que te dejen sin poder trabajar, para vos y tu familia.",
      descripcion:
        "Protección económica ante accidentes: indemnización por muerte o invalidez accidental, gastos médicos y asistencia. Ideal para autónomos, deportistas y trabajadores independientes.",
      icono: "🩹",
      coberturas: [
        "Muerte accidental",
        "Invalidez total o parcial",
        "Gastos médicos por accidente",
        "Cobertura las 24 horas",
      ],
    },
  ] as Ramo[],

  // ───────────────────────────── Métricas / confianza ────────────────────────
  stats: [
    { valor: "+10", etiqueta: "años de experiencia" },
    { valor: "100%", etiqueta: "atención online" },
    { valor: "Minutos", etiqueta: "tiempo de respuesta" },
    { valor: "Todo el país", etiqueta: "cobertura" },
  ],

  // Testimonios reales de clientes.
  testimonios: [
    {
      texto:
        "Necesitaba renovar el seguro del auto y no sabía qué cobertura convenía. Sabrina comparó tres compañías y terminé pagando menos con mejor protección.",
      autor: "Luciana A.",
      face: "/face1.png",
    },
    {
      texto:
        "Choqué el auto y no sabía cómo empezar el trámite. Sabrina gestionó todo con la compañía y en dos semanas resolví el siniestro sin dolores de cabeza.",
      autor: "Matías R.",
      face: "/face5.png",
    },
    {
      texto:
        "Me ayudó a conseguir el seguro del hogar siendo inquilina. Me sorprendió lo accesible que salió y lo rápido que lo resolvimos.",
      autor: "Romina C.",
      face: "/face3.png",
    },
    {
      texto:
        "Tuve un problema con una granizada que me abolló el auto. Sabrina hizo el reclamo y le dieron seguimiento hasta que la compañía pagó el arreglo.",
      autor: "Diego P.",
      face: "/face6.png",
    },
    {
      texto:
        "Una profesional de primera. Siempre está a disposición y da un servicio a la medida de uno.",
      autor: "Valeria G.",
      face: "/face4.png",
    },
    {
      texto:
        "Siempre solucionando cualquier problema. Responde al toque y te explica todo sin apurarte. Súper recomendable.",
      autor: "Natalia L.",
      face: "/face2.png",
    },
  ],

  // ───────────────────────────── Compañías ───────────────────────────────────
  companias: [
    { nombre: "Federación Patronal", integracion: "api", logo: "/FED-PATRONAL-1024x256.png", nota: "API REST (OAuth) — cotizador online" },
    { nombre: "Mercantil Andina", integracion: "pendiente", logo: "/mercantilandina.svg" },
    { nombre: "La Meridional", integracion: "pendiente", logo: "/meridional-logo.svg" },
    { nombre: "Galicia Seguros", integracion: "pendiente", logo: "/galiciaSeguros.webp" },
    { nombre: "Barbuss", integracion: "pendiente", logo: "/barbuss.png" },
    { nombre: "Coris", integracion: "pendiente", logo: "/coris-color.svg", nota: "Asistencia al viajero" },
  ] as Compania[],
};

export type Site = typeof site;

/** Devuelve un ramo por slug, o undefined. */
export function getRamo(slug: string): Ramo | undefined {
  return site.ramos.find((r) => r.slug === slug);
}

/** Mensaje por defecto, con tono cercano (estilo de Sabrina). */
export const waDefaultMsg =
  "Hola Sabri, quiero hacerte una consulta sobre cotizaciones de seguro";

/**
 * Arma un link de WhatsApp (wa.me) con un mensaje prellenado.
 * Si no se pasa mensaje, usa el mensaje por defecto.
 */
export function waLink(mensaje: string = waDefaultMsg): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
