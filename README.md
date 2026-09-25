# Site institucional Nuvio

Monorepo com o site oficial da Nuvio (`apps/web`) e a API de leads (`apps/api`).

## Stack

- **Web:** React 19 + TypeScript + Vite + React Router 7/8 Framework Mode (`ssr: false` + prerender)
- **UI:** Tailwind CSS v4 + componentes estilo shadcn + tokens Nuvio
- **API:** NestJS + Fastify (leads encaminhados por e-mail — **sem banco de dados**)
- **Contratos:** Zod em `packages/contracts`

## Pré-requisitos

- Node.js 20+
- npm 10+
- Conta/serviço de e-mail apenas quando for sair do provider `local` (Resend ou SMTP)

## Instalação

```bash
cp .env.example apps/api/.env
cp .env.example apps/web/.env   # ajuste VITE_* se necessário
npm install
npm approve-scripts esbuild @scarf/scarf
```

## Desenvolvimento

```bash
npm run dev:api
npm run dev:web
```

- Site: http://localhost:5173
- API: http://localhost:3001
- OpenAPI (dev): http://localhost:3001/docs
- Health: http://localhost:3001/health/live

Pedidos de orçamento (`POST /api/v1/leads`) são validados e **enviados por e-mail** — não há persistência em banco.

## Scripts

| Script | Descrição |
|--------|-----------|
| `npm run build` | Build contracts + api + web (com prerender) |
| `npm run typecheck` | Typecheck nos workspaces |
| `npm run test` | Testes unitários |
| `npm run test:e2e` | Playwright (requer build do web) |
| `npm run test:a11y` | axe via Playwright |
| `npm run audit` | npm audit |

## Identidade visual

Assets oficiais em `public/brand/` e `apps/web/public/brand/` (copiados do kit `nuvio-brand`).

## Contato institucional

Dados públicos em `apps/web/app/content/site.ts` (já preenchidos):

- **E-mail:** nuvioweb.enterprise@gmail.com
- **WhatsApp:** (62) 98104-6068
- **Instagram:** [@nuvioweb_](https://www.instagram.com/nuvioweb_/)

## Documentação

- `docs/implementation-plan.md`
- `docs/architecture.md`
- `docs/identity-system.md`
- `docs/content-guide.md`
- `docs/security/`
- `docs/seo/`
- `docs/procedures/`
- `docs/adr/`

## Pendências conhecidas neste ambiente

1. Portfólio está **oculto** até existirem cases reais (`portfolioVisible` em `apps/web/app/content/portfolio.ts`).
2. ESLint compartilhado ainda é placeholder — typecheck/test/build cobrem a qualidade principal.
