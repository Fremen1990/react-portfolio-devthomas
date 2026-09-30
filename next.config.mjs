/** @type {import("next").NextConfig} */
const nextConfig = {
  // Hostinger serves plain files from the build branch: export every page as
  // HTML, and write /work/x/ as out/work/x/index.html so deep links resolve.
  output: "export",
  trailingSlash: true,
  // Static export has no image server.
  images: { unoptimized: true },
};

export default nextConfig;
