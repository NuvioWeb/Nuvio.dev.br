# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Donos de pequenas empresas e negócios locais no Brasil que precisam de presença online clara e profissional. Job principal: contratar e acompanhar a criação de um site com estratégia, design e tecnologia compreensíveis — sem jargão desnecessário.

## Product Purpose

A Nuvio cria sites profissionais para PMEs e negócios locais. O site institucional (`apps/web`) apresenta a oferta, o processo, o público-alvo, o portfólio e o blog, e captura leads via contato (formulário → API) e WhatsApp. Sucesso = clareza da proposta, confiança na marca e conversão para contato real.

## Positioning

“Seu negócio online, do jeito certo.” Combina estratégia, design e tecnologia de forma clara, com acompanhamento — sem prometer ranking no Google, faturamento ou resultados inventados.

## Operating Context

- Site público em português do Brasil (`pt-BR`), URL canônica `https://nuvio.dev.br`
- Contato institucional: e-mail e WhatsApp reais em `apps/web/app/content/site.ts`; Instagram `@nuvioweb_`
- Atendimento remoto para negócios locais no Brasil
- Formulário de contato → `POST /api/v1/leads` (API NestJS em `apps/api`)
- Conteúdo editorial e portfólio em `apps/web/app/content/*` (estático no frontend hoje)

## Capabilities and Constraints

- Stack confirmada: React 19 + TypeScript + Vite + React Router Framework Mode (`ssr: false` + prerender); Tailwind CSS v4 + componentes estilo shadcn; tokens Nuvio; API NestJS + Fastify (leads por e-mail, sem banco); contratos Zod em `packages/contracts`
- **Não inventar** depoimentos, métricas, prêmios, clientes, cases, redes sociais, preços ou claims comerciais não confirmados
- **Não quebrar** identidade Mosaico, rotas/conteúdo existentes, tokens, assets de marca, contratos da API, SEO/prerender, nem dados de contato reais
- Portfólio: oculto por padrão (`portfolioVisible = false` em `app/content/portfolio.ts`). Só ligar e publicar com cases reais (`status: "published"`, `isDemo: false`).
- Blog: datas verdadeiras, autor identificado; rascunhos `draft` fora do prerender/sitemap
- Undecided: nada adicional registrado nesta sessão

## Brand Commitments

- Nome: **Nuvio**
- Tagline: “Seu negócio online, do jeito certo.”
- Identidade visual oficial **Mosaico** (Azul-ardósia + Dourado), documentada em `docs/identity-system.md`
- Tipografia de marca: Manrope (títulos) + DM Sans (texto/UI)
- Assets oficiais: `apps/web/public/brand/` (logos, symbol, favicon, banner, social templates)
- Tom de voz: português do Brasil, claro e consultivo (`docs/content-guide.md`)
- Identidade de clientes permanece separada da marca Nuvio

## Evidence on Hand

- Conteúdo e copy do site em `apps/web/app/content/`
- Contato e redes reais em `apps/web/app/content/site.ts`
- Kit de marca em `apps/web/public/brand/` e `public/brand/`
- Docs: `docs/identity-system.md`, `docs/content-guide.md`, `docs/architecture.md`, `docs/implementation-plan.md`
- **Ausências que trabalho futuro não deve fabricar:** depoimentos, benchmarks, cases de clientes sem `published`/dados reais, métricas de resultado, e-mails/WhatsApp/sociais além dos já preenchidos

## Product Principles

1. Clareza antes de ornamentação — o visitante entende a oferta e o próximo passo.
2. Verdade factual — só conteúdo e prova confirmados; ausência explícita, nunca invenção.
3. Preservar a identidade Mosaico e o sistema já implementado; evoluir sem quebrar.
4. Conversão honesta para contato real (formulário / WhatsApp), sem urgência falsa.
5. PT-BR consultivo e acessível a donos de negócio local, não a designers internos.

## Accessibility & Inclusion

Há cobertura de a11y smoke (Playwright + axe na home). Nenhum padrão WCAG formal adicional foi exigido nesta sessão; manter contraste e semântica ao evoluir a UI.
