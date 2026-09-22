import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";
import RamoCard from "@/components/RamoCard";

export const metadata = pageMetadata({
  title: "Seguros",
  description:
    "Conocé todos los seguros que ofrezco: automotor, moto, hogar, asistencia al viajero y más.",
  path: "/ramos",
});

/**
 * Lista los ramos como ItemList. Le dice a Google que esta página es un
 * listado y cuál es el orden de sus elementos, en vez de dejarlo adivinar a
 * partir de las tarjetas.
 */
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Seguros que ofrezco",
  itemListElement: site.ramos.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: r.nombre,
    url: `${site.url}/ramos/${r.slug}`,
  })),
};

const breadcrumb = breadcrumbJsonLd(site.url, [
  { name: "Inicio", path: "/" },
  { name: "Seguros", path: "/ramos" },
]);

export default function RamosPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />
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
