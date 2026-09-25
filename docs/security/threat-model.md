# Threat model (resumo)

## Ativos

- Dados de leads em trânsito (PII no POST e no e-mail de notificação)
- Disponibilidade do formulário
- Integridade do site estático
- Credenciais de e-mail/SMTP/Resend

## Ameaças principais

| Ameaça | Mitigação |
|-------|-----------|
| Spam / abuso no formulário | Rate limit, honeypot, validação Zod, body limit |
| Injeção / abuso de payload | Validação Zod estrita; sem SQL (sem banco) |
| XSS | React escaping; JSON-LD só com objetos internos |
| Vazamento de PII em logs | Redaction Pino; logs sem mensagem completa |
| CORS aberto | Allowlist explícita |
| Secrets no Git/frontend | `.env.example` apenas; VITE_* sem segredos |

## Fora de escopo atual

- Backoffice autenticado
- Persistência de leads / CRM
- Multi-tenant com dados de clientes
