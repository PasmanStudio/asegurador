import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "heroPrimary" | "heroSecondary" | "whatsapp";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent-500 text-white hover:bg-accent-600",
  secondary: "border border-brand-600 text-brand-700 hover:bg-brand-50",
  /**
   * CTA principal sobre fondos de marca (hero rosado).
   * Fondo blanco sólido + texto brand-700 = máximo contraste contra el degradé
   * del hero. Sombra suave para dar profundidad sin romper la paleta.
   */
  heroPrimary: "bg-white text-brand-700 shadow-md hover:bg-brand-50",
  heroSecondary: "border border-white/40 text-white hover:bg-white/15",
  whatsapp: "bg-[#25D366] text-white hover:brightness-95",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-base",
  sm: "px-5 py-2.5 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps & {
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

/**
 * Botón unificado del sistema de diseño. Renderiza:
 * - <Link> si href es interno (empieza con "/")
 * - <a target=_blank> si href es externo
 * - <button> si no hay href
 */
export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  href,
  type = "button",
  disabled,
  children,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const external = /^https?:|^mailto:|^tel:/.test(href);
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
