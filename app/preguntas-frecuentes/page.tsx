import type { Metadata } from "next";
import { faqs } from "@/lib/faqs";
import { jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas sobre seguros, cotizaciones y cómo trabaja un productor asesor de seguros en Argentina.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
        Preguntas frecuentes
      </h1>
      <p className="mt-3 text-slate-600">
        Lo que más me consultan sobre seguros y cómo trabajo.
      </p>

      <div className="mt-10 divide-y divide-slate-200">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-slate-900">
              {f.q}
              <span className="ml-4 text-brand-600 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
