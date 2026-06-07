import { marcasAuto, provincias, aniosModelo } from "./ar-data";

/**
 * Definición de los campos de cada cotizador, por ramo. Un único componente
 * (ProductQuoteForm) renderiza estas secciones, así cada producto tiene sus
 * preguntas propias sin escribir un formulario a mano para cada uno.
 */
export type Campo = {
  name: string;
  label: string;
  tipo?: "text" | "select" | "date" | "number" | "tel" | "email";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  full?: boolean;
};

export type Seccion = { titulo: string; campos: Campo[] };

const aniosStr = aniosModelo.map(String);

// Sección de contacto común a todos los formularios.
const contacto: Seccion = {
  titulo: "¿Cómo te contacto?",
  campos: [
    { name: "nombre", label: "Nombre y apellido", required: true, placeholder: "Tu nombre" },
    {
      name: "telefono",
      label: "WhatsApp (sin espacios ni guiones)",
      tipo: "tel",
      required: true,
      placeholder: "1136542657",
    },
    { name: "email", label: "Email (opcional)", tipo: "email", placeholder: "vos@email.com" },
  ],
};

const siNo = ["No", "Sí"];

export const formConfigs: Record<string, Seccion[]> = {
  automotor: [
    {
      titulo: "Tu vehículo",
      campos: [
        { name: "condicion", label: "¿Es nuevo o usado?", tipo: "select", required: true, options: ["Nuevo", "Usado"] },
        { name: "uso", label: "¿Qué uso tiene?", tipo: "select", required: true, options: ["Particular", "Comercial", "Aplicación (Uber/Cabify)"] },
        { name: "marca", label: "Marca", tipo: "select", required: true, options: marcasAuto },
        { name: "linea", label: "Línea / modelo", required: true, placeholder: "Ej. Gol Trend, Onix, Kwid…" },
        { name: "anio", label: "Año del modelo", tipo: "select", required: true, options: aniosStr },
        { name: "provincia", label: "Provincia donde circula", tipo: "select", required: true, options: provincias },
        { name: "cp", label: "Código postal", required: true, placeholder: "1407" },
      ],
    },
    {
      titulo: "Otros datos del vehículo",
      campos: [
        { name: "patente", label: "Patente (si tiene)", placeholder: "AB123CD" },
        { name: "gnc", label: "¿Tiene GNC?", tipo: "select", options: siNo },
        { name: "llantas", label: "¿Llantas especiales (no de fábrica)?", tipo: "select", options: siNo },
        { name: "alarma", label: "¿Tiene alarma?", tipo: "select", options: siNo },
      ],
    },
    {
      titulo: "Datos personales",
      campos: [
        { name: "tipoDoc", label: "Tipo de documento", tipo: "select", required: true, options: ["DNI", "CUIT", "Pasaporte"] },
        { name: "nroDoc", label: "Número de documento", required: true, placeholder: "Sin puntos" },
        { name: "nacimiento", label: "Fecha de nacimiento", tipo: "date", required: true },
      ],
    },
    contacto,
  ],

  motos: [
    {
      titulo: "Tu moto",
      campos: [
        { name: "condicion", label: "¿Es nueva o usada?", tipo: "select", required: true, options: ["Nueva", "Usada"] },
        { name: "marca", label: "Marca", required: true, placeholder: "Honda, Yamaha, Zanella, Motomel…" },
        { name: "modelo", label: "Modelo", required: true, placeholder: "Ej. CG 150, XR…" },
        { name: "cilindrada", label: "Cilindrada", tipo: "select", required: true, options: ["Hasta 150cc", "150 a 300cc", "300 a 500cc", "Más de 500cc"] },
        { name: "anio", label: "Año del modelo", tipo: "select", required: true, options: aniosStr },
        { name: "provincia", label: "Provincia donde circula", tipo: "select", required: true, options: provincias },
        { name: "cp", label: "Código postal", required: true, placeholder: "1407" },
      ],
    },
    {
      titulo: "Datos personales",
      campos: [
        { name: "tipoDoc", label: "Tipo de documento", tipo: "select", required: true, options: ["DNI", "CUIT", "Pasaporte"] },
        { name: "nroDoc", label: "Número de documento", required: true, placeholder: "Sin puntos" },
        { name: "nacimiento", label: "Fecha de nacimiento", tipo: "date", required: true },
      ],
    },
    contacto,
  ],

  hogar: [
    {
      titulo: "Tu vivienda",
      campos: [
        { name: "tipo", label: "Tipo de vivienda", tipo: "select", required: true, options: ["Casa", "Departamento", "PH"] },
        { name: "condicion", label: "Sos…", tipo: "select", required: true, options: ["Propietario", "Inquilino"] },
        { name: "ambientes", label: "Cantidad de ambientes", tipo: "select", required: true, options: ["1", "2", "3", "4", "5 o más"] },
        { name: "provincia", label: "Provincia", tipo: "select", required: true, options: provincias },
        { name: "localidad", label: "Localidad", required: true, placeholder: "Tu localidad" },
        { name: "cp", label: "Código postal", required: true, placeholder: "1407" },
        { name: "alarma", label: "¿Tiene alarma?", tipo: "select", options: siNo },
      ],
    },
    contacto,
  ],

  comercio: [
    {
      titulo: "Tu comercio",
      campos: [
        { name: "rubro", label: "Rubro / actividad", required: true, placeholder: "Kiosco, indumentaria, oficina…" },
        { name: "superficie", label: "Superficie (m²)", tipo: "number", required: true, placeholder: "50" },
        { name: "provincia", label: "Provincia", tipo: "select", required: true, options: provincias },
        { name: "cp", label: "Código postal", required: true, placeholder: "1407" },
        { name: "monitoreo", label: "¿Tiene alarma / monitoreo?", tipo: "select", options: siNo },
      ],
    },
    contacto,
  ],

  art: [
    {
      titulo: "Tu empresa",
      campos: [
        { name: "cuit", label: "CUIT", required: true, placeholder: "30-12345678-9" },
        { name: "actividad", label: "Actividad principal", required: true, placeholder: "Construcción, comercio…" },
        { name: "empleados", label: "Cantidad de empleados", tipo: "number", required: true, placeholder: "5" },
        { name: "masaSalarial", label: "Masa salarial mensual aprox.", placeholder: "$" },
        { name: "provincia", label: "Provincia", tipo: "select", required: true, options: provincias },
      ],
    },
    contacto,
  ],

  caucion: [
    {
      titulo: "Tu caución",
      campos: [
        { name: "tipo", label: "Tipo de garantía", tipo: "select", required: true, options: ["Garantía de alquiler", "Mantenimiento de oferta", "Ejecución de contrato", "Garantía aduanera", "Garantía de obra", "Otra"] },
        { name: "monto", label: "Monto a garantizar", required: true, placeholder: "$" },
        { name: "detalle", label: "Detalle (a quién / para qué)", full: true, placeholder: "Contame brevemente el caso" },
      ],
    },
    contacto,
  ],

  "vida-familia": [
    {
      titulo: "Tus datos",
      campos: [
        { name: "edad", label: "Tu edad", tipo: "number", required: true, placeholder: "35" },
        { name: "sumaAsegurada", label: "Suma asegurada deseada (opcional)", placeholder: "$" },
        { name: "fumador", label: "¿Fumás?", tipo: "select", options: siNo },
      ],
    },
    contacto,
  ],

  tecnologia: [
    {
      titulo: "Tu equipo",
      campos: [
        { name: "tipoEquipo", label: "Tipo de equipo", tipo: "select", required: true, options: ["Notebook", "Tablet", "PC de escritorio", "Otro"] },
        { name: "marcaModelo", label: "Marca y modelo", required: true, placeholder: "Ej. Dell Inspiron 15" },
        { name: "valor", label: "Valor aproximado", required: true, placeholder: "$" },
      ],
    },
    contacto,
  ],

  celulares: [
    {
      titulo: "Tu celular",
      campos: [
        { name: "marcaModelo", label: "Marca y modelo", required: true, placeholder: "Ej. Samsung A54" },
        { name: "valor", label: "Valor aproximado", required: true, placeholder: "$" },
        { name: "estado", label: "Estado actual", tipo: "select", options: ["Sin daños", "Con pantalla rota"] },
      ],
    },
    contacto,
  ],

  "accidentes-personales": [
    {
      titulo: "Tus datos",
      campos: [
        { name: "ocupacion", label: "Ocupación / actividad", required: true, placeholder: "Tu actividad principal" },
        { name: "edad", label: "Tu edad", tipo: "number", required: true, placeholder: "35" },
      ],
    },
    contacto,
  ],

  retiro: [
    {
      titulo: "Tu plan de retiro",
      campos: [
        { name: "edad", label: "Tu edad", tipo: "number", required: true, placeholder: "35" },
        { name: "ahorroMensual", label: "Capacidad de ahorro mensual aprox.", required: true, placeholder: "$" },
        { name: "objetivo", label: "Tu objetivo", full: true, placeholder: "Jubilación, casa, estudios de tus hijos…" },
      ],
    },
    contacto,
  ],
};

/** Devuelve las secciones del cotizador de un ramo, o solo contacto si no hay config. */
export function getFormConfig(slug: string): Seccion[] {
  return formConfigs[slug] ?? [contacto];
}
