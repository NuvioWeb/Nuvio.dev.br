import type { Route } from "./+types/sitemap[.]xml";
import { blogPosts } from "~/content/blog";
import { getPublishedPortfolio, portfolioVisible } from "~/content/portfolio";
import { getSiteUrl } from "~/lib/env";

export function loader({}: Route.LoaderArgs) {
  const base = getSiteUrl();
  const today = new Date().toISOString().slice(0, 10);

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
    ...(portfolioVisible
      ? [
          "/portfolio",
          ...getPublishedPortfolio().map((p) => `/portfolio/${p.slug}`),
        ]
      : []),
  ];

  const entries = [
    ...staticPaths.map((path) => ({
      loc: `${base}${path === "/" ? "" : path}`,
      lastmod: today,
    })),
    ...blogPosts
      .filter((p) => p.status === "published")
      .map((p) => ({
        loc: `${base}/blog/${p.slug}`,
        lastmod: p.updatedAt || p.publishedAt,
      })),
  ];

  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
