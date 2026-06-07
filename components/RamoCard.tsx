import Link from "next/link";
import type { Ramo } from "@/lib/site";
import RamoIcon from "@/components/ui/RamoIcon";

export default function RamoCard({ ramo }: { ramo: Ramo }) {
  return (
    <Link
      href={`/ramos/${ramo.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <RamoIcon slug={ramo.slug} />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-brand-700">
        {ramo.nombre}
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{ramo.resumen}</p>
      <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-600">
        Ver más
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
