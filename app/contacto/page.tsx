import type { Metadata } from "next";
import { site, waLink } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactate para asesorarte o pedir una cotización de seguro. Respondo por WhatsApp, teléfono o email.",
};

export default function ContactoPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Contacto
          </h1>
          <p className="mt-3 text-slate-600">
            Dejame tus datos y te contacto a la brevedad, o escribime directo por
            WhatsApp.
          </p>

          <ul className="mt-8 space-y-4">
            <ContactItem
              label="WhatsApp / Teléfono"
              value={site.telefonoDisplay}
              href={waLink()}
            />
            <ContactItem label="Email" value={site.email} href={`mailto:${site.email}`} />
            <ContactItem label="Ubicación" value={site.ciudad} />
            <ContactItem label="Matrícula" value={site.matriculaSSN} />
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Pedí tu cotización</h2>
          <p className="mt-1 text-sm text-slate-600">
            Completá el formulario y seguimos por WhatsApp.
          </p>
          <div className="mt-6">
            <LeadForm />
          </div>
        </div>
      </div>

      {/* Agendar llamada (Calendly) */}
      {site.calendly && (
        <div className="mt-16">
          <div className="mx-auto mb-6 max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              ¿Preferís que hablemos por teléfono?
            </h2>
            <p className="mt-2 text-slate-600">
              Si no querés escribir, agendá una llamada en el horario que mejor te quede y
              yo te llamo.
            </p>
          </div>
          <CalendlyEmbed />
        </div>
      )}
    </section>
  );
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <li>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-lg font-medium text-brand-700 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="text-lg font-medium text-slate-900">{value}</p>
      )}
    </li>
  );
}
