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

  // ──────────────────────── Cómo trabajo (proceso) ───────────────────────────
  pasos: [
    {
      numero: "1",
      titulo: "Me contás qué necesitás",
      texto:
        "Por WhatsApp, el formulario o una llamada. Me decís qué querés asegurar y tu situación.",
    },
    {
      numero: "2",
      titulo: "Comparo por vos",
      texto:
        "Cotizo en las principales compañías y te explico las opciones en criollo, sin letra chica.",
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
        "Responsabilidad Civil (obligatoria)",
        "Terceros completo (incendio, robo y total)",
        "Todo riesgo con franquicia",
        "Autos híbridos y eléctricos",
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
        "Robo e incendio",
        "Cobertura por accidente",
        "Asesoramiento personalizado",
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
        "Daños por agua y eléctricos",
        "Responsabilidad civil",
      ],
    },
    {
      slug: "comercio",
      nombre: "Seguro de Comercio",
      resumen:
        "Protegé tu negocio: incendio, robo, cristales y responsabilidad civil.",
      descripcion:
        "Cobertura pensada para comercios y pymes: protección del local y la mercadería ante incendio y robo, cristales, responsabilidad civil y más, para que tu actividad no se detenga.",
      icono: "🏪",
      coberturas: [
        "Incendio de edificio y mercadería",
        "Robo de contenido y dinero",
        "Cristales y vidrios",
        "Responsabilidad civil de explotación",
      ],
    },
    {
      slug: "art",
      nombre: "ART",
      resumen:
        "Aseguradora de Riesgos del Trabajo para tu empresa y tus empleados, según la ley.",
      descripcion:
        "Cumplí con la normativa laboral y protegé a tu personal ante accidentes y enfermedades de trabajo. Te asesoro para elegir la ART adecuada para tu actividad y plantilla.",
      icono: "👷",
      coberturas: [
        "Cobertura de accidentes de trabajo",
        "Enfermedades profesionales",
        "Prestaciones médicas",
        "Cumplimiento legal",
      ],
    },
    {
      slug: "caucion",
      nombre: "Seguro de Caución",
      resumen:
        "Garantías y seguros de caución para contratos, alquileres y licitaciones.",
      descripcion:
        "Resolvé las garantías que te piden en contratos, alquileres, obras o licitaciones con un seguro de caución. Te ayudo a gestionarlo de forma ágil y al mejor costo.",
      icono: "📑",
      coberturas: [
        "Garantía de alquiler",
        "Mantenimiento de oferta",
        "Ejecución de contrato",
        "Garantías aduaneras y de obra",
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
      slug: "vida-familia",
      nombre: "Seguro de Vida",
      resumen:
        "Tranquilidad para vos y tu familia con coberturas de vida y accidentes personales.",
      descripcion:
        "Protegé a quienes más querés con un seguro de vida adaptado a tu etapa: cobertura por fallecimiento, invalidez y accidentes personales, con sumas aseguradas a tu medida.",
      icono: "💙",
      coberturas: [
        "Fallecimiento por cualquier causa",
        "Invalidez total y permanente",
        "Accidentes personales",
        "Sumas aseguradas flexibles",
      ],
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
    {
      slug: "retiro",
      nombre: "Seguro de Retiro",
      resumen:
        "Armá tu futuro con un plan de ahorro a largo plazo para complementar tu jubilación.",
      descripcion:
        "Un seguro de retiro te permite ahorrar de forma planificada para complementar tu jubilación y cumplir tus objetivos. Te ayudo a definir el plan que se ajuste a tu capacidad de ahorro y horizonte.",
      icono: "🌱",
      coberturas: [
        "Ahorro a largo plazo",
        "Complemento jubilatorio",
        "Aportes flexibles",
        "Beneficios impositivos",
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

  // Testimonios (de comentarios reales en su Instagram). 👉 EDITAR/SUMAR.
  testimonios: [
    {
      texto:
        "Una profesional de primera. Siempre está a disposición y da un servicio a la medida de uno.",
      autor: "Luciana A.",
    },
    {
      texto: "Siempre solucionando cualquier problema. Súper recomendable.",
      autor: "Natalia L.",
    },
    {
      texto:
        "Me asesoró para elegir la mejor cobertura para mi auto y terminé pagando menos. Muy clara en todo.",
      autor: "Cliente de Sabrina",
    },
  ],

  // ───────────────────────────── Compañías ───────────────────────────────────
  companias: [
    { nombre: "Federación Patronal", integracion: "api", logo: "/FED-PATRONAL-1024x256.png", nota: "API REST (OAuth) — cotizador online" },
    { nombre: "Mercantil Andina", integracion: "pendiente", logo: "/mercantilandina.svg" },
    { nombre: "La Meridional", integracion: "pendiente", logo: "/meridional-logo.svg" },
    { nombre: "Galicia Seguros", integracion: "pendiente", logo: "/galiciaSeguros.webp" },
    { nombre: "Barbuss", integracion: "pendiente", logo: "/barbuss.png" },
    { nombre: "Coris", integracion: "pendiente", logo: "/CorisAsistencia.png", nota: "Asistencia al viajero" },
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
