import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import RamoIcon from "@/components/ui/RamoIcon";

export const metadata: Metadata = {
  title: "Cotizá tu seguro",
  description:
    "Elegí qué querés asegurar y cotizá online: auto, moto, hogar, asistencia al viajero y más.",
};

export default function CotizarHubPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          ¿Qué querés cotizar?
        </h1>
        <p className="mt-3 text-slate-600">
          Elegí el seguro y obtené tu cotización. En auto y asistencia al viajero cotizás
          online; en el resto te preparo una propuesta a tu medida en minutos.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.ramos.map((ramo) => (
          <Link
            key={ramo.slug}
            href={`/cotizar/${ramo.slug}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-md"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <RamoIcon slug={ramo.slug} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-brand-700">
              {ramo.nombre}
            </h2>
            <p className="mt-2 flex-1 text-sm text-slate-600">{ramo.resumen}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
              {ramo.cotizable ? "Cotizar online" : "Pedir cotización"}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
            {ramo.cotizable && (
              <span className="mt-3 inline-block w-fit rounded-full bg-accent-500/10 px-2.5 py-0.5 text-xs font-medium text-accent-600">
                Online
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
