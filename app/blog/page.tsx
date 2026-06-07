import type { Metadata } from "next";
import Link from "next/link";
import { categorias, postsRecientes } from "@/lib/blog";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog de seguros",
  description:
    "Notas y guías sobre seguros en Argentina: auto, hogar, vida y consejos para elegir mejor tu cobertura.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Blog de seguros
        </h1>
        <p className="mt-3 text-slate-600">
          Información clara para que tomes mejores decisiones sobre tus seguros.
        </p>
      </div>

      {/* Categorías (SILO) */}
      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        {categorias.map((c) => (
          <Link
            key={c.slug}
            href={`/blog/${c.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-md"
          >
            <span className="text-3xl" aria-hidden="true">
              {c.icono}
            </span>
            <h2 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-brand-700">
              {c.nombre}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{c.descripcion}</p>
          </Link>
        ))}
      </div>

      <h2 className="mb-6 text-xl font-semibold text-slate-900">Últimas notas</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {postsRecientes().map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
