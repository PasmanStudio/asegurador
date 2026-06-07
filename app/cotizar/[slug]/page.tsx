import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site, getRamo } from "@/lib/site";
import RamoIcon from "@/components/ui/RamoIcon";
import { getFormConfig } from "@/lib/cotizador-forms";
import ProductQuoteForm from "@/components/ProductQuoteForm";
import TravelQuoteForm from "@/components/TravelQuoteForm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return site.ramos.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ramo = getRamo(slug);
  if (!ramo) return {};
  return {
    title: `Cotizar ${ramo.nombre}`,
    description: ramo.resumen,
  };
}

export default async function CotizarRamoPage({ params }: Props) {
  const { slug } = await params;
  const ramo = getRamo(slug);
  if (!ramo) notFound();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link href="/cotizar" className="text-sm text-brand-600 hover:underline">
        ← Todos los cotizadores
      </Link>

      <div className="mt-6 mb-10 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <RamoIcon slug={ramo.slug} className="h-8 w-8" />
          </span>
          <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Cotizá tu {ramo.nombre.replace(/^Seguro de /, "").toLowerCase()}
          </h1>
        </div>
        <p className="mt-3 text-slate-600">{ramo.descripcion}</p>
      </div>

      {slug === "asistencia-viajero" ? (
        <div className="max-w-2xl">
          <TravelQuoteForm />
        </div>
      ) : (
        <div className="max-w-3xl">
          <ProductQuoteForm ramoNombre={ramo.nombre} secciones={getFormConfig(slug)} />
        </div>
      )}
    </section>
  );
}
