import type { InsurerAdapter, QuoteInputAuto, QuoteResult, Cobertura } from "./types";

/**
 * Adaptador de Federación Patronal — cotización de automotores.
 *
 * Implementado contra el contrato REAL de la API (sandbox v1.6.5). La referencia
 * completa está en `docs/fedpat/README.md` y los OpenAPI en `docs/fedpat/openapi/`.
 *
 * ⚠️ ESTADO: DORMIDO. El adaptador solo se activa si están las credenciales Y el
 * flag `FEDPAT_LIVE=1`. Sin eso, `enabled()` devuelve false y el cotizador usa
 * los datos demo. Hoy, además, ninguna parte de la UI llama a `/api/cotizar`
 * (el wizard manda leads a `/api/lead`), así que esto no afecta la página.
 *
 * Falta para activarlo (ver checklist en la doc):
 *   1. Credenciales sandbox de FedPat (client + usuario) → variables de entorno.
 *   2. Resolver códigos: marca/modelo → `infoauto`, provincia/CP → `localidad`,
 *      carrocería → `tipo_vehiculo` (ver `resolveCodigosAuto`, hoy es un stub).
 *   3. Confirmar contra el sandbox la periodicidad de los importes devueltos.
 *
 * Variables de entorno (.env.local):
 *   FEDPAT_API_BASE        ej: https://api-sandbox.fedpat.com.ar  (host raíz, sin /v1)
 *   FEDPAT_CLIENT_ID       \  Basic Auth (header) del cliente API
 *   FEDPAT_CLIENT_SECRET   /
 *   FEDPAT_USERNAME        \  grant_type=password (body)
 *   FEDPAT_PASSWORD        /
 *   FEDPAT_LIVE=1          interruptor explícito para habilitar la API real
 */

const API_BASE = process.env.FEDPAT_API_BASE;
const CLIENT_ID = process.env.FEDPAT_CLIENT_ID;
const CLIENT_SECRET = process.env.FEDPAT_CLIENT_SECRET;
const USERNAME = process.env.FEDPAT_USERNAME;
const PASSWORD = process.env.FEDPAT_PASSWORD;
const LIVE = process.env.FEDPAT_LIVE === "1";

// ──────────────────────────── Tipos del contrato FedPat ────────────────────────────
// Reflejan el OpenAPI real (docs/fedpat/openapi/cotizacion.json). Se exportan para
// que el script de prueba y el futuro mapeo los reutilicen.

/** Body de POST /v1/cotizador-automotores. */
export type FedpatCotizacionRequest = {
  /** Vigencia de la cotización, formato dd/MM/yyyy. */
  fecha_desde: string;
  /** 1 = Efectivo, 2 = Débito automático. */
  medio_pago: 1 | 2;
  /** Código de tipo de personería del contratante (confirmar catálogo). */
  razon_social: number;
  numero_cotizacion?: number;
  descuento_comision?: number;
  pago_contado?: boolean;
  cliente_nuevo?: boolean;
  contratante: {
    /** INSCRIPTO, CONSUMIDOR FINAL, EXENTO, etc. */
    condicion_iva: "IN" | "CF" | "EA" | "IR" | "ED" | "MO" | "NC" | "0" | "NA";
    tipo_id?: "DNI" | "PA (Pasaporte)";
    id?: number;
    cuit?: string;
    nombre?: string;
    apellido?: string;
    razon_social?: string;
    localidad?: number;
    matricula?: string;
  };
  vehiculo: {
    /** Código Infoauto (marca+modelo). NO lo resuelve la API. */
    infoauto: string;
    anio: string;
    tipo_vehiculo: number;
    localidad_de_guarda: number;
    alarma?: boolean;
    rastreador?: number;
    gnc?: boolean;
    volcador?: boolean;
    suma_asegurada?: number;
  };
  /** `plan: null` cotiza todos los planes. */
  coberturas?: { plan?: string | null; franquicia?: number; [k: string]: unknown };
};

/** Un plan/cobertura cotizado dentro de la respuesta. */
export type FedpatPlan = {
  codigo?: string;
  descripcion?: string;
  /** Premio calculado de la cotización. */
  premio_automotor?: number;
  premio_total?: number;
  prima_tarifa?: number;
  /** Valor de la cuota (financiado). */
  monto_cuota_total?: number;
  monto_pago_contado?: number;
  in_exclusion?: string;
};

/** Respuesta 201 de POST /v1/cotizador-automotores (campos relevantes). */
export type FedpatCotizacionResponse = {
  numero_cotizacion?: number;
  fecha_desde?: string;
  fecha_hasta?: string;
  coberturas?: { planes?: FedpatPlan[] };
};

/** Respuesta de error estándar (400/401/403/409/500). */
export type FedpatError = { mensaje?: string; codigo_error?: string; time?: string };

// ──────────────────────────── Autenticación ────────────────────────────
// OAuth2: grant_type=password + Basic Auth del cliente. Cache del token en memoria.

