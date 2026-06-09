import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import CompanyLogos from "@/components/CompanyLogos";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: `Conocé a ${site.nombre}, Productora Asesora de Seguros matriculada en Argentina con más de 10 años de experiencia.`,
};

export default function SobreMiPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Sobre {site.nombre}
          </h1>
          <p className="mt-2 text-sm font-medium text-brand-600">{site.matriculaSSN}</p>

          <div className="mt-8 space-y-4 text-lg text-slate-700">
        <p>
          Soy Sabrina Descalzi, Productora Asesora de Seguros matriculada en la
          Superintendencia de Seguros de la Nación (Matrícula Nacional 89115). Tengo más
          de 10 años de experiencia asesorando en seguros de auto, moto, hogar,
          asistencia al viajero y más.
        </p>
        <p>
          Mi trabajo es simple: ayudarte a proteger lo que más valorás, con la mejor
          cobertura y al precio justo. Que entiendas qué estás contratando, que no pagues
          de más y que tengas a alguien de confianza cuando lo necesites.
        </p>
        <p>
          Trabajo con las principales compañías del mercado para compararlas y
          recomendarte la mejor opción según tu necesidad. Atiendo de forma 100% online en
          todo el país. Prepararse hoy hace la diferencia mañana. 🙌
            </p>
          </div>
        </div>

        {/* Retrato de Sabrina */}
        <div className="lg:sticky lg:top-24">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-lg ring-1 ring-brand-100">
            <Image
              src="/sabrina-retrato.webp"
              alt="Retrato de Sabrina Descalzi, Productora Asesora de Seguros"
              fill
              sizes="(max-width: 1024px) 100vw, 320px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <figure className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-6">
        <blockquote className="text-slate-700">
          “Una profesional de primera. Siempre está a disposición y da un servicio a la
          medida de uno.”
        </blockquote>
        <figcaption className="mt-2 text-sm font-medium text-brand-700">
          — Luciana A.
        </figcaption>
      </figure>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Compañías con las que trabajo</h2>
        <CompanyLogos className="mt-4 sm:justify-start" />
      </div>

      <div className="mt-12 rounded-2xl bg-brand-700 px-8 py-10 text-center text-white">
        <p className="text-xl font-semibold">Hablemos de tu seguro</p>
        <p className="mt-2 text-brand-50">Sin compromiso y a tu medida.</p>
        <Link
          href="/contacto"
          className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-brand-700 shadow-md transition-colors hover:bg-brand-50"
        >
          Contactarme
        </Link>
      </div>
    </section>
  );
}
