import type { Metadata } from "next";
import Link from "next/link";
import { site, waLink } from "@/lib/site";
import Button from "@/components/ui/Button";

/**
 * Página 404. Next devuelve el status 404 correcto, así que Google no la
 * indexa; el `noindex` explícito evita que quede en el índice si alguien la
 * enlaza. Lo que sí importa para SEO es que no sea un callejón sin salida:
 * ofrecer caminos de vuelta recupera visitas que llegaron a una URL vieja o
 * mal tipeada, en vez de perderlas.
 */
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <p className="font-display text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
        No encontré esta página
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-slate-600">
        Puede que el link esté mal escrito o que la página ya no exista. Te dejo por
        dónde seguir.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/cotizar" variant="primary">
          Cotizar un seguro
        </Button>
        <Button href={waLink()} variant="whatsapp">
          Escribirme por WhatsApp
        </Button>
      </div>

      {/* Enlaces a los ramos: le da a la 404 valor de navegación real. */}
      <div className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-sm font-semibold text-slate-900">Seguros que ofrezco</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {site.ramos.map((r) => (
            <Link
              key={r.slug}
              href={`/ramos/${r.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {r.nombre}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/" className="text-brand-600 hover:underline">
            Inicio
          </Link>
          <Link href="/sobre-mi" className="text-brand-600 hover:underline">
            Sobre mí
          </Link>
          <Link href="/preguntas-frecuentes" className="text-brand-600 hover:underline">
            Preguntas frecuentes
          </Link>
          <Link href="/siniestros" className="text-brand-600 hover:underline">
            Ya soy cliente
          </Link>
          <Link href="/contacto" className="text-brand-600 hover:underline">
            Contacto
          </Link>
        </div>
      </div>
    </section>
  );
}
