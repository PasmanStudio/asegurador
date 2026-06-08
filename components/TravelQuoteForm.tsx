"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import { trackLead } from "@/lib/analytics";

type Status = "idle" | "loading" | "ok" | "error";

/**
 * Cotizador de asistencia al viajero. Reúne datos del viaje y de contacto y los
 * envía como lead vía /api/lead (igual que el resto de los cotizadores), que
 * además abre WhatsApp prellenado.
 */
export default function TravelQuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [waUrl, setWaUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const f = new FormData(e.currentTarget);
    const get = (k: string) => (f.get(k) ? String(f.get(k)).trim() : "");

    // Formatear fechas ISO a dd/mm/yyyy para lectura humana en WhatsApp.
    const fmtFecha = (d: string) => {
      const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      return m ? `${m[3]}/${m[2]}/${m[1]}` : d;
    };

    const detalle = [
      `*DATOS DEL VIAJE*`,
      `  • Destino: ${get("destino")}`,
      `  • Salida: ${fmtFecha(get("desde"))}`,
      `  • Regreso: ${fmtFecha(get("hasta"))}`,
      `  • Cantidad de pasajeros: ${get("pasajeros")}`,
      `  • Edad del pasajero mayor: ${get("edadMayor")} años`,
    ].join("\n");

    const payload = {
      nombre: get("nombre"),
      telefono: get("telefono"),
      email: get("email"),
      ramo: "Asistencia al Viajero",
      mensaje: detalle,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "No se pudo enviar la solicitud. Revisá los datos.");
        return;
      }
      setStatus("ok");
      setWaUrl(json.waUrl);
      trackLead("Asistencia al Viajero");
      window.open(json.waUrl, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
      setError("Hubo un problema de conexión. Probá de nuevo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset className="rounded-2xl border border-slate-200 bg-white p-6">
        <legend className="px-2 text-base font-semibold text-brand-700">Tu viaje</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Destino" name="destino" placeholder="Europa, Brasil, EE.UU…" required />
          <Field label="Cantidad de pasajeros" name="pasajeros" type="number" placeholder="2" min={1} max={20} required />
          <Field label="Fecha de salida" name="desde" type="date" min={new Date().toISOString().split("T")[0]} required />
          <Field label="Fecha de regreso" name="hasta" type="date" min={new Date().toISOString().split("T")[0]} required />
          <Field label="Edad del pasajero mayor" name="edadMayor" type="number" placeholder="45" min={1} max={120} required />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-slate-200 bg-white p-6">
        <legend className="px-2 text-base font-semibold text-brand-700">¿Cómo te contacto?</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre y apellido" name="nombre" placeholder="Tu nombre" required />
          <Field label="WhatsApp" name="telefono" type="tel" placeholder="1136542657" required />
          <Field label="Email (opcional)" name="email" type="email" placeholder="vos@email.com" />
        </div>
      </fieldset>

      <p className="flex items-center gap-2 text-xs text-slate-500">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Tus datos solo se usan para tu cotización y no se ceden con fines comerciales.
      </p>

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
          y autorizo el tratamiento de mis datos para gestionar mi solicitud.{" "}
          <span className="text-accent-600">*</span>
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {status === "ok" && (
        <div className="rounded-xl bg-accent-500/10 p-4 text-sm text-accent-600">
          <p>¡Listo! Te abrimos WhatsApp con los datos de tu viaje.</p>
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

      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Enviando…" : "Cotizar mi viaje"}
      </Button>
    </form>
  );
}

const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

function Field({
  label, name, type = "text", placeholder, required, min, max,
}: {
  label: string; name: string; type?: string;
  placeholder?: string; required?: boolean;
  min?: string | number; max?: string | number;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-accent-600">*</span>}
      </label>
      <input
        id={name} name={name} type={type}
        placeholder={placeholder} required={required}
        min={min} max={max}
        className={fieldClass}
      />
    </div>
  );
}
