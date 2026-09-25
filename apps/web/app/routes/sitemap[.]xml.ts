import type { Route } from "./+types/sitemap[.]xml";
import { blogPosts } from "~/content/blog";
import { getPublishedPortfolio, portfolioVisible } from "~/content/portfolio";
import { getSiteUrl } from "~/lib/env";

export function loader({}: Route.LoaderArgs) {
  const base = getSiteUrl();
  const paths = [
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
    ...blogPosts
      .filter((p) => p.status === "published")
      .map((p) => `/blog/${p.slug}`),
  ];

  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${base}${path === "/" ? "" : path}</loc>
  </url>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
