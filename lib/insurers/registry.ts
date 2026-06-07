import type { InsurerAdapter } from "./types";
import { fedpat } from "./fedpat";
import { demoAdapters } from "./demo";

/**
 * Todos los adaptadores reales registrados. A medida que cada compañía habilite
 * su web service, se agrega su adaptador acá (mercantilAndina, meridional, etc.).
 */
const realAdapters: InsurerAdapter[] = [fedpat];

/**
 * Devuelve los adaptadores que se deben usar para cotizar.
 * - Si hay compañías reales habilitadas (con credenciales), usa esas.
 * - Si no hay ninguna (o QUOTE_DEMO=1), usa los adaptadores de demostración
 *   para que el cotizador funcione igual con datos de ejemplo.
 */
export function getActiveAdapters(): InsurerAdapter[] {
  const enabled = realAdapters.filter((a) => a.enabled());
  if (enabled.length > 0 && process.env.QUOTE_DEMO !== "1") {
    return enabled;
  }
  return demoAdapters;
}
