import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleAnalytics from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
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
  // Preview al compartir en X. La imagen la toma de app/opengraph-image.tsx.
  twitter: {
    card: "summary_large_image",
    title: `${site.nombre} — Productora Asesora de Seguros`,
    description: site.descripcionCorta,
  },
  robots: {
    index: true,
    follow: true,
    // Permite a Google mostrar fragmentos largos y vista previa grande de la
    // imagen: ocupa más lugar en los resultados y sube el CTR.
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

/**
 * Ficha de la productora para Google (schema.org). Va en el layout para que
 * esté en todas las páginas: es lo que alimenta el panel de conocimiento y
 * ayuda a que Google asocie el sitio con la persona y su matrícula.
 *
 * Todo lo declarado acá es verificable. NO se declara `aggregateRating`: sin
 * reseñas reales y públicas que lo respalden, Google lo penaliza como spam.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": `${site.url}/#productora`,
  name: site.nombre,
  description: site.descripcionCorta,
  slogan: site.tagline,
  url: site.url,
  email: site.email,
  telephone: `+${site.whatsapp}`,
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/opengraph-image`,
  // Perfiles oficiales: le confirman a Google que el sitio, el Instagram y la
  // persona son la misma entidad.
  sameAs: [site.instagram],
  areaServed: { "@type": "Country", name: "Argentina" },
  knowsLanguage: ["es-AR"],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.ciudad,
    addressCountry: "AR",
  },
  founder: {
    "@type": "Person",
    name: site.nombreLegal,
    jobTitle: "Productora Asesora de Seguros",
    // La matrícula de la SSN es la credencial que distingue a un PAS
    // matriculado de un vendedor cualquiera.
    identifier: site.matriculaSSN,
    worksFor: { "@id": `${site.url}/#productora` },
  },
  // Los ramos que ofrece, cada uno enlazado a su página.
  makesOffer: site.ramos.map((r) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: r.nombre,
      description: r.resumen,
      url: `${site.url}/ramos/${r.slug}`,
    },
  })),
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
        <GoogleAnalytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
