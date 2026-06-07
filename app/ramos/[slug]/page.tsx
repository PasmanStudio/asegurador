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
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Link href="/ramos" className="text-sm text-brand-600 hover:underline">
        ← Todos los seguros
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <RamoIcon slug={ramo.slug} className="h-9 w-9" />
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          {ramo.nombre}
        </h1>
      </div>

      <p className="mt-6 text-lg text-slate-700">{ramo.descripcion}</p>

      <h2 className="mt-10 text-xl font-semibold text-slate-900">
        Coberturas destacadas
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {ramo.coberturas.map((c) => (
          <li
            key={c}
            className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
          >
            <span className="text-accent-600">✓</span>
            {c}
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-col gap-3 rounded-2xl bg-slate-50 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">
            ¿Querés un precio para {ramo.nombre.toLowerCase()}?
          </p>
          <p className="text-sm text-slate-600">
            {ramo.cotizable
              ? "Cotizá online en segundos o escribime por WhatsApp."
              : "Escribime y te preparo una cotización a medida."}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/cotizar/${ramo.slug}`}
            className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            {ramo.cotizable ? "Cotizar online" : "Pedir cotización"}
          </Link>
          <a
            href={waLink(`Hola Sabri, quiero cotizar ${ramo.nombre}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
