"use client";

import { useRef, useState } from "react";
import { Lock } from "lucide-react";
import type { Seccion, Campo } from "@/lib/cotizador-forms";
import Button from "@/components/ui/Button";
import { trackLead } from "@/lib/analytics";

type Status = "idle" | "loading" | "ok" | "error";

const CONTACTO = ["nombre", "telefono", "email"];

/**
 * Cotizador multi-paso (wizard) configurable por datos. Renderiza una sección
 * por paso con barra de progreso, valida cada paso antes de avanzar y pide los
 * datos de contacto al final. Envía la solicitud como lead vía /api/lead.
 */
export default function ProductQuoteForm({
  ramoNombre,
  secciones,
}: {
  ramoNombre: string;
  secciones: Seccion[];
}) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const totalSteps = secciones.length;
  const esUltimo = step === totalSteps - 1;
  const progreso = Math.round(((step + 1) / totalSteps) * 100);

  function validarPaso(): boolean {
    const form = formRef.current;
    if (!form) return true;
    const campos = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
      `[data-step="${step}"] input, [data-step="${step}"] select`,
    );
    for (const el of Array.from(campos)) {
      if (!el.checkValidity()) {
        el.reportValidity();
        return false;
      }
    }
    return true;
  }

  function siguiente() {
    if (!validarPaso()) return;
    setStep((s) => Math.min(s + 1, totalSteps - 1));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function atras() {
    setStep((s) => Math.max(s - 1, 0));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validarPaso()) return;
    setStatus("loading");
    setError(null);

    const f = new FormData(e.currentTarget);
    const get = (k: string) => (f.get(k) ? String(f.get(k)).trim() : "");

    const detalle = secciones
      .flatMap((s) => s.campos)
      .filter((c) => !CONTACTO.includes(c.name))
      .map((c) => (get(c.name) ? `${c.label}: ${get(c.name)}` : ""))
      .filter(Boolean)
      .join("\n");

    const payload = {
      nombre: get("nombre"),
      telefono: get("telefono"),
      email: get("email"),
      ramo: ramoNombre,
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
      trackLead(ramoNombre);
      window.open(json.waUrl, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
      setError("Hubo un problema de conexión. Probá de nuevo.");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="scroll-mt-24">
      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600">
          <span>{secciones[step].titulo}</span>
          <span>
            Paso {step + 1} de {totalSteps}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-accent-500 transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {secciones.map((s, i) => (
        <fieldset
          key={s.titulo}
          data-step={i}
          className={i === step ? "rounded-2xl border border-slate-200 bg-white p-6" : "hidden"}
        >
          <legend className="px-2 text-base font-semibold text-brand-700">{s.titulo}</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {s.campos.map((c) => (
              <Field key={c.name} campo={c} active={i === step} />
            ))}
          </div>
        </fieldset>
      ))}

      <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Tus datos solo se usan para tu cotización y no se ceden con fines comerciales.
      </p>

      {esUltimo && (
        <label className="mt-4 flex items-start gap-3 text-sm text-slate-600">
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
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {status === "ok" && (
        <div className="mt-3 rounded-xl bg-accent-500/10 p-4 text-sm text-accent-600">
          <p>¡Listo! Te abrimos WhatsApp con tu solicitud.</p>
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

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={atras}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500"
          >
            ← Atrás
          </button>
        ) : (
          <span />
        )}

        {esUltimo ? (
          <Button type="submit" variant="primary" disabled={status === "loading"}>
            {status === "loading" ? "Enviando…" : "Enviar solicitud"}
          </Button>
        ) : (
          <button
            type="button"
            onClick={siguiente}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500"
          >
            Siguiente →
          </button>
        )}
      </div>
    </form>
  );
}

const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

function Field({ campo, active }: { campo: Campo; active: boolean }) {
  const { name, label, tipo = "text", required, placeholder, options, full } = campo;
  // Solo el paso activo exige sus campos (evita validar pasos ocultos).
  const req = required && active;
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-accent-600">*</span>}
      </label>
      {tipo === "select" ? (
        <select
          id={name}
          name={name}
          required={req}
          defaultValue=""
          className={`${fieldClass} field-select`}
        >
          <option value="" disabled>
            Seleccioná
          </option>
          {(options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={tipo}
          required={req}
          placeholder={placeholder}
          className={fieldClass}
        />
      )}
    </div>
  );
}
