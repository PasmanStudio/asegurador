import {
  Car,
  Bike,
  Home,
  Store,
  HardHat,
  ScrollText,
  Plane,
  HeartPulse,
  Laptop,
  Smartphone,
  Stethoscope,
  PiggyBank,
  Shield,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  automotor: Car,
  motos: Bike,
  hogar: Home,
  comercio: Store,
  art: HardHat,
  caucion: ScrollText,
  "asistencia-viajero": Plane,
  "vida-familia": HeartPulse,
  tecnologia: Laptop,
  celulares: Smartphone,
  "accidentes-personales": Stethoscope,
  retiro: PiggyBank,
};

/** Ícono SVG de marca para cada ramo (reemplaza los emojis). */
export default function RamoIcon({
  slug,
  className = "h-7 w-7",
}: {
  slug: string;
  className?: string;
}) {
  const Icon = map[slug] ?? Shield;
  return <Icon className={className} strokeWidth={1.75} aria-hidden="true" />;
}
