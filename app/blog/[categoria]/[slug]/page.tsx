import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  posts,
  getPost,
  getCategoria,
  postsDeCategoria,
  type Bloque,
} from "@/lib/blog";
import { site, getRamo } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonld";

type Props = { params: Promise<{ categoria: string; slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ categoria: p.categoria, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, slug } = await params;
  const post = getPost(categoria, slug);
  if (!post) return {};
  return {
    title: post.titulo,
    description: post.descripcion,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${categoria}/${slug}` },
    openGraph: {
      type: "article",
      title: post.titulo,
      description: post.descripcion,
      publishedTime: post.fecha,
    },
  };
}

function Bloques({ cuerpo }: { cuerpo: Bloque[] }) {
  return (
    <>
      {cuerpo.map((b, i) => {
        if (b.tipo === "h2")
          return (
            <h2 key={i} className="mt-8 text-2xl font-semibold text-slate-900">
              {b.texto}
            </h2>
          );
        if (b.tipo === "ul")
          return (
            <ul key={i} className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              {b.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          );
        return (
          <p key={i} className="mt-4 text-lg leading-relaxed text-slate-700">
            {b.texto}
          </p>
        );
      })}
    </>
  );
}

export default async function PostPage({ params }: Props) {
  const { categoria, slug } = await params;
  const post = getPost(categoria, slug);
  if (!post) notFound();

  const cat = getCategoria(categoria);
  const relacionados = postsDeCategoria(categoria).filter((p) => p.slug !== slug);
  const ramo = post.cotizadorRelacionado ? getRamo(post.cotizadorRelacionado) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.descripcion,
    datePublished: post.fecha,
    keywords: post.keywords.join(", "),
    author: { "@type": "Person", name: site.nombre },
    publisher: { "@type": "Organization", name: site.nombre },
    mainEntityOfPage: `${site.url}/blog/${categoria}/${slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <nav className="text-sm text-brand-600">
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        {cat && (
          <>
            {" / "}
            <Link href={`/blog/${cat.slug}`} className="hover:underline">
              {cat.nombre}
            </Link>
          </>
        )}
      </nav>

      <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
        {post.titulo}
      </h1>
      <time className="mt-2 block text-sm text-slate-500">
        {new Date(post.fecha).toLocaleDateString("es-AR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>

      <div className="mt-6">
        <Bloques cuerpo={post.cuerpo} />
      </div>

      {/* CTA al cotizador relacionado (interlinking SILO) */}
      {ramo && (
        <div className="mt-12 flex flex-col gap-3 rounded-2xl bg-brand-50 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-slate-900">
            ¿Querés cotizar {ramo.nombre.toLowerCase()}?
          </p>
          <Link
            href={`/cotizar/${ramo.slug}`}
            className="rounded-full bg-accent-500 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Cotizar ahora
          </Link>
        </div>
      )}

      {relacionados.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-slate-900">Seguí leyendo</h2>
          <ul className="mt-4 space-y-2">
            {relacionados.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.categoria}/${p.slug}`}
                  className="text-brand-700 hover:underline"
                >
                  {p.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
