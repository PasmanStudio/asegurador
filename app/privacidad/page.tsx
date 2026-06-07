import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo se tratan tus datos personales en este sitio, según la Ley 25.326 de Protección de Datos Personales.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

const identidad = `${site.nombreLegal}, ${site.matriculaSSN}${
  site.cuit ? ` — CUIT ${site.cuit}` : ""
}, con domicilio en ${site.domicilioLegal}`;

export default function PrivacidadPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
        Política de Privacidad
      </h1>
      <p className="mt-2 text-sm text-slate-500">Última actualización: junio de 2026</p>

      <div className="mt-8 space-y-6 text-slate-700">
        <p>
          Esta política describe cómo {site.nombre} (Productora Asesora de Seguros,{" "}
          {site.matriculaSSN}) trata los datos personales que nos facilitás a través de
          este sitio, en cumplimiento de la <strong>Ley N° 25.326 de Protección de Datos
          Personales</strong> de la República Argentina.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">1. Responsable de los datos</h2>
          <p className="mt-2">
            {identidad}. Contacto: {site.email} · {site.telefonoDisplay}.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">2. Qué datos recolectamos</h2>
          <p className="mt-2">
            Solo los datos que cargás voluntariamente en los formularios de cotización y
            contacto: nombre y apellido, teléfono, correo electrónico (opcional) y los
            datos necesarios para preparar tu cotización (por ejemplo, datos del vehículo,
            de la vivienda o del viaje, según el seguro). No recolectamos datos sensibles.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">3. Para qué los usamos</h2>
          <p className="mt-2">
            Únicamente para responder tu consulta, prepararte una cotización y asesorarte
            sobre la contratación de seguros. No vendemos ni cedemos tus datos a terceros
            con fines comerciales. Pueden compartirse con las compañías aseguradoras
            estrictamente cuando es necesario para cotizar o gestionar la cobertura que
            solicitás.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            4. Carácter de los datos y consentimiento
          </h2>
          <p className="mt-2">
            El suministro de tus datos personales a través de los formularios es{" "}
            <strong>voluntario</strong>. No estás obligado/a a proporcionarlos, aunque sin
            ellos no podremos preparar tu cotización ni responder tu consulta. Al enviar el
            formulario prestás tu consentimiento libre, expreso e informado para el
            tratamiento de tus datos con las finalidades aquí descriptas (conforme al
            art. 5 de la Ley 25.326). Podés <strong>retirar tu consentimiento</strong> en
            cualquier momento escribiéndonos a {site.email}, sin que ello afecte la
            licitud del tratamiento previo.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">5. Conservación</h2>
          <p className="mt-2">
            Conservamos tus datos por el tiempo necesario para gestionar tu consulta y
            cumplir obligaciones legales. Podés pedir su eliminación cuando quieras.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">6. Tus derechos</h2>
          <p className="mt-2">
            Como titular de los datos tenés derecho a <strong>acceder</strong> a tu
            información, <strong>rectificarla</strong>, <strong>actualizarla</strong> y
            solicitar su <strong>supresión</strong>, así como a oponerte al tratamiento, en
            los términos de la Ley N° 25.326. Para ejercerlos, escribinos a {site.email};
            responderemos en los plazos legales y sin costo. El derecho de acceso puede
            ejercerse en forma gratuita a intervalos no inferiores a seis meses, salvo
            interés legítimo (art. 14, inc. 3, Ley 25.326).
          </p>
          <p className="mt-2">
            {/* 👉 VERIFICAR la denominación vigente de la autoridad de aplicación */}
            La <strong>Agencia de Acceso a la Información Pública</strong>, en su carácter
            de órgano de control de la Ley N° 25.326, tiene la atribución de atender las
            denuncias y reclamos vinculados al incumplimiento de las normas sobre
            protección de datos personales.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">7. Cookies y analítica</h2>
          <p className="mt-2">
            Este sitio puede utilizar cookies y herramientas de medición de tráfico (por
            ejemplo, Google Analytics) con fines estadísticos, para mejorar la experiencia
            de navegación. No se utilizan para identificarte personalmente.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">8. Contacto</h2>
          <p className="mt-2">
            Ante cualquier duda sobre el tratamiento de tus datos, escribinos a{" "}
            <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
              {site.email}
            </a>
            .
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
