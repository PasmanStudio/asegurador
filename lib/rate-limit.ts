/**
 * Rate limiter simple en memoria (ventana fija). Suficiente como freno básico
 * anti-abuso para los route handlers públicos sin agregar dependencias ni
 * CAPTCHA. Nota: la memoria es por instancia del proceso; en un entorno
 * serverless con varias instancias (p. ej. Vercel) el límite es aproximado.
 * Para un control estricto haría falta un store compartido (Upstash/Redis).
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = { ok: boolean; retryAfter: number };

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * Obtiene una IP cliente razonable para el rate-limit.
 *
 * Importante: NO usamos el primer valor de `X-Forwarded-For`. Ese header lo
 * controla el cliente y la plataforma solo lo *agrega*, así que un atacante
 * puede anteponer IPs falsas y rotarlas para esquivar el límite. Priorizamos
 * los headers que setea el proxy de confianza (Vercel: `x-vercel-forwarded-for`
 * / `x-real-ip`) y, como último recurso, tomamos el valor de MÁS a la derecha
 * de XFF (el agregado por el proxy más cercano), que es el menos manipulable.
 * Aun así, esto es solo un freno anti-abuso, no una decisión de seguridad dura.
 */
export function clientIp(request: Request): string {
  const trusted =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-real-ip");
  if (trusted) return trusted.trim();

  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",");
    return parts[parts.length - 1]!.trim();
  }
  return "unknown";
}

/**
 * Verificación de mismo-origen (anti-CSRF / anti-abuso para los POST públicos).
 * Compara el header `Origin` con el `Host` de la request, así funciona en
 * cualquier dominio (producción, previews de Vercel, localhost) sin hardcodear
 * la URL. Si no viene `Origin` (clientes que no son navegador) no bloquea: el
 * control existe para frenar POSTs disparados desde otros sitios en el navegador.
 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

// Limpieza ocasional de buckets vencidos para no crecer sin límite.
export function pruneBuckets(): void {
  const now = Date.now();
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}
