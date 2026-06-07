"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site, waLink } from "@/lib/site";
import Button from "@/components/ui/Button";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/ramos", label: "Seguros" },
  { href: "/cotizar", label: "Cotizar" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-600 font-display text-base font-semibold tracking-tight text-brand-700">
            {site.iniciales}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-slate-800">
              {site.nombre}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-600">
              Productora de Seguros
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                  active ? "text-brand-700" : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={waLink()}
            variant="whatsapp"
            size="sm"
            className="hidden sm:inline-flex"
          >
            WhatsApp
          </Button>

          {/* Botón hamburguesa (mobile) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-2 py-3 text-base font-medium ${
                    active ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="my-3 grid grid-cols-2 gap-3">
              <Button href="/cotizar" variant="primary" size="sm">
                Cotizar
              </Button>
              <Button href={waLink()} variant="whatsapp" size="sm">
                WhatsApp
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
