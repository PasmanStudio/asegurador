/** Datos de referencia para los formularios (Argentina). */

export const marcasAuto = [
  "Volkswagen",
  "Toyota",
  "Chevrolet",
  "Ford",
  "Fiat",
  "Renault",
  "Peugeot",
  "Citroën",
  "Honda",
  "Nissan",
  "Jeep",
  "Hyundai",
  "Kia",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Otra",
];

export const provincias = [
  "Ciudad Autónoma de Buenos Aires",
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

/** Años de modelo, del próximo año hacia atrás (35 años). */
export const aniosModelo = Array.from(
  { length: 35 },
  (_, i) => new Date().getFullYear() + 1 - i,
);
