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
const { hero } = profile;
const headlineAt = hero.headline.lastIndexOf(hero.headlineAccent);
const HEADLINE = {
  before: hero.headline.slice(0, headlineAt),
  accent: hero.headlineAccent,
  after: hero.headline.slice(headlineAt + hero.headlineAccent.length),
};

// next/og spaced wrapped inline text unevenly, so the headline is laid out
// one word per flex item, with the accent word and its punctuation together.
// An array, not a fragment: next/og treats a fragment as one item.
const headlineWords = (accent: string, gap: number) => [
  ...HEADLINE.before
    .trim()
    .split(/\s+/)
    .map((word, index) => (
      <span key={index} style={{ marginRight: gap }}>
        {word}
      </span>
    )),
  <span key="accent" style={{ display: "flex" }}>
    <span style={{ color: accent }}>{HEADLINE.accent}</span>
    <span>{HEADLINE.after}</span>
  </span>,
];

// The standard skin's palette (src/index.css): a dark brand band in both
// themes, over a strip in the page colour.
const BAND = {
  text: "#e8eeeb",
  strong: "#ffffff",
  muted: "#9aa6a1",
  accent: "#8fd3da",
  line: "#2a3531",
};

const STANDARD = {
  light: {
    band: "#0f1413",
    page: "#f7f5f0",
    text: "#16181a",
    muted: "#5b5f63",
    accent: "#0f6b75",
    line: "#e0dbd0",
  },
  dark: {
    band: "#0a0e0d",
    page: "#0f1413",
    text: "#e8eeeb",
    muted: "#9aa6a1",
    accent: "#8fd3da",
    line: "#2a3531",
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

// Matches the standard hero: the dark band with the wordmark, the round
// portrait, name and role, and the Geist headline with its accent word,
// over a strip in the page colour that opens the work section.
const StandardCard = ({ look, portrait }: { look: Look; portrait: string }) => {
  const c = STANDARD[look.theme];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: c.page,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "48px 72px 44px",
          background: c.band,
          borderBottom: `2px solid ${BAND.line}`,
          color: BAND.text,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Geist Mono",
            fontSize: 26,
            fontWeight: 500,
            color: BAND.accent,
          }}
        >
          devthomas<span style={{ color: BAND.muted }}>.pl</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          {/* next/og renders plain <img> only; next/image does not apply here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portrait}
            width={84}
            height={84}
            alt=""
            style={{
              objectFit: "cover",
              objectPosition: "50% 30%",
              borderRadius: 999,
              border: `3px solid ${BAND.accent}`,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 22,
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 600, color: BAND.strong }}>
              {profile.name}
            </div>
            <div
              style={{
                marginTop: 4,
                fontFamily: "Geist Mono",
                fontSize: 20,
                color: BAND.muted,
              }}
            >
              {`${profile.headline} · ${hero.location}`}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            marginTop: 32,
            fontSize: 54,
            fontWeight: 600,
            letterSpacing: -1.4,
            lineHeight: 1.1,
            color: BAND.strong,
          }}
        >
          {headlineWords(BAND.accent, 14)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          padding: "26px 72px 30px",
          color: c.text,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Geist Mono",
              fontSize: 17,
              letterSpacing: 2,
              color: c.muted,
            }}
          >
            {profile.work.eyebrow.toUpperCase()}
          </div>
          <div style={{ marginTop: 6, fontFamily: "Fraunces", fontSize: 40 }}>
            Proven in production
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "10px 24px",
            borderRadius: 999,
            border: `2px solid ${c.accent}`,
            color: c.accent,
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          See the work
        </div>
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
            <div style={{ marginTop: 18, fontSize: 21, color: c.violet }}>
              {`# ${hero.location}`}
            </div>
            <div style={{ marginTop: 24, fontSize: 21, color: c.secondary }}>
              $ cat about.txt
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                marginTop: 8,
                fontSize: 25,
                fontWeight: 800,
                lineHeight: 1.35,
                color: c.text,
              }}
            >
              {headlineWords(c.accent, 15)}
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
    geist600,
    geistMono500,
    mono400,
    mono800,
    portrait,
  ] = await Promise.all([
    font("Fraunces-500.ttf"),
    font("Geist-400.ttf"),
    font("Geist-500.ttf"),
    font("Geist-600.ttf"),
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
        { name: "Geist", data: geist600, weight: 600, style: "normal" },
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
