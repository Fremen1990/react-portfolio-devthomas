import type { ReactNode } from "react";

export type Heading = { id: string; text: string };

/** A URL fragment for a heading: "What I'd do differently" → "what-id-do-differently". */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** The plain text of rendered children, for building a heading's id. */
export const textOf = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textOf).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
};

/**
 * The level-2 headings of an MDX source, in order, with the same ids the
 * MDX h2 component gives them. Fenced code blocks are skipped.
 */
export const headingsFromMdx = (source: string): Heading[] => {
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of source.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    const match = !inFence && /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      const text = match[1].replace(/[*_`]/g, "");
      headings.push({ id: slugify(text), text });
    }
  }
  return headings;
};
