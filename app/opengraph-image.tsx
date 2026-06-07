import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.nombre} — Productora Asesora de Seguros`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #be185d 0%, #db2777 55%, #831843 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: "9999px",
            border: "3px solid white",
            fontSize: 40,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          {site.iniciales}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          {site.nombre}
        </div>
        <div style={{ fontSize: 34, marginTop: 8, opacity: 0.92 }}>
          Productora Asesora de Seguros
        </div>
        <div style={{ fontSize: 26, marginTop: 28, opacity: 0.85 }}>
          {site.tagline}
        </div>
        <div style={{ fontSize: 22, marginTop: 24, opacity: 0.8 }}>
          {`${site.matriculaSSN} · ${site.ciudad}`}
        </div>
      </div>
    ),
    size,
  );
}
