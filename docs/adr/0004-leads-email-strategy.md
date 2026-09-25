# ADR 0004 — Estratégia de leads e e-mail

## Status

Aceito (atualizado: sem persistência)

## Contexto

O formulário de orçamento é o objetivo principal de conversão. Integrações de e-mail exigem credenciais externas. Não há requisito de armazenar quem pediu orçamento.

## Decisão

- **Não** persistir leads em banco.
- Interface `EmailProvider` com `LocalEmailProvider` (arquivo `.local-mail/outbox.jsonl`) para desenvolvimento.
- Provider real (Resend/SMTP) configurável por env — documentado em `docs/procedures/email.md`.
- Rate limit + honeypot no endpoint; validação Zod compartilhada via `packages/contracts`.
- Consentimento no formulário cobre o encaminhamento do pedido à equipe por e-mail.

## Consequências

- Dev funciona sem conta de e-mail (`EMAIL_PROVIDER=local`).
- Produção exige `EMAIL_PROVIDER` + secrets antes de notificar a equipe.
- Logs nunca contêm o corpo completo da mensagem do lead.
- Falha de envio de e-mail = falha da requisição (503), para o visitante poder tentar de novo ou usar WhatsApp.
