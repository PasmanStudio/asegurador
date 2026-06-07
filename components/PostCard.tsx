import Link from "next/link";
import type { Post } from "@/lib/blog";

const fmtFecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.categoria}/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-md"
    >
      <time className="text-xs font-medium uppercase tracking-wide text-brand-600">
        {fmtFecha(post.fecha)}
      </time>
      <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-brand-700">
        {post.titulo}
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{post.descripcion}</p>
      <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-600">
        Leer nota
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
