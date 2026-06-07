import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics from "@/components/Analytics";
import { site } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Solo los pesos que realmente se usan en los títulos (600/700). Cargar el
// rango variable completo de Playfair pesa de más y no aporta nada visible.
const playfair = Playfair_Display({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nombre} — Productora Asesora de Seguros`,
    template: `%s | ${site.nombre}`,
  },
  description: site.descripcionCorta,
  keywords: [
    "seguros",
    "productor de seguros",
    "seguro automotor",
    "seguro de hogar",
    "asistencia al viajero",
    "Argentina",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.nombre,
    title: `${site.nombre} — Productora Asesora de Seguros`,
    description: site.descripcionCorta,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: site.nombre,
  description: site.descripcionCorta,
  url: site.url,
  email: site.email,
  telephone: `+${site.whatsapp}`,
  areaServed: "AR",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.ciudad,
    addressCountry: "AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col font-sans"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
