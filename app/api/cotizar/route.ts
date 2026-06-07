import { NextResponse } from "next/server";
import { quoteInputAutoSchema, type QuoteResult } from "@/lib/insurers/types";
import { getActiveAdapters } from "@/lib/insurers/registry";
import { rateLimit, clientIp, pruneBuckets, sameOrigin } from "@/lib/rate-limit";

/** Tamaño máximo del body aceptado (anti-abuso). */
const MAX_BODY_BYTES = 8 * 1024;

export async function POST(request: Request) {
  // Anti-CSRF: solo aceptamos consultas del propio sitio.
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Origen no permitido" }, { status: 403 });
  }

  // Rate limit: cotizar consulta APIs externas, así que limitamos más fuerte.
  pruneBuckets();
  const limited = rateLimit(`cotizar:${clientIp(request)}`, 15, 60_000);
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

  const parsed = quoteInputAutoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const adapters = getActiveAdapters();

  // Cada compañía se consulta en paralelo y con tolerancia a fallos: si una se
  // cae o tarda, las demás igual responden.
  const settled = await Promise.allSettled(
    adapters.map((a) => withTimeout(a.quoteAuto(input), 12_000, a.nombre)),
  );

  const resultados: QuoteResult[] = settled.map((s, i) =>
    s.status === "fulfilled"
      ? s.value
      : { compania: adapters[i].nombre, ok: false, error: "Sin respuesta a tiempo" },
  );

  // Ordena por la prima más baja disponible (las exitosas primero).
  resultados.sort((a, b) => minPrima(a) - minPrima(b));

  const esDemo = resultados.some((r) => r.ok && r.demo);

  return NextResponse.json({ ok: true, demo: esDemo, resultados });
}

function minPrima(r: QuoteResult): number {
  if (!r.ok || r.coberturas.length === 0) return Number.POSITIVE_INFINITY;
  return Math.min(...r.coberturas.map((c) => c.primaMensual));
}

function withTimeout<T>(p: Promise<T>, ms: number, nombre: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout ${nombre}`)), ms),
    ),
  ]);
}
