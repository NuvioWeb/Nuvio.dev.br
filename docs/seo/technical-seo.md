# SEO técnico

## Estratégia

Pré-renderização estática (`ssr: false` + `prerender`) gera HTML inicial com títulos, textos e links.

## Implementado

- `meta` por rota (title, description, canonical, OG, Twitter)
- `robots.txt` e `sitemap.xml`
- JSON-LD: Organization, WebSite, FAQPage (home), BreadcrumbList, Article
- Um `h1` por página
- HTML semântico (header/nav/main/section/footer)
- `lang="pt-BR"`
- Favicon oficial

## Antes do go-live

1. Definir `VITE_PUBLIC_SITE_URL` / `PUBLIC_SITE_URL` com domínio real
2. Submeter sitemap no Search Console (ver procedures)
3. Remover/atualizar conteúdo demonstrativo do portfólio quando houver cases reais
