import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { findLook, looks, type Look } from "@/content/looks";
import { profile } from "@/content/publicProfile";

// The 1200×630 link-preview card for each look, rendered once at build time
// and exported as /look/<slug>/card.jpg. next/og draws a PNG; it is converted
// to JPEG because the photo made the PNG about 425 kB, and some apps
// (WhatsApp) skip preview images much over 300 kB. Colours match the design tokens in
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

// The CV's palette (cv.devthomas.pl), as in src/index.css.
const STANDARD = {
  light: {
    canvas: "#f7f5f0",
    text: "#16181a",
    soft: "#34383b",
    secondary: "#5b5f63",
    accent: "#0f6b75",
    accentSoft: "#e2efee",
    separator: "#e0dbd0",
  },
  dark: {
    canvas: "#0f1413",
    text: "#e8eeeb",
    soft: "#c3ccc8",
    secondary: "#9aa6a1",
    accent: "#8fd3da",
    accentSoft: "#17292b",
    separator: "#2a3531",
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

// Matches the standard hero, which follows the CV: the mono wordmark, the
// name in Fraunces, the availability pill, and the round, ringed portrait.
const StandardCard = ({ look, portrait }: { look: Look; portrait: string }) => {
  const c = STANDARD[look.theme];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        background: c.canvas,
        color: c.text,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          height: "100%",
          paddingRight: 48,
        }}
      >
        <div
          style={{
            fontFamily: "Geist Mono",
            fontSize: 26,
            fontWeight: 500,
            color: c.accent,
          }}
        >
          devthomas.pl
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 96,
              fontWeight: 500,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div style={{ marginTop: 20, fontSize: 36, fontWeight: 500 }}>
            {profile.headline}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 27,
              lineHeight: 1.4,
              color: c.soft,
            }}
          >
            {TAGLINE}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            padding: "8px 18px",
            border: `1px solid ${c.separator}`,
            borderRadius: 999,
            fontFamily: "Geist Mono",
            fontSize: 17,
            whiteSpace: "nowrap",
            color: c.secondary,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              marginRight: 12,
              borderRadius: 999,
              background: c.accent,
            }}
          />
          {profile.hero.location}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: 6,
          borderRadius: 999,
          background: c.accentSoft,
          border: `1px solid ${c.separator}`,
        }}
      >
        {/* next/og renders plain <img> only; next/image does not apply here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portrait}
          width={320}
          height={320}
          alt=""
          style={{
            objectFit: "cover",
            objectPosition: "50% 30%",
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
};

// Matches the site's Terminal hero: text on the left, the photo inside the
// window on the right, tinted like the site (green in dark, greyscale in light).
const TerminalCard = ({ look, portrait }: { look: Look; portrait: string }) => {
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
            flex: 1,
            alignItems: "center",
            padding: "0 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              paddingRight: 40,
            }}
          >
            <div style={{ fontSize: 26, color: c.secondary }}>$ whoami</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 10,
                fontSize: 62,
                fontWeight: 800,
                letterSpacing: -2,
                color: c.accent,
              }}
            >
              {profile.name}
              <div
                style={{
                  width: 30,
                  height: 54,
                  marginLeft: 10,
                  background: c.accent,
                }}
              />
            </div>
            <div style={{ marginTop: 16, fontSize: 29, color: c.amber }}>
              {`> ${profile.headline}`}
            </div>
            <div
              style={{
                marginTop: 26,
                fontSize: 23,
                lineHeight: 1.45,
                color: c.violet,
              }}
            >
              {`# ${TAGLINE}`}
            </div>
            <div style={{ marginTop: 28, fontSize: 24, color: c.text }}>
              {"$ open devthomas.pl"}
            </div>
          </div>
          {/* next/og renders plain <img> only; next/image does not apply here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portrait}
            width={300}
            height={380}
            alt=""
            style={{ border: `2px solid ${c.separator}`, borderRadius: 2 }}
          />
        </div>
      </div>
    </div>
  );
};

// The site tints the Terminal photo with CSS filters, which next/og can't
// apply, so the tint is baked in here: greyscale for light, and a soft green
// wash for dark (greyscale and tint in one sharp pipeline don't combine).
const terminalPortrait = async (source: Buffer, look: Look) => {
  const grey = await sharp(source)
    .resize({ width: 300, height: 380, fit: "cover", position: "centre" })
    .greyscale()
    .linear(
      look.theme === "dark" ? 1.2 : 1.15,
      look.theme === "dark" ? -22 : -10
    )
    .toColourspace("srgb")
    .png()
    .toBuffer();
  const tinted =
    look.theme === "dark"
      ? await sharp(grey).tint({ r: 182, g: 226, b: 192 }).png().toBuffer()
      : grey;
  return `data:image/png;base64,${tinted.toString("base64")}`;
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ look: string }> }
) {
  const look = findLook((await params).look);
  if (!look) {
    return new Response("Not found", { status: 404 });
  }

  const font = (file: string) => readFile(join(fontsDir, file));
  const [
    fraunces500,
    geist400,
    geist500,
    geistMono500,
    mono400,
    mono800,
    portrait,
  ] = await Promise.all([
    font("Fraunces-500.ttf"),
    font("Geist-400.ttf"),
    font("Geist-500.ttf"),
    font("GeistMono-500.ttf"),
    font("JetBrainsMono-400.ttf"),
    font("JetBrainsMono-800.ttf"),
    readFile(portraitPath),
  ]);

  const png = new ImageResponse(
    look.skin === "terminal" ? (
      <TerminalCard
        look={look}
        portrait={await terminalPortrait(portrait, look)}
      />
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
        { name: "Fraunces", data: fraunces500, weight: 500, style: "normal" },
        { name: "Geist", data: geist400, weight: 400, style: "normal" },
        { name: "Geist", data: geist500, weight: 500, style: "normal" },
        {
          name: "Geist Mono",
          data: geistMono500,
          weight: 500,
          style: "normal",
        },
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

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg" },
  });
}
