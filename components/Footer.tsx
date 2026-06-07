import Link from "next/link";
import { site } from "@/lib/site";

/** Ícono de Instagram (inline; esta versión de lucide-react no trae íconos de marcas). */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-brand-700">{site.nombre}</p>
          <p className="mt-2 text-sm text-slate-600">{site.descripcionCorta}</p>
          <p className="mt-3 text-xs font-medium text-slate-500">{site.matriculaSSN}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Seguros</h3>
          <ul className="mt-3 space-y-2">
            {site.ramos.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/ramos/${r.slug}`}
                  className="text-sm text-slate-600 hover:text-brand-600"
                >
                  {r.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Contacto</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <a href={`tel:+${site.whatsapp}`} className="hover:text-brand-600">
                {site.telefonoDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand-600">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Sabrina Descalzi"
                className="inline-flex items-center gap-1.5 hover:text-brand-600"
              >
                <InstagramIcon className="h-4 w-4" />
                @sabrinadescalzi.ar
              </a>
            </li>
            <li>{site.ciudad}</li>
            <li>
              <Link href="/preguntas-frecuentes" className="hover:text-brand-600">
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <Link href="/siniestros" className="hover:text-brand-600">
                Ya soy cliente / Siniestros
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Leyenda legal / SSN */}
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-6 sm:px-6">
          <p className="text-xs leading-relaxed text-slate-500">
            {site.nombreLegal} — {site.matriculaSSN}
            {site.cuit ? `, CUIT ${site.cuit}` : ""}. Productora Asesora de Seguros
            inscripta en la{" "}
            <strong>Superintendencia de Seguros de la Nación (SSN)</strong>, organismo de
            control de la actividad aseguradora. El Productor Asesor de Seguros actúa como{" "}
            <strong>intermediario</strong> y no asume riesgos: el contrato de seguro se
            celebra con la compañía aseguradora, única responsable de las coberturas y del
            pago de los siniestros conforme a su póliza. Las cotizaciones son estimativas y
            no vinculantes, sujetas a la aceptación y tarifas vigentes de cada aseguradora.
          </p>
          <p className="text-xs leading-relaxed text-slate-500">
            {/* 👉 VERIFICAR denominación y teléfono vigentes en argentina.gob.ar/ssn */}
            Atención y orientación al asegurado de la SSN: línea gratuita{" "}
            <strong>0800-666-8400</strong> ·{" "}
            <a
              href="https://www.argentina.gob.ar/ssn"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-600"
            >
              argentina.gob.ar/ssn
            </a>
          </p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <Link href="/privacidad" className="text-slate-600 hover:text-brand-600">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-slate-600 hover:text-brand-600">
              Términos y Condiciones
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-4 text-center text-xs text-slate-500">
        © {year} {site.nombre}. Todos los derechos reservados. · {site.matriculaSSN}
      </div>
    </footer>
  );
}
