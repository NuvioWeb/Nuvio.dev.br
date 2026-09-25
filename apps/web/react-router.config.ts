import type { Config } from "@react-router/dev/config";
import { blogPosts } from "./app/content/blog";
import { portfolioVisible, getPublishedPortfolio } from "./app/content/portfolio";

const blogPaths = blogPosts
  .filter((p) => p.status === "published")
  .map((p) => `/blog/${p.slug}`);

const portfolioPaths = portfolioVisible
  ? [
      "/portfolio",
      ...getPublishedPortfolio().map((p) => `/portfolio/${p.slug}`),
    ]
  : [];

export default {
  ssr: false,
  prerender: [
    "/",
    "/servicos",
    "/processo",
    "/para-quem",
    ...portfolioPaths,
    "/blog",
    ...blogPaths,
    "/contato",
    "/politica-de-privacidade",
    "/politica-de-cookies",
    "/termos-de-uso",
    "/robots.txt",
    "/sitemap.xml",
  ],
} satisfies Config;
