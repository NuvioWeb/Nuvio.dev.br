# Plano de implementação — Site institucional Nuvio

## Contexto

O repositório `Site/` estava vazio (greenfield). A identidade visual oficial (**Mosaico** — Azul-ardósia + Dourado) está em `Identidade Visual/` e foi aplicada em `apps/web/public/brand/` e nos tokens do site.

## Decisões de stack (versões estáveis na data da implementação)

| Camada | Escolha | Motivo |
|--------|---------|--------|
| Monorepo | npm workspaces | Simples, sem complexidade prematura de pnpm/turborepo |
| Web | React 19 + TypeScript strict + Vite + React Router 7 Framework Mode | Framework Mode estável com `prerender` e code splitting |
| Render | `ssr: false` + `prerender` de rotas públicas | HTML inicial para SEO sem servidor Node para o site |
| UI | Tailwind CSS v4 + shadcn/ui (new-york) + tokens semânticos | Compatível com a stack atual do shadcn |
| Dados cliente | TanStack Query + RHF + Zod | Forms e server state conforme especificação |
| API | NestJS + FastifyAdapter | Performance e adapters de segurança Fastify |
| Leads | E-mail only (`EmailProvider`) | Sem CRM/banco — pedidos só encaminhados à equipe |
| Contratos | `packages/contracts` (Zod) | Schemas compartilhados web/api |

## Fases

### Fase 0 — Fundação
- [x] Inspeção do repo e brand kit
- [x] Scaffold monorepo e configs
- [x] ADRs iniciais
- [x] `.env.example` e scripts raiz

### Fase 1 — API
- [x] NestJS modular (health, leads, email local/Resend/SMTP)
- [x] Validação Zod, rate limit, Helmet, CORS, OpenAPI
- [x] Sem banco: leads não persistidos (ADR 0003)

### Fase 2 — Web base
- [x] Tokens Nuvio, tipografia, componentes
- [x] Layout e rotas públicas PT-BR
- [x] SEO (meta, robots, sitemap, JSON-LD)
- [x] Formulário de contato → API
- [x] Build com prerender das rotas públicas

### Fase 3 — Conteúdo
- [x] Blog e portfólio (portfólio oculto até cases reais)
- [x] Políticas

### Fase 4 — Qualidade
- [x] Testes unitários contracts/api/seo
- [x] Playwright E2E/a11y (smoke + axe home)
- [x] typecheck/build web e api
- [x] Documentação base

## Regras de conteúdo

- Não inventar depoimentos, métricas, clientes ou redes sociais.
- Portfolio/blog: só conteúdo real ou explicitamente `demo` / `needsContent`.
- Em produção, áreas `needsContent` não devem aparecer como afirmações factuais.

## Critérios de saída por fase

Após cada fase: `typecheck`, `lint`, testes relevantes e `build` devem passar (ou falhas devem ser corrigidas antes de avançar).
