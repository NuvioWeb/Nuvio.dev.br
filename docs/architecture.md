# Arquitetura

## Visão geral

Monólito modular em monorepo npm workspaces:

```text
apps/web          # Site institucional (React Router Framework Mode)
apps/api          # API NestJS + Fastify (leads → e-mail)
packages/contracts# Schemas Zod compartilhados
public/brand/     # Assets oficiais Nuvio
docs/             # Plano, ADRs, segurança, SEO, procedures
```

## Frontend

- Rotas em `apps/web/app/routes/*`
- Pré-renderização estática das rotas públicas no build (`react-router.config.ts`)
- Conteúdo em `apps/web/app/content/*` (sem inventar clientes)
- Formulário de contato → `POST /api/v1/leads` via TanStack Query + RHF + Zod
- Tokens semânticos em `app.css` mapeados à paleta Nuvio (light/dark)

## Backend

- Módulos: `health`, `leads`
- Leads **não** são persistidos: validação Zod + `EmailProvider` (local / Resend / SMTP)
- Segurança: Helmet, CORS allowlist, throttling, honeypot, redaction de PII em logs
- Sem PostgreSQL, Prisma ou Docker de banco

## Fronteiras futuras

Portfólio/blog continuam estáticos no frontend. Se no futuro houver CRM ou cadastro de clientes, isso exige ADR novo (e consentimento/retenção explícitos).
