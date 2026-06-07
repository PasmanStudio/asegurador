import { NextResponse } from "next/server";
import { leadSchema, leadToWhatsappMessage } from "@/lib/lead";
import { site, waLink } from "@/lib/site";
import { rateLimit, clientIp, pruneBuckets, sameOrigin } from "@/lib/rate-limit";

/** Tamaño máximo del body aceptado (anti-abuso). */
const MAX_BODY_BYTES = 8 * 1024; // 8 KB: de sobra para un lead.

/**
 * Recibe el lead, lo valida y devuelve un link de WhatsApp prellenado hacia el
 * productor. Si está configurado RESEND_API_KEY, además envía un email de aviso.
 * Las credenciales/servicios externos viven solo en el servidor.
 */
export async function POST(request: Request) {
  // Anti-CSRF: solo aceptamos envíos del propio sitio, no de páginas de terceros.
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Origen no permitido" }, { status: 403 });
  }

  // Rate limit simple por IP: máx. 8 envíos por minuto.
  pruneBuckets();
  const limited = rateLimit(`lead:${clientIp(request)}`, 8, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos. Probá de nuevo en un momento." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  // Tope por Content-Length: rechaza antes de leer el body en memoria.
  const declaredLen = Number(request.headers.get("content-length") ?? 0);
  if (declaredLen > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Solicitud demasiado grande" }, { status: 413 });
  }

  // Límite de tamaño (defensa adicional por si el Content-Length miente).
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Solicitud demasiado grande" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // Honeypot: si el campo oculto viene completo, es un bot. Devolvemos un
  // "éxito" inocuo (sin notificar ni loguear el lead) para no revelar la trampa.
  if (lead.website && lead.website.trim() !== "") {
    return NextResponse.json({ ok: true, waUrl: waLink("") });
  }

  const mensaje = leadToWhatsappMessage(lead);
  const waUrl = waLink(mensaje);

  // Notificación opcional por email (solo si está configurado).
  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev",
          to: process.env.LEAD_NOTIFY_EMAIL,
          subject: `Nuevo lead: ${lead.ramo} — ${lead.nombre}`,
          text: mensaje.replace(/\*/g, ""),
        }),
      });
    } catch (err) {
      // No bloquea el flujo: el WhatsApp sigue funcionando.
      console.error("Error enviando email de lead:", err);
    }
  } else {
    // Sin email configurado: queda registro en logs del servidor.
    console.info(`Nuevo lead (${site.nombre}):`, lead);
  }

  return NextResponse.json({ ok: true, waUrl });
}
