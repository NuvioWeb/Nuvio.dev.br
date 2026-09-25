# Checklist de segurança

- [x] Validação de input no backend (Zod)
- [x] Rate limiting global + endpoint de leads
- [x] Helmet / headers de segurança (Fastify)
- [x] CORS allowlist
- [x] Body size limit
- [x] Honeypot no lead
- [x] Sem secrets no código
- [x] Erros sem stack trace em produção
- [x] Redaction de PII em logs
- [x] SMTP/Resend configurável (`EMAIL_PROVIDER=resend`)
- [x] Domínio `nuvio.dev.br` verificado no Resend (`EMAIL_FROM=Nuvio <contato@nuvio.dev.br>`)
- [ ] Turnstile/CAPTCHA (opcional) se abuso real
- [ ] HTTPS no deploy
- [ ] Revisão jurídica LGPD das políticas
- [ ] Rotacionar API key se foi exposta em chat
