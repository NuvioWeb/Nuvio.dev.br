# ADR 0001 — React Router 7 Framework Mode com pré-renderização estática

## Status

Aceito

## Contexto

O site institucional precisa de HTML inicial indexável (SEO, Core Web Vitals, compreensão por crawlers) sem obrigar um runtime Node para o frontend em produção.

## Decisão

Usar React Router 7 em Framework Mode com Vite, `ssr: false` e `prerender` de todas as rotas públicas estáticas (e slugs de conteúdo conhecidos em build time).

## Consequências

- Conteúdo principal existe no HTML gerado no build.
- Loaders rodam no build para rotas pré-renderizadas; actions HTTP ficam na API NestJS.
- Deploy do web pode ser estático (CDN/static hosting).
- Rotas dinâmicas futuras exigem lista de paths no `prerender` ou SPA fallback.
