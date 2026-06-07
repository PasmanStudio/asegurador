import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos de uso del sitio y aclaraciones sobre el rol del Productor Asesor de Seguros.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

const identidad = `${site.nombreLegal}, Productora Asesora de Seguros inscripta en la Superintendencia de Seguros de la Nación (${site.matriculaSSN})${
  site.cuit ? `, CUIT ${site.cuit}` : ""
}, con domicilio en ${site.domicilioLegal}`;

export default function TerminosPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
        Términos y Condiciones
      </h1>
      <p className="mt-2 text-sm text-slate-500">Última actualización: junio de 2026</p>

      <div className="mt-8 space-y-6 text-slate-700">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">1. Titular del sitio</h2>
          <p className="mt-2">{identidad}. Contacto: {site.email}.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">2. Rol del Productor Asesor</h2>
          <p className="mt-2">
            El Productor Asesor de Seguros actúa como <strong>intermediario</strong> entre
            vos y las compañías aseguradoras: te asesora y gestiona la contratación, pero{" "}
            <strong>no es la aseguradora</strong>. El contrato de seguro se celebra con la
            compañía elegida, que es la responsable de las coberturas y de los pagos de
            siniestros conforme a su póliza.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">3. Cotizaciones</h2>
          <p className="mt-2">
            Las cotizaciones e información de precios que se muestran o se gestionan a
            través de este sitio son <strong>estimativas y no vinculantes</strong>. Quedan
            sujetas a la aprobación, condiciones y tarifas vigentes de cada compañía
            aseguradora al momento de la emisión de la póliza.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">4. Uso del sitio</h2>
          <p className="mt-2">
            El contenido es informativo y de carácter general; no constituye asesoramiento
            personalizado hasta que tomes contacto y recibas una propuesta concreta. Te
            comprometés a brindar datos veraces en los formularios.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            5. Sin contratación ni pagos en línea
          </h2>
          <p className="mt-2">
            Este sitio <strong>no comercializa seguros ni procesa pagos en línea</strong>.
            Su finalidad es brindar información y permitirte solicitar cotizaciones y
            consultas, que luego se gestionan de forma personal con la productora. La
            eventual contratación de un seguro se perfecciona directamente con la compañía
            aseguradora, conforme a sus condiciones de póliza y a la Ley N° 17.418 de
            Seguros.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">6. Datos personales</h2>
          <p className="mt-2">
            El tratamiento de tus datos se rige por nuestra{" "}
            <Link href="/privacidad" className="text-brand-700 hover:underline">
              Política de Privacidad
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            7. Ley aplicable y jurisdicción
          </h2>
          <p className="mt-2">
            Estos Términos se rigen por las leyes de la República Argentina. La actividad
            de intermediación está regulada por la Ley N° 22.400 (Productores Asesores de
            Seguros) y supervisada por la Superintendencia de Seguros de la Nación; los
            contratos de seguro se rigen por la Ley N° 17.418. Ante cualquier controversia
            derivada del uso de este sitio serán competentes los tribunales ordinarios de{" "}
            {site.ciudad}, sin perjuicio de los derechos que las normas de defensa del
            consumidor reconozcan al usuario para acudir a la jurisdicción de su domicilio.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">8. Contacto</h2>
          <p className="mt-2">
            Por consultas sobre estos términos: {site.email} · {site.telefonoDisplay}.
          </p>
        </div>

        <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
          Este texto es un modelo de base y debería ser revisado por un profesional legal
          matriculado, con los datos reales de la productora, antes de su publicación
          definitiva.
        </p>
      </div>
    </section>
  );
}
