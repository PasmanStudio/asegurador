import Image from "next/image";
import { Handshake, Building2, Zap } from "lucide-react";
import { site, waLink } from "@/lib/site";
import RamoCard from "@/components/RamoCard";
import CompanyLogos from "@/components/CompanyLogos";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import CountUpStats from "@/components/CountUpStats";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const beneficiosIcons = [Handshake, Building2, Zap];

const ramosDestacados = ["automotor", "motos", "hogar", "asistencia-viajero", "tecnologia", "celulares"]
  .map((slug) => site.ramos.find((r) => r.slug === slug))
  .filter((r): r is NonNullable<typeof r> => r !== undefined);

export default function Home() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
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
            <ul className="mt-6 space-y-2.5 text-brand-50">
              {site.heroChecklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/cotizar" variant="heroPrimary">
                Cotizar ahora
              </Button>
              <Button
                href={waLink("Hola Sabri, quiero asesorarme sobre un seguro.")}
                variant="whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Hablar por WhatsApp
              </Button>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 lg:max-w-md">
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

      {/* ── Confianza: compañías ─────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
            Trabajo con las mejores compañías
          </p>
          <CompanyLogos className="sm:justify-center" />
        </div>
      </section>

      {/* ── Ramos destacados ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-600">
            Coberturas
          </p>
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

      {/* ── Métricas (count-up sobre slate-900) ─────────────────────────── */}
      <section className="bg-slate-900 text-white">
        <CountUpStats stats={site.statsCreibles} />
      </section>

      {/* ── Beneficios (layout asimétrico sticky) ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.55fr] lg:items-start">
          {/* Cabezal izquierdo — sticky en desktop */}
          <div className="lg:sticky lg:top-28">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-600">
              Trabajar conmigo
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              ¿Por qué elegirme?
            </h2>
            <p className="mt-3 text-slate-600">
              Cada póliza pasa por una persona que te conoce y responde. Esto es lo que
              obtenés.
            </p>
          </div>
          {/* Cards apiladas */}
          <div className="grid gap-4">
            {site.beneficios.map((b, i) => {
              const BIcon = beneficiosIcons[i];
              return (
                <div
                  key={b.titulo}
                  className="flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <BIcon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-semibold text-slate-900">{b.titulo}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{b.texto}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Banda "Sobre mí" ────────────────────────────────────────────── */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mx-auto grid max-w-3xl grid-cols-[180px_1fr] items-center gap-8 sm:grid-cols-[200px_1fr]">
            <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-md ring-[3px] ring-white">
              <Image
                src="/sabrina-retrato.webp"
                alt="Retrato de Sabrina Descalzi"
                fill
                sizes="200px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-brand-600">
                Quién te asesora
              </p>
              <p className="mt-2 font-display text-[1.625rem] font-bold leading-snug text-slate-900">
                Detrás de cada póliza hay una persona que te conoce y responde.
              </p>
              <p className="mt-3 max-w-[52ch] text-sm text-slate-600">
                Soy Sabrina, productora matriculada hace más de 10 años. No vendo seguros:
                te ayudo a elegir el que te conviene y te acompaño cuando lo necesitás.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Button href="/sobre-mi" variant="secondary" size="sm">
                  Conocerme
                </Button>
                <span className="text-xs font-medium text-slate-400">
                  {site.matriculaSSN}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cómo trabajo (timeline horizontal conectada) ────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-600">
            Paso a paso
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900">
            ¿Cómo trabajo?
          </h2>
          <p className="mt-3 text-slate-600">
            Simple y sin vueltas. Estás acompañado en cada paso.
          </p>
        </div>
        <div className="relative grid gap-6 md:grid-cols-4">
          {/* Línea conectora — visible solo en desktop */}
          <span
            className="absolute left-[12.5%] right-[12.5%] hidden h-0.5 bg-brand-200 md:block"
            style={{ top: "26px" }}
            aria-hidden="true"
          />
          {site.pasos.map((p) => (
            <div key={p.numero} className="relative text-center">
              <span className="relative z-10 mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-brand-600 font-display text-lg font-bold text-white shadow-[0_0_0_7px_white]">
                {p.numero}
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonios ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-600">
              Testimonios
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Lo que dicen mis clientes
            </h2>
          </div>
          <TestimonialsCarousel testimonios={site.testimonios} />
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-brand-700 px-8 py-12 text-center text-white">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            ¿Listo para asegurarte tranquilo?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-50">
            Pedí tu cotización online o escribime y te asesoro sin compromiso.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/cotizar" variant="heroPrimary">
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
