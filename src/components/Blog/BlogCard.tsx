import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { visiblePosts } from "@/content/blog/.generated/posts";
import type { BlogLocale } from "@/content/blog/types";
// Standard design-system band colours, matching index.css. Font is local.
export async function blogCard(slug: string, locale: BlogLocale) {
  const post = visiblePosts.find((p) => p.slug === slug);
  if (!post) return new Response("Not found", { status: 404 });
  const font = await readFile(
    join(process.cwd(), "src/assets/fonts/Geist-600.ttf")
  );
  const image = new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 70,
        background: "#0f1413",
        color: "#e8eeeb",
        fontFamily: "Geist",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, color: "#8fd3da" }}>
        devthomas.pl / blog · {locale.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 56,
          lineHeight: 1.12,
          letterSpacing: -1,
        }}
      >
        {post.editions[locale].title}
      </div>
      <div style={{ display: "flex", fontSize: 24 }}>Tomasz Stanisz</div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Geist", data: font, weight: 600, style: "normal" }],
    }
  );
  const jpeg = await sharp(Buffer.from(await image.arrayBuffer()))
    .jpeg({ quality: 85 })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg" },
  });
}
