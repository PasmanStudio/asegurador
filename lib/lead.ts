import { z } from "zod";

/**
 * Campo de una sola línea: recorta espacios y colapsa saltos de línea / retornos
 * de carro a un espacio. Evita que un valor controlado por el usuario (nombre,
 * ramo) inyecte CR/LF en el asunto del email de notificación.
 */
const singleLine = (schema: z.ZodString) =>
  schema.transform((s) => s.replace(/[\r\n]+/g, " ").trim());

/** Esquema de validación del lead / pre-cotización. */
export const leadSchema = z.object({
  nombre: singleLine(z.string().min(2, "Ingresá tu nombre").max(80)),
  telefono: singleLine(z.string().min(6, "Ingresá un teléfono válido").max(30)),
  email: z.string().email("Email inválido").max(120).optional().or(z.literal("")),
  ramo: singleLine(z.string().min(1, "Elegí un tipo de seguro").max(60)),
  mensaje: z.string().max(2000).optional().or(z.literal("")),
  /**
   * Honeypot anti-bot: campo oculto que un humano nunca completa. El route
   * handler lo revisa; si viene con texto, descarta el lead como spam. Se acepta
   * en el schema (cualquier string) para poder fingir éxito sin revelar la trampa.
   */
  website: z.string().max(200).optional().or(z.literal("")),
});

export type Lead = z.infer<typeof leadSchema>;

/** Arma el mensaje de WhatsApp que el visitante le envía al productor. */
export function leadToWhatsappMessage(lead: Lead): string {
  const lines = [
    `Hola Sabri, quiero pedirte una cotización.`,
    `*Nombre:* ${lead.nombre}`,
    `*Teléfono:* ${lead.telefono}`,
    lead.email ? `*Email:* ${lead.email}` : null,
    `*Seguro:* ${lead.ramo}`,
    lead.mensaje ? `*Mensaje:* ${lead.mensaje}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}
