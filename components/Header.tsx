"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Phone } from "lucide-react";
import { site, waLink } from "@/lib/site";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/** Ícono de Instagram (inline; lucide-react 1.17 no tiene íconos de marcas). */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/ramos", label: "Seguros" },
  { href: "/cotizar", label: "Cotizar" },
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
    /* Wrapper sticky: engloba la barra utilitaria + el header principal. */
    <div className="sticky top-0 z-40">

      {/* ── Barra utilitaria (confianza + contacto directo) ───────────────── */}
      <div className="hidden border-b border-brand-800 bg-brand-700 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-[0.72rem] sm:px-6">
          <span className="flex items-center gap-2 text-brand-50">
            <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Atención 100% online en toda Argentina
          </span>
          <span className="flex items-center gap-4">
            <a
              href={`tel:+${site.whatsapp}`}
              className="flex items-center gap-1.5 font-medium text-white hover:text-brand-100"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {site.telefonoDisplay}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Sabrina Descalzi"
              className="flex items-center gap-1.5 text-brand-50 hover:text-white"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              @sabrinadescalzi.ar
            </a>
          </span>
        </div>
      </div>

      {/* ── Header principal ─────────────────────────────────────────────── */}
      <header className="border-b border-slate-200 bg-white/92 backdrop-blur">
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
                  className={`relative text-sm font-medium transition-colors hover:text-brand-600 ${
                    active ? "text-brand-700" : "text-slate-600"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-[1px] left-0 right-0 h-0.5 rounded-full bg-brand-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
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
              {/* En mobile: teléfono e instagram */}
              <div className="my-2 border-t border-slate-100 pt-2 text-sm text-slate-500">
                <a href={`tel:+${site.whatsapp}`} className="flex items-center gap-2 rounded-lg px-2 py-2 hover:text-brand-600">
                  <Phone className="h-4 w-4" />
                  {site.telefonoDisplay}
                </a>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-2 py-2 hover:text-brand-600">
                  <InstagramIcon className="h-4 w-4" />
                  @sabrinadescalzi.ar
                </a>
              </div>
              <div className="my-3 grid grid-cols-2 gap-3">
                <Button href="/cotizar" variant="primary" size="sm">
                  Cotizar
                </Button>
                <Button href={waLink()} variant="whatsapp" size="sm">
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
