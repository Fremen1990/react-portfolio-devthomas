import createMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const nextConfig = {
  // Hostinger serves plain files from the build branch: export every page as
  // HTML, and write /work/x/ as out/work/x/index.html so deep links resolve.
  output: "export",
  experimental: { globalNotFound: true },
  turbopack: { root: process.cwd() },
  trailingSlash: true,
  // Static export has no image server.
  images: { unoptimized: true },
  // Pages can be written in MDX (src/app/**/page.mdx).
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    // Named as strings so Turbopack can load them. GFM adds tables.
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
