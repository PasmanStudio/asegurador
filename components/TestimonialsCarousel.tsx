"use client";

import { useState } from "react";
import Image from "next/image";

type Testimonio = {
  texto: string;
  autor: string;
  face?: string;
};

export default function TestimonialsCarousel({ testimonios }: { testimonios: Testimonio[] }) {
  const [current, setCurrent] = useState(0);
  const total = testimonios.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Visible indices: current-1, current, current+1 (wrap)
  const visible = [
    (current - 1 + total) % total,
    current,
    (current + 1) % total,
  ];

  return (
    <div className="relative">
      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {visible.map((idx, pos) => {
          const t = testimonios[idx];
          const initials = t.autor
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          const isCenter = pos === 1;
          return (
            <figure
              key={`${idx}-${pos}`}
              className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 ${
                isCenter
                  ? "border-brand-200 shadow-md ring-1 ring-brand-100"
                  : "border-slate-200 opacity-75"
              }`}
            >
              <div
                className="text-[1.125rem] tracking-wide text-accent-500"
                aria-label="5 de 5 estrellas"
                role="img"
              >
                ★★★★★
              </div>
              <blockquote className="mt-3 flex-1 text-slate-700">"{t.texto}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                {t.face ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <Image src={t.face} alt={t.autor} fill className="object-cover" sizes="56px" />
                  </div>
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-700">
                    {initials}
                  </span>
                )}
                <span className="text-sm font-semibold text-slate-900">{t.autor}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Testimonio anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
        >
          ←
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonios.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir al testimonio ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-brand-600" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Siguiente testimonio"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
        >
          →
        </button>
      </div>
    </div>
  );
}
