import Image from "next/image";
import { Handshake, Building2, Zap } from "lucide-react";
import { site, getRamo, waLink } from "@/lib/site";
import RamoCard from "@/components/RamoCard";
import Button from "@/components/ui/Button";

const beneficios = [
  {
    Icon: Handshake,
    titulo: "Asesoramiento personalizado",
    texto:
      "No te vendo un seguro: te ayudo a elegir la cobertura justa para tu situación, sin pagar de más.",
  },
  {
    Icon: Building2,
    titulo: "Las mejores compañías",
    texto:
      "Trabajo con las aseguradoras líderes del país para conseguirte la mejor relación precio-cobertura.",
  },
  {
    Icon: Zap,
    titulo: "Respuesta rápida",
    texto:
      "Cotización ágil y acompañamiento real ante un siniestro. Estoy cuando me necesitás.",
  },
];

const ramosDestacados = [
  "automotor",
  "motos",
  "hogar",
  "comercio",
  "asistencia-viajero",
  "vida-familia",
]
  .map((slug) => getRamo(slug))
  .filter((r): r is NonNullable<typeof r> => r !== undefined);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div className="reveal">
            <p className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wider">
              {site.matriculaSSN}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              Tu seguro, bien asesorado.
            </h1>
            <p className="mt-5 text-lg text-brand-50">
              Soy {site.nombre}, Productora Asesora de Seguros con más de 10 años de
              experiencia. Te ayudo a proteger lo que más valorás, con la mejor cobertura
              y al precio justo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/cotizar" variant="primary">
                Cotizar ahora
              </Button>
              <Button
                href={waLink("Hola Sabri, quiero asesorarme sobre un seguro.")}
                variant="heroSecondary"
              >
                Hablar por WhatsApp
              </Button>
            </div>
          </div>

          {/* Foto de Sabrina */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 lg:max-w-none">
            <Image
              src="/sabrina-oficina.webp"
              alt="Sabrina Descalzi, Productora Asesora de Seguros, en su oficina"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Barra de confianza: compañías */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-slate-500">
            Trabajo con las mejores compañías
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {site.companias.map((c) => (
              <span key={c.nombre} className="text-base font-semibold text-slate-400">
                {c.nombre}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Ramos destacados */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            ¿Qué querés asegurar?
          </h2>
          <p className="mt-3 text-slate-600">
            Elegí el tipo de seguro y conocé las coberturas disponibles.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ramosDestacados.map((ramo) => (
            <RamoCard key={ramo.slug} ramo={ramo} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/ramos" variant="secondary" size="sm">
            Ver todos los seguros →
          </Button>
        </div>
      </section>

      {/* Métricas */}
      <section className="bg-brand-700 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.etiqueta} className="text-center">
              <p className="font-display text-3xl font-bold sm:text-4xl">{s.valor}</p>
              <p className="mt-1 text-sm text-brand-50">{s.etiqueta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            ¿Por qué elegirme?
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {beneficios.map((b) => (
            <div key={b.titulo} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <b.Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{b.titulo}</h3>
              <p className="mt-2 text-sm text-slate-600">{b.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo trabajo */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900">
              ¿Cómo trabajo?
            </h2>
            <p className="mt-3 text-slate-600">
              Simple y sin vueltas. Estás acompañado en cada paso.
            </p>
          </div>
          <ol className="grid gap-6 md:grid-cols-4">
            {site.pasos.map((p) => (
              <li key={p.numero} className="relative rounded-2xl bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display text-lg font-bold text-white">
                  {p.numero}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-slate-900">
            Lo que dicen mis clientes
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {site.testimonios.map((t) => (
              <figure
                key={t.autor}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="text-lg text-accent-500" aria-hidden="true">
                  ★★★★★
                </div>
                <blockquote className="mt-3 flex-1 text-slate-700">“{t.texto}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-brand-700">
                  — {t.autor}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-brand-700 px-8 py-12 text-center text-white">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            ¿Listo para asegurarte tranquilo?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-50">
            Pedí tu cotización online o escribime y te asesoro sin compromiso.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/cotizar" variant="primary">
              Cotizar ahora
            </Button>
            <Button href="/contacto" variant="heroSecondary">
              Contactar
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
