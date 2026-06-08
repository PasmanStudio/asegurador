import { z } from "zod";

/** Esquema de validación del lead / pre-cotización. */
export const leadSchema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre").max(80),
  telefono: z.string().min(6, "Ingresá un teléfono válido").max(30),
  email: z.string().email("Email inválido").max(120).optional().or(z.literal("")),
  ramo: z.string().min(1, "Elegí un tipo de seguro").max(60),
  mensaje: z.string().max(2000).optional().or(z.literal("")),
  /**
   * Honeypot anti-bot: campo oculto que un humano nunca completa. El route
   * handler lo revisa; si viene con texto, descarta el lead como spam. Se acepta
   * en el schema (cualquier string) para poder fingir éxito sin revelar la trampa.
   */
  website: z.string().max(200).optional().or(z.literal("")),
});

export type Lead = z.infer<typeof leadSchema>;

// ─── Emojis y saludo personalizado por ramo ───────────────────────────────────

/** Emoji representativo de cada ramo, para el encabezado del mensaje. */
const RAMO_EMOJI: Record<string, string> = {
  "Seguro de Auto":           "🚗",
  "Seguro de Moto":           "🏍️",
  "Seguro de Hogar":          "🏠",
  "Asistencia al Viajero":    "✈️",
  "Tecnología y Equipos":     "💻",
  "Seguro de Celular":        "📱",
  "Accidentes Personales":    "🩹",
  "Seguro de Comercio":       "🏪",
};

/** Texto del objeto del seguro en el saludo (más natural que el nombre completo). */
const RAMO_OBJETO: Record<string, string> = {
  "Seguro de Auto":           "mi auto",
  "Seguro de Moto":           "mi moto",
  "Seguro de Hogar":          "mi hogar",
  "Asistencia al Viajero":    "asistencia al viajero",
  "Tecnología y Equipos":     "mis equipos de tecnología",
  "Seguro de Celular":        "mi celular",
  "Accidentes Personales":    "accidentes personales",
  "Seguro de Comercio":       "mi comercio",
};

// ─── Formateadores de fecha ───────────────────────────────────────────────────

/** Convierte "1990-01-01" (formato HTML date) a "01/01/1990" para lectura humana. */
function formatFecha(v: string): string {
  if (!v) return v;
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : v;
}

/**
 * Detecta campos que probablemente son fechas (contienen un valor ISO YYYY-MM-DD)
 * y los formatea para lectura humana antes de incluirlos en el mensaje.
 */
function humanizarValor(label: string, valor: string): string {
  const formatted = formatFecha(valor);
  return formatted;
}

// ─── Construcción del mensaje ─────────────────────────────────────────────────

/**
 * Arma el mensaje de WhatsApp que el visitante le envía a Sabrina.
 * - Saludo personalizado según el ramo (emoji + objeto del seguro).
 * - Datos de contacto del interesado.
 * - Detalles del ramo si vienen formateados por secciones (del wizard).
 */
export function leadToWhatsappMessage(lead: Lead): string {
  const emoji = RAMO_EMOJI[lead.ramo] ?? "📋";
  const objeto = RAMO_OBJETO[lead.ramo] ?? `${lead.ramo.toLowerCase()}`;

  // Línea de saludo personalizada
  const saludo = `${emoji} *Hola Sabri, quiero cotizar ${objeto}.*`;

  // Datos de contacto
  const contactLines = [
    `*DATOS DE CONTACTO*`,
    `  • Nombre: ${lead.nombre}`,
    `  • Teléfono: ${lead.telefono}`,
    lead.email ? `  • Email: ${lead.email}` : null,
  ].filter(Boolean).join("\n");

  // Detalle del formulario (viene ya formateado en bloques por ProductQuoteForm,
  // o como texto libre desde LeadForm). Si viene vacío, no agrega la sección.
  const detalleRaw = (lead.mensaje ?? "").trim();
  // Formatear fechas ISO que puedan venir en los valores del detalle
  const detalle = detalleRaw.replace(/\b(\d{4})-(\d{2})-(\d{2})\b/g, "$3/$2/$1");

  const partes = [saludo, contactLines, detalle ? detalle : null].filter(Boolean);
  return partes.join("\n\n");
}
