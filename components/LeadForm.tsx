"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { trackLead } from "@/lib/analytics";

type Status = "idle" | "loading" | "ok" | "error";

export default function LeadForm({ ramoInicial }: { ramoInicial?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [waUrl, setWaUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "No se pudo enviar. Probá de nuevo.");
        return;
      }
      setStatus("ok");
      setWaUrl(json.waUrl);
      trackLead(String(data.ramo ?? "Contacto"));
      // Abre WhatsApp con el mensaje prellenado hacia el productor.
      window.open(json.waUrl, "_blank", "noopener,noreferrer");
      form.reset();
    } catch {
      setStatus("error");
      setError("Hubo un problema de conexión. Probá de nuevo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot anti-bot: oculto y fuera del tab order. Un humano no lo ve. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">No completar</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre y apellido" name="nombre" required placeholder="Juan Pérez" />
        <Field
          label="Teléfono"
          name="telefono"
          required
          type="tel"
          placeholder="11 2233-4455"
        />
      </div>
      <Field label="Email (opcional)" name="email" type="email" placeholder="vos@email.com" />

      <div>
        <label htmlFor="ramo" className="mb-1 block text-sm font-medium text-slate-700">
          ¿Qué querés asegurar?
        </label>
        <select
          id="ramo"
          name="ramo"
          required
          defaultValue={ramoInicial ?? ""}
          className="field-select w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        >
          <option value="" disabled>
            Elegí una opción
          </option>
          {site.ramos.map((r) => (
            <option key={r.slug} value={r.nombre}>
              {r.nombre}
            </option>
          ))}
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="mb-1 block text-sm font-medium text-slate-700">
          Mensaje (opcional)
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          placeholder="Contame qué necesitás (marca y modelo del auto, dirección, etc.)"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-[var(--accent-600)]" />
        <span>
          Acepto la{" "}
          <a
            href="/privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 underline"
          >
            política de privacidad
          </a>{" "}
          y autorizo el tratamiento de mis datos.{" "}
          <span className="text-accent-600">*</span>
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {status === "ok" && (
        <div className="rounded-xl bg-accent-500/10 p-4 text-sm text-accent-600">
          <p>¡Listo! Te abrimos WhatsApp para enviar tu consulta.</p>
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-semibold underline"
            >
              ¿No se abrió? Tocá acá para enviarlo por WhatsApp →
            </a>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-accent-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Enviando…" : "Enviar consulta"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}
