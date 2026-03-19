import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background:
          "radial-gradient(circle at top left, rgba(34,211,238,0.22), transparent 28%), linear-gradient(135deg, #020617 0%, #0f172a 48%, #111827 100%)",
        color: "#f8fafc",
        padding: 64,
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 24,
          color: "#67e8f9",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: "#67e8f9",
          }}
        />
        HamzaDev Portfolio
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
          Architecte et developpeur full-stack pour produits web exigeants.
        </div>
        <div
          style={{
            maxWidth: 880,
            fontSize: 30,
            lineHeight: 1.4,
            color: "#cbd5e1",
          }}
        >
          Architecture logicielle, delivery full-stack, SaaS et plateformes IA
          de niveau production.
        </div>
      </div>
      <div style={{ display: "flex", gap: 18, fontSize: 24, color: "#94a3b8" }}>
        <div>Next.js</div>
        <div>TypeScript</div>
        <div>Prisma</div>
        <div>Auth.js</div>
      </div>
    </div>,
    size,
  );
}
