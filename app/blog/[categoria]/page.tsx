import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categorias, getCategoria, postsDeCategoria } from "@/lib/blog";
import PostCard from "@/components/PostCard";

type Props = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategoria(categoria);
  if (!cat) return {};
  return {
    title: cat.nombre,
    description: cat.descripcion,
    alternates: { canonical: `/blog/${cat.slug}` },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const cat = getCategoria(categoria);
  if (!cat) notFound();

  const lista = postsDeCategoria(categoria);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link href="/blog" className="text-sm text-brand-600 hover:underline">
        ← Volver al blog
      </Link>
      <div className="mt-6 mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          {cat.nombre}
        </h1>
        <p className="mt-3 text-slate-600">{cat.descripcion}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
