import type { InsurerAdapter, QuoteInputAuto, QuoteResult } from "./types";

/**
 * Adaptador DEMO: genera cotizaciones de ejemplo de forma determinística para
 * poder probar y mostrar el cotizador antes de tener las APIs reales conectadas.
 * Se activa cuando no hay ninguna compañía real habilitada (o con QUOTE_DEMO=1).
 * Los resultados quedan marcados con `demo: true` para avisar en la UI.
 */
function precioBase(input: QuoteInputAuto): number {
  // Pseudo-precio según antigüedad y zona, solo para demo.
  const antiguedad = Math.max(0, new Date().getFullYear() - input.anio);
  const cpHash = [...input.codigoPostal].reduce((a, c) => a + c.charCodeAt(0), 0);
  return 22_000 + cpHash * 30 - antiguedad * 400;
}

function adapterDemo(nombre: string, factor: number): InsurerAdapter {
  return {
    nombre,
    enabled: () => true,
    async quoteAuto(input: QuoteInputAuto): Promise<QuoteResult> {
      const base = precioBase(input) * factor;
      return {
        compania: nombre,
        ok: true,
        demo: true,
        coberturas: [
          {
            codigo: "RC",
            nombre: "Responsabilidad Civil",
            primaMensual: Math.round(base * 0.45),
            detalle: "Cobertura obligatoria hacia terceros.",
          },
          {
            codigo: "C",
            nombre: "Terceros completo",
            primaMensual: Math.round(base * 0.8),
            sumaAsegurada: 18_000_000,
            detalle: "Incendio, robo y destrucción total.",
          },
          {
            codigo: "TR",
            nombre: "Todo riesgo c/ franquicia",
            primaMensual: Math.round(base * 1.35),
            sumaAsegurada: 18_000_000,
            detalle: "Cobertura amplia con franquicia.",
          },
        ],
      };
    },
  };
}

/** Compañías simuladas para la demo. */
export const demoAdapters: InsurerAdapter[] = [
  adapterDemo("Aseguradora Ejemplo A", 1.0),
  adapterDemo("Aseguradora Ejemplo B", 1.12),
  adapterDemo("Aseguradora Ejemplo C", 0.94),
];
