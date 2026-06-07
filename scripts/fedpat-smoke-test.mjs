/**
 * Prueba de conectividad con la API de Federación Patronal (sandbox).
 *
 * Valida, de punta a punta y SIN tocar la web, que:
 *   1. Las credenciales obtienen un token (OAuth2 password + Basic Auth).
 *   2. POST /v1/cotizador-automotores devuelve planes con precios.
 *
 * Uso (cuando tengas las credenciales):
 *   1. Cargalas en .env.local (ver .env.example).
 *   2. node scripts/fedpat-smoke-test.mjs
 *
 * Los códigos del ejemplo (infoauto, tipo_vehiculo, localidad) son los del propio
 * OpenAPI de FedPat; si la cotización falla por datos, ajustá estos valores con
 * los catálogos reales (ver docs/fedpat/README.md §6 y §7).
 */

import { readFileSync } from "node:fs";

// ── Carga simple de .env.local (sin dependencias) ──
function loadEnv() {
  try {
    const txt = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // sin .env.local: usamos process.env (variables ya exportadas)
  }
}
loadEnv();

const {
  FEDPAT_API_BASE,
  FEDPAT_CLIENT_ID,
  FEDPAT_CLIENT_SECRET,
  FEDPAT_USERNAME,
  FEDPAT_PASSWORD,
} = process.env;

const faltan = Object.entries({
  FEDPAT_API_BASE,
  FEDPAT_CLIENT_ID,
  FEDPAT_CLIENT_SECRET,
  FEDPAT_USERNAME,
  FEDPAT_PASSWORD,
})
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (faltan.length) {
  console.error("✗ Faltan variables de entorno:", faltan.join(", "));
  console.error("  Cargalas en .env.local (ver .env.example) y reintentá.");
  process.exit(1);
}

const mask = (s) => (s ? s.slice(0, 4) + "…" + s.slice(-2) : "");

async function getToken() {
  const basic = Buffer.from(
    `${FEDPAT_CLIENT_ID}:${FEDPAT_CLIENT_SECRET}`,
  ).toString("base64");
  const res = await fetch(`${FEDPAT_API_BASE}/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: FEDPAT_USERNAME,
      password: FEDPAT_PASSWORD,
    }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Token ${res.status}: ${body}`);
  return JSON.parse(body);
}

function ejemploCotizacion() {
  const hoy = new Date();
  const dd = String(hoy.getDate()).padStart(2, "0");
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  return {
    fecha_desde: `${dd}/${mm}/${hoy.getFullYear()}`,
    medio_pago: 1,
    razon_social: 1,
    contratante: {
      tipo_id: "DNI",
      id: 34769948,
      condicion_iva: "CF",
      nombre: "Juan",
      apellido: "Perez",
      localidad: 375,
    },
    vehiculo: {
      infoauto: "170641", // ejemplo del OpenAPI
      anio: "2018",
      tipo_vehiculo: 46,
      localidad_de_guarda: 375,
      gnc: false,
      alarma: true,
      suma_asegurada: 1200000,
    },
    coberturas: { plan: null }, // null = cotiza todos los planes
  };
}

async function cotizar(token) {
  const res = await fetch(`${FEDPAT_API_BASE}/v1/cotizador-automotores`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ejemploCotizacion()),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Cotización ${res.status}: ${body}`);
  return JSON.parse(body);
}

(async () => {
  console.log(`→ Ambiente: ${FEDPAT_API_BASE}`);
  console.log(`→ Cliente:  ${mask(FEDPAT_CLIENT_ID)}  Usuario: ${FEDPAT_USERNAME}`);

  console.log("\n[1/2] Obteniendo token…");
  const tok = await getToken();
  console.log(`  ✓ token ${mask(tok.access_token)} · expira en ${tok.expires_in}s · scope: ${tok.scope}`);

  console.log("\n[2/2] Cotizando automotor de ejemplo…");
  const cot = await cotizar(tok.access_token);
  const planes = cot?.coberturas?.planes ?? [];
  console.log(`  ✓ N° cotización: ${cot.numero_cotizacion} · vigencia ${cot.fecha_desde} → ${cot.fecha_hasta}`);
  console.log(`  ✓ ${planes.length} plan(es):`);
  for (const p of planes) {
    console.log(
      `     - [${p.codigo}] ${p.descripcion}: premio $${p.premio_automotor} · cuota $${p.monto_cuota_total} · contado $${p.monto_pago_contado}`,
    );
  }
  console.log("\n✅ Conectividad OK. La estructura de respuesta está en docs/fedpat/README.md §5.");
})().catch((e) => {
  console.error("\n✗ Falló:", e.message);
  console.error("  Revisá credenciales y los códigos del ejemplo (docs/fedpat/README.md).");
  process.exit(1);
});
