"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  num: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  etiqueta: string;
};

function useCountUp(to: number, decimals = 0, duration = 1300) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(to * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setValue(to);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals).replace(".", ",")
      : Math.round(value).toString();

  return { ref, formatted };
}

function StatItem({ stat }: { stat: Stat }) {
  const { ref, formatted } = useCountUp(stat.num, stat.decimals ?? 0);
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold text-brand-300 sm:text-5xl">
        {stat.prefix}
        {formatted}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-slate-300">{stat.etiqueta}</p>
    </div>
  );
}

export default function CountUpStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4">
      {stats.map((s) => (
        <StatItem key={s.etiqueta} stat={s} />
      ))}
    </div>
  );
}
