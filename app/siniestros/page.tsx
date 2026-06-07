import type { Metadata } from "next";
import { site, waLink } from "@/lib/site";
import Button from "@/components/ui/Button";
import { LifeBuoy, FileText, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Ya soy cliente / Tuve un siniestro",
  description:
    "¿Tuviste un siniestro o ya sos cliente y tenés una consulta? Te acompaño en todo el proceso. Escribime y lo resolvemos.",
  alternates: { canonical: "/siniestros" },
};

const queTenerListo = [
  "Tu número de póliza (si lo tenés a mano).",
  "Qué pasó, cuándo y dónde (fecha, hora y lugar).",
  "Fotos del daño y, si corresponde, de los terceros involucrados.",
  "Datos de la otra parte (patente, seguro) en caso de accidente.",
  "Si hubo intervención policial, el número de denuncia.",
];

export default function SiniestrosPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <LifeBuoy className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
        Ya soy cliente / Tuve un siniestro
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        Para esto estoy. Si tuviste un siniestro o tenés una consulta sobre tu póliza,
        escribime y te acompaño en todo el proceso ante la compañía para que se resuelva
        lo más rápido posible.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          href={waLink("Hola Sabri, tuve un siniestro y necesito ayuda.")}
          variant="primary"
        >
          Reportar un siniestro por WhatsApp
        </Button>
        <Button
          href={waLink("Hola Sabri, soy cliente y tengo una consulta sobre mi póliza.")}
          variant="secondary"
        >
          Tengo una consulta
        </Button>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <FileText className="h-5 w-5 text-brand-600" aria-hidden="true" />
          Qué tener a mano
        </h2>
        <ul className="mt-4 space-y-2">
          {queTenerListo.map((item) => (
            <li key={item} className="flex items-start gap-2 text-slate-700">
              <span className="mt-1 text-accent-600">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-2xl bg-brand-50 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Phone className="h-5 w-5 text-brand-600" aria-hidden="true" />
          Urgencias
        </h2>
        <p className="mt-2 text-slate-700">
          Ante una emergencia (accidente, robo o incendio en curso), comunicate primero
          con los servicios de emergencia. Después escribime y arrancamos la gestión del
          siniestro juntos.
        </p>
      </div>
    </section>
  );
}
