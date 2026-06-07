import { z } from "zod";

/**
 * Modelo común del cotizador. Cada compañía se implementa como un "adaptador"
 * que recibe un QuoteInputAuto y devuelve un QuoteResult normalizado, sin que
 * el front conozca el detalle de cada API.
 */

// ──────────────────────────── Entrada ────────────────────────────
export const quoteInputAutoSchema = z.object({
  marca: z.string().min(1, "Ingresá la marca").max(60),
  modelo: z.string().min(1, "Ingresá el modelo").max(80),
  anio: z.coerce
    .number()
    .int()
    .min(1980, "Año inválido")
    .max(new Date().getFullYear() + 1, "Año inválido"),
  codigoPostal: z.string().min(4, "Código postal inválido").max(8),
  email: z.string().email().optional().or(z.literal("")),
  telefono: z.string().max(30).optional().or(z.literal("")),
});

export type QuoteInputAuto = z.infer<typeof quoteInputAutoSchema>;

// ──────────────────────────── Salida ────────────────────────────
export type Cobertura = {
  /** Código corto de la cobertura: RC, C, TR, etc. */
  codigo: string;
  nombre: string;
  /** Prima mensual estimada en pesos. */
  primaMensual: number;
  sumaAsegurada?: number;
  detalle?: string;
};

export type QuoteResult =
  | { compania: string; ok: true; coberturas: Cobertura[]; demo?: boolean }
  | { compania: string; ok: false; error: string };

/** Contrato que implementa cada compañía. */
export interface InsurerAdapter {
  nombre: string;
  /** True si la compañía está configurada con credenciales y lista para cotizar. */
  enabled(): boolean;
  quoteAuto(input: QuoteInputAuto): Promise<QuoteResult>;
}
