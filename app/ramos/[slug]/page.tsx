import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site, getRamo, waLink } from "@/lib/site";
import RamoIcon from "@/components/ui/RamoIcon";
import { jsonLdScript } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return site.ramos.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ramo = getRamo(slug);
  if (!ramo) return {};
  return {
    title: ramo.nombre,
    description: ramo.resumen,
    alternates: { canonical: `/ramos/${slug}` },
    openGraph: { title: ramo.nombre, description: ramo.resumen },
  };
}

export default async function RamoPage({ params }: Props) {
  const { slug } = await params;
  const ramo = getRamo(slug);
  if (!ramo) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: ramo.nombre,
    description: ramo.descripcion,
    areaServed: "AR",
    provider: {
      "@type": "InsuranceAgency",
      name: site.nombre,
      telephone: `+${site.whatsapp}`,
    },
  };

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Link href="/ramos" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
        ← Todos los seguros
      </Link>

      {/* Layout: contenido (izquierda) + sidebar sticky (derecha en desktop) */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">

        {/* ── Columna izquierda: info del ramo ─────────────────────────── */}
        <div>
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <RamoIcon slug={ramo.slug} className="h-9 w-9" />
            </span>
            <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              {ramo.nombre}
            </h1>
          </div>

          {ramo.cotizable && (
            <span className="mt-4 inline-flex items-center rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white">
              Cotizable online
            </span>
          )}

          <p className="mt-6 text-lg leading-relaxed text-slate-700">{ramo.descripcion}</p>

          <h2 className="mt-10 text-xl font-semibold text-slate-900">
            ¿Qué cubre?
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {ramo.coberturas.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
              >
                <span className="mt-0.5 shrink-0 text-brand-600">
                  {/* check-circle inline para no depender de un import extra */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Sidebar sticky: CTA de cotización ────────────────────────── */}
        <div className="lg:sticky lg:top-28">
          <div className="rounded-2xl bg-brand-700 p-7 text-white shadow-xl">
            <h3 className="font-display text-2xl font-bold">
              Pedí tu cotización
            </h3>
            <p className="mt-2 text-sm text-brand-100">
              Te respondo en minutos, sin compromiso.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={ramo.cotizable ? `/cotizar/${ramo.slug}` : "/contacto"}
                className="flex w-full items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-brand-700 shadow-md transition-colors hover:bg-brand-50"
              >
                {ramo.cotizable ? `Cotizar ${ramo.nombre.toLowerCase()}` : "Pedir cotización"}
              </Link>
              <a
                href={waLink(`Hola Sabri, quiero cotizar ${ramo.nombre}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:brightness-95"
              >
                Hablar por WhatsApp
              </a>
            </div>
            {/* Mini lista de confianza */}
            <ul className="mt-6 space-y-2 text-sm text-brand-100">
              {[
                "Sin costo ni compromiso",
                "Atención 100% online",
                "Respuesta en minutos",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-brand-300">✓</span> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </article>
  );
}
