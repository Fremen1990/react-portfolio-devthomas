import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { findLook, looks, type Look } from "@/content/looks";
import { profile } from "@/content/publicProfile";

// The 1200×630 link-preview card for each look, rendered once at build time
// and exported as /look/<slug>/card.png. Colours match the design tokens in
// src/index.css and src/design/skin-terminal.css.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return looks.map(({ slug }) => ({ look: slug }));
}

const WIDTH = 1200;
const HEIGHT = 630;
const TAGLINE =
  "Frontend architecture, full-stack development and technical leadership.";

const STANDARD = {
  light: {
    canvas: "#f7f8fa",
    text: "#17212b",
    secondary: "#4b5563",
    accent: "#0f6b75",
    onAccent: "#ffffff",
    separator: "#dde3e8",
  },
  dark: {
    canvas: "#10161b",
    text: "#e8eef2",
    secondary: "#c5d0d8",
    accent: "#8fd3da",
    onAccent: "#102228",
    separator: "#2c3842",
  },
};

const TERMINAL = {
  light: {
    canvas: "#f3f1e7",
    surface: "#fbfaf4",
    bar: "#e9e6d6",
    text: "#1d2a1f",
    secondary: "#4e5c4f",
    accent: "#1f7a3a",
    amber: "#9a5b00",
    violet: "#7a3e9d",
    separator: "#cfcbb6",
  },
  dark: {
    canvas: "#07090a",
    surface: "#0d1210",
    bar: "#121a16",
    text: "#d4f5dc",
    secondary: "#86a891",
    accent: "#5dff8f",
    amber: "#ffc861",
    violet: "#d7a6ff",
    separator: "#1e2d25",
  },
};

const fontsDir = join(process.cwd(), "src/assets/fonts");
const portraitPath = join(process.cwd(), "public/portrait.jpg");

const StandardCard = ({ look, portrait }: { look: Look; portrait: string }) => {
  const c = STANDARD[look.theme];
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 72,
        background: c.canvas,
        color: c.text,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          paddingRight: 56,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: c.accent,
              color: c.onAccent,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            TS
          </div>
          <div style={{ fontSize: 28, color: c.secondary }}>devthomas.pl</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 36,
              fontWeight: 700,
              color: c.accent,
            }}
          >
            {profile.headline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.4,
              color: c.secondary,
            }}
          >
            {TAGLINE}
          </div>
        </div>
      </div>
      {/* next/og renders plain <img> only; next/image does not apply here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={portrait}
        width={380}
        height={486}
        alt=""
        style={{
          objectFit: "cover",
          objectPosition: "50% 40%",
          borderRadius: 24,
          border: `2px solid ${c.separator}`,
        }}
      />
    </div>
  );
};

const TerminalCard = ({ look }: { look: Look }) => {
  const c = TERMINAL[look.theme];
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 48,
        background: c.canvas,
        fontFamily: "JetBrains Mono",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          border: `2px solid ${c.accent}`,
          borderRadius: 8,
          background: c.surface,
          ...(look.theme === "dark"
            ? { boxShadow: `0 0 40px ${c.accent}33` }
            : {}),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 24px",
            borderBottom: `2px solid ${c.separator}`,
            background: c.bar,
            color: c.secondary,
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", letterSpacing: 6 }}>●●●</div>
          <div style={{ display: "flex" }}>tomasz@devthomas — zsh</div>
          <div style={{ display: "flex", width: 60 }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: "0 56px",
          }}
        >
          <div style={{ fontSize: 30, color: c.secondary }}>$ whoami</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 12,
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: -3,
              color: c.accent,
            }}
          >
            {profile.name}
            <div
              style={{
                width: 40,
                height: 72,
                marginLeft: 12,
                background: c.accent,
              }}
            />
          </div>
          <div style={{ marginTop: 18, fontSize: 38, color: c.amber }}>
            {`> ${profile.headline}`}
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 26,
              lineHeight: 1.45,
              color: c.violet,
            }}
          >
            {`# ${TAGLINE}`}
          </div>
          <div style={{ marginTop: 34, fontSize: 28, color: c.text }}>
            {"$ open devthomas.pl"}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ look: string }> }
) {
  const look = findLook((await params).look);
  if (!look) {
    return new Response("Not found", { status: 404 });
  }

  const [inter400, inter700, mono400, mono800, portrait] = await Promise.all([
    readFile(join(fontsDir, "Inter-400.ttf")),
    readFile(join(fontsDir, "Inter-700.ttf")),
    readFile(join(fontsDir, "JetBrainsMono-400.ttf")),
    readFile(join(fontsDir, "JetBrainsMono-800.ttf")),
    readFile(portraitPath),
  ]);

  return new ImageResponse(
    look.skin === "terminal" ? (
      <TerminalCard look={look} />
    ) : (
      <StandardCard
        look={look}
        portrait={`data:image/jpeg;base64,${portrait.toString("base64")}`}
      />
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Inter", data: inter400, weight: 400, style: "normal" },
        { name: "Inter", data: inter700, weight: 700, style: "normal" },
        {
          name: "JetBrains Mono",
          data: mono400,
          weight: 400,
          style: "normal",
        },
        {
          name: "JetBrains Mono",
          data: mono800,
          weight: 800,
          style: "normal",
        },
      ],
    }
  );
}
