import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const webDir = path.resolve(rootDir, "..");
const publicDir = path.join(webDir, "public");
const blogPath = path.join(webDir, "app", "content", "blog.ts");
const portfolioPath = path.join(webDir, "app", "content", "portfolio.ts");

const siteUrl = (
  process.env.VITE_PUBLIC_SITE_URL || "https://nuvio.dev.br"
).replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

function publishedBlogEntries() {
  const source = readFileSync(blogPath, "utf8");
  const entries = [];
  const blockRe =
    /\{\s*slug:\s*"([^"]+)"[\s\S]*?status:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"[\s\S]*?updatedAt:\s*"([^"]+)"/g;
  for (const match of source.matchAll(blockRe)) {
    const [, slug, status, publishedAt, updatedAt] = match;
    if (status === "published") {
      entries.push({ slug, lastmod: updatedAt || publishedAt });
    }
  }
  return entries;
}

function portfolioVisible() {
  const source = readFileSync(portfolioPath, "utf8");
  return /export const portfolioVisible = true/.test(source);
}

function publishedPortfolioSlugs() {
  if (!portfolioVisible()) return [];
  const source = readFileSync(portfolioPath, "utf8");
  const slugs = [];
  const blockRe =
    /\{\s*slug:\s*"([^"]+)"[\s\S]*?status:\s*"([^"]+)"/g;
  for (const match of source.matchAll(blockRe)) {
    const [, slug, status] = match;
    if (status === "published") slugs.push(slug);
  }
  return slugs;
}

const staticPaths = [
  "/",
  "/servicos",
  "/processo",
  "/para-quem",
  "/blog",
  "/contato",
  "/politica-de-privacidade",
  "/politica-de-cookies",
  "/termos-de-uso",
];

if (portfolioVisible()) {
  staticPaths.push("/portfolio", ...publishedPortfolioSlugs().map((s) => `/portfolio/${s}`));
}

const urls = [
  ...staticPaths.map((p) => ({
    loc: `${siteUrl}${p === "/" ? "" : p}`,
    lastmod: today,
  })),
  ...publishedBlogEntries().map((p) => ({
    loc: `${siteUrl}/blog/${p.slug}`,
    lastmod: p.lastmod,
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");
console.log(`SEO files written to public/ (${urls.length} sitemap URLs)`);
