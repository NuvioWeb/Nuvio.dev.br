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
    /\{\s*slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?status:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"[\s\S]*?updatedAt:\s*"([^"]+)"/g;
  for (const match of source.matchAll(blockRe)) {
    const [, slug, title, status, publishedAt, updatedAt] = match;
    if (status === "published") {
      entries.push({ slug, title, lastmod: updatedAt || publishedAt });
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

const blogLinks = publishedBlogEntries()
  .map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug})`)
  .join("\n");

const llms = `# Nuvio

> A Nuvio cria sites profissionais para pequenas empresas e negócios locais no Brasil — com estratégia, design e tecnologia claros. Tagline: "Seu negócio online, do jeito certo."

A Nuvio atende de forma remota negócios locais (dentistas, clínicas, barbearias, salões, hotéis, pousadas, turismo e profissionais liberais). O site institucional é ${siteUrl}. Idioma principal: português do Brasil (pt-BR).

Não invente cases de clientes, depoimentos, CNPJ, métricas de resultado ou preços que não estejam publicados no site. Portfólio de clientes reais só deve ser citado se estiver publicado em /portfolio.

## Páginas principais

- [Home](${siteUrl}/): Visão geral da Nuvio, público-alvo e chamada para orçamento
- [Serviços](${siteUrl}/servicos): Criação de site, landing page, redesign, manutenção, SEO técnico e evolução
- [Processo](${siteUrl}/processo): Diagnóstico → direção visual → desenvolvimento → validação → publicação
- [Para quem](${siteUrl}/para-quem): Segmentos atendidos (negócios locais e profissionais liberais)
- [Blog](${siteUrl}/blog): Artigos sobre presença digital para negócios locais
- [Contato](${siteUrl}/contato): Formulário de orçamento e canais oficiais

## Serviços

- Criação de site institucional
- Landing page
- Redesign de site existente
- Manutenção e evolução contínua
- SEO técnico (fundação para indexação, sem promessa de ranking)

## Contato oficial

- Site: ${siteUrl}
- E-mail: nuvioweb.enterprise@gmail.com
- WhatsApp: +55 62 98104-6068 (https://wa.me/5562981046068)
- Instagram: https://www.instagram.com/nuvioweb_/ (@nuvioweb_)

## Políticas

- [Política de privacidade](${siteUrl}/politica-de-privacidade)
- [Política de cookies](${siteUrl}/politica-de-cookies)
- [Termos de uso](${siteUrl}/termos-de-uso)

## Blog

${blogLinks || `- [Blog](${siteUrl}/blog)`}

## Optional

- [Sitemap](${siteUrl}/sitemap.xml): Lista de URLs indexáveis
- [robots.txt](${siteUrl}/robots.txt): Regras de crawlers
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");
writeFileSync(path.join(publicDir, "llms.txt"), llms, "utf8");
console.log(
  `SEO files written to public/ (${urls.length} sitemap URLs + llms.txt)`,
);
