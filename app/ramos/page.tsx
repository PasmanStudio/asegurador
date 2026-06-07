import type { Metadata } from "next";
import { site } from "@/lib/site";
import RamoCard from "@/components/RamoCard";

export const metadata: Metadata = {
  title: "Seguros",
  description:
    "Conocé todos los seguros que ofrezco: automotor, hogar, vida, asistencia al viajero y comercio.",
};

export default function RamosPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Seguros que ofrezco
        </h1>
        <p className="mt-3 text-slate-600">
          Te asesoro en cada tipo de cobertura para que elijas la que mejor se adapta a
          vos. Elegí un ramo para conocer los detalles.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.ramos.map((ramo) => (
          <RamoCard key={ramo.slug} ramo={ramo} />
        ))}
      </div>
    </section>
  );
}
