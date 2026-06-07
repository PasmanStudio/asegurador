import { site } from "@/lib/site";

/**
 * Grilla de logos de las compañías con las que trabaja la productora.
 * Cada logo va en un chip blanco uniforme (mismo alto) para emparejar formatos y
 * proporciones distintas. Los logos blancos (hechos para fondo oscuro) se
 * invierten a negro con `logoInvert` para que se vean sobre el chip.
 *
 * Se usa `<img>` (no next/image) para soportar png/svg/webp sin habilitar SVG en
 * next.config; quedan dentro del CSP (`img-src 'self'`) y cargan en lazy.
 */
export default function CompanyLogos({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4 ${className}`}
    >
      {site.companias.map((c) =>
        c.logo ? (
          <div
            key={c.nombre}
            className="flex h-16 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.logo}
              alt={`Logo de ${c.nombre}`}
              className={`max-h-8 w-auto max-w-[120px] object-contain${c.logoInvert ? " invert" : ""}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <span
            key={c.nombre}
            className="flex h-16 items-center justify-center text-base font-semibold text-slate-400"
          >
            {c.nombre}
          </span>
        ),
      )}
    </div>
  );
}