let tokenCache: { token: string; expiresAt: number } | null = null;

/**
 * Obtiene (y cachea) un Bearer token. Basic Auth = base64(client_id:client_secret),
 * y usuario/clave van en el body como grant_type=password.
 */
export async function getFedpatToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 30_000) {
    return tokenCache.token;
  }
  if (!API_BASE || !CLIENT_ID || !CLIENT_SECRET || !USERNAME || !PASSWORD) {
    throw new Error("Faltan credenciales de Federación Patronal (.env.local)");
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(`${API_BASE}/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: USERNAME,
      password: PASSWORD,
    }),
  });

  if (!res.ok) {
    throw new Error(`Auth Federación Patronal falló (${res.status})`);
  }

  const data = (await res.json()) as { access_token: string; expires_in?: number };
  const expiresIn = (data.expires_in ?? 3600) * 1000;
  tokenCache = { token: data.access_token, expiresAt: Date.now() + expiresIn };
  return data.access_token;
}

// ──────────────────────────── Cliente de cotización ────────────────────────────

/**
 * Llamada de bajo nivel a POST /v1/cotizador-automotores. Recibe el body ya armado
 * (con códigos resueltos). Es lo que usa el script de prueba de conectividad.
 */
export async function cotizarAutomotor(
  request: FedpatCotizacionRequest,
  token?: string,
): Promise<FedpatCotizacionResponse> {
  const bearer = token ?? (await getFedpatToken());
  const res = await fetch(`${API_BASE}/v1/cotizador-automotores`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as FedpatError;
    throw new Error(
      `Cotización FedPat falló (${res.status})${err.mensaje ? `: ${err.mensaje}` : ""}`,
    );
  }
  return (await res.json()) as FedpatCotizacionResponse;
}

/** Convierte los planes de la respuesta FedPat al modelo común de la app. */
export function mapPlanesACoberturas(resp: FedpatCotizacionResponse): Cobertura[] {
  const planes = resp.coberturas?.planes ?? [];
  return planes.map((p) => ({
    codigo: p.codigo ?? "—",
    nombre: p.descripcion ?? "Cobertura",
    // ⚠️ Confirmar periodicidad contra el sandbox: usamos la cuota como "mensual".
    primaMensual: Number(p.monto_cuota_total ?? p.premio_automotor ?? 0),
    detalle: p.premio_automotor ? `Premio: $${p.premio_automotor}` : undefined,
  }));
}

/**
 * TODO (pendiente de credenciales/Infoauto): resolver los códigos que la API exige
 * a partir de los datos que el usuario carga en el formulario.
 *   - infoauto: marca/modelo/año → código Infoauto (dependencia externa).
 *   - tipo_vehiculo: vía microservicio `vehiculos` (GET /vehiculos/{infoauto}/tipos).
 *   - localidad / localidad_de_guarda: vía microservicio de localidades.
 * Hasta resolverlo, el adaptador no puede construir un request válido desde el
 * input común y lanza un error controlado (queda atrapado en quoteAuto).
 */
type ResolvedCodigos = { infoauto: string; tipo_vehiculo: number; localidad: number };

function resolveCodigosAuto(_input: QuoteInputAuto): ResolvedCodigos {
  throw new Error("Resolución de códigos (Infoauto/localidad/tipo) pendiente");
}

// ──────────────────────────── Adaptador ────────────────────────────

export const fedpat: InsurerAdapter = {
  nombre: "Federación Patronal",

  /** Solo activo con credenciales completas Y el flag explícito FEDPAT_LIVE=1. */
  enabled() {
    return Boolean(
      LIVE && API_BASE && CLIENT_ID && CLIENT_SECRET && USERNAME && PASSWORD,
    );
  },

  async quoteAuto(input: QuoteInputAuto): Promise<QuoteResult> {
    try {
      const codigos = resolveCodigosAuto(input); // ← stub: lanza hasta tener resolución
      const hoy = new Date();
      const fecha_desde = `${String(hoy.getDate()).padStart(2, "0")}/${String(
        hoy.getMonth() + 1,
      ).padStart(2, "0")}/${hoy.getFullYear()}`;

      const request: FedpatCotizacionRequest = {
        fecha_desde,
        medio_pago: 1,
        razon_social: 1,
        contratante: { condicion_iva: "CF" },
        vehiculo: {
          infoauto: codigos.infoauto,
          anio: String(input.anio),
          tipo_vehiculo: codigos.tipo_vehiculo,
          localidad_de_guarda: codigos.localidad,
        },
        coberturas: { plan: null },
      };

      const resp = await cotizarAutomotor(request);
      return { compania: this.nombre, ok: true, coberturas: mapPlanesACoberturas(resp) };
    } catch (err) {
      // No exponemos el detalle al cliente (puede revelar internals/estado de auth).
      console.error("Error cotizando en Federación Patronal:", err);
      return {
        compania: this.nombre,
        ok: false,
        error: "No se pudo obtener la cotización en este momento.",
      };
    }
  },
};
