# ADR 0003 — Sem banco de dados para leads

## Status

Aceito (substitui a decisão anterior de Prisma 6 + PostgreSQL)

## Contexto

A decisão inicial previa persistir leads e newsletter no PostgreSQL via Prisma. O produto prioriza apenas o encaminhamento de pedidos de orçamento à equipe; não há requisito de CRM, histórico consultável nem newsletter no site.

## Decisão

- **Não** usar banco de dados na API.
- Remover Prisma, migrations, Docker Compose de Postgres e o módulo de newsletter.
- Fluxo de lead: validar (`packages/contracts`) → notificar por e-mail (`EmailProvider`) → responder `{ id, status: "received" }` com `id` efêmero (`crypto.randomUUID`) só para correlação em logs/e-mail.
- Se o e-mail falhar, a API responde erro (sem fingir que o pedido foi recebido).

## Consequências

- API sobe sem Docker/WSL/Postgres.
- Histórico de pedidos fica só na caixa de e-mail configurada (`EMAIL_TO`).
- Reintroduzir persistência exige ADR dedicado + atualização da política de privacidade.
