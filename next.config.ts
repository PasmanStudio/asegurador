import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy. Defensa en profundidad contra XSS / inyección de
 * scripts: declara explícitamente desde dónde se puede cargar cada recurso.
 *
 * Se aplica como header estático (sin nonce) para no romper la generación
 * estática del sitio (clave para el SEO). Por eso `script-src` incluye
 * 'unsafe-inline' — necesario para el snippet inline de Google Analytics y los
 * bloques JSON-LD. El JSON-LD ya se escapa aparte (ver lib/jsonld.ts).
 *
 * Orígenes externos permitidos:
 *  - googletagmanager.com / google-analytics.com → Google Analytics 4
 *  - assets.calendly.com (script) + calendly.com (iframe) → agendar llamada
 * En desarrollo se habilita 'unsafe-eval' porque React/Next lo usan para el HMR.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://assets.calendly.com`,
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://*.calendly.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://calendly.com",
  "frame-src https://calendly.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Headers de seguridad básicos, aplicados a todas las rutas. Son estándar y no
 * rompen el funcionamiento del sitio:
 *  - Content-Security-Policy: restringe orígenes de scripts/recursos (anti-XSS).
 *  - X-Content-Type-Options: evita MIME-sniffing.
 *  - Referrer-Policy: no filtra la URL completa a terceros.
 *  - X-Frame-Options / frame-ancestors: evita clickjacking (embebido en iframes).
 *  - Strict-Transport-Security: fuerza HTTPS (Vercel ya sirve por HTTPS).
 *  - Permissions-Policy: desactiva APIs sensibles que el sitio no usa.
 */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // No revela la versión de Next en cada respuesta (menos bytes + menos info).
  poweredByHeader: false,

  // Garantiza tree-shaking por ícono de lucide-react: importa solo los íconos
  // usados en vez de evaluar todo el paquete. Reduce el JS enviado al cliente.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
