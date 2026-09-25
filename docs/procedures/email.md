# Procedimento — E-mail de notificação de leads (Resend)

## Objetivo

Notificar `nuvioweb.enterprise@gmail.com` quando um lead chegar pelo site.

## A chave `re_...` é suficiente?

**Sim, para a API do Resend.** É uma API key, não um login SMTP tradicional.

Opções suportadas:

1. **Recomendado:** `EMAIL_PROVIDER=resend` + `RESEND_API_KEY=re_...`
2. **SMTP Resend:** host `smtp.resend.com`, user `resend`, senha = a mesma API key

## Pré-requisitos

- Conta Resend
- API key (`re_...`)
- Domínio `nuvio.dev.br` **verificado** no Resend

## Configuração (`apps/api/.env`)

```env
EMAIL_PROVIDER=resend
EMAIL_FROM=Nuvio <contato@nuvio.dev.br>
EMAIL_TO=nuvioweb.enterprise@gmail.com
RESEND_API_KEY=re_xxxxxxxx
```

## Validar

1. Suba a API (`npm run dev:api`)
2. Envie um lead pelo formulário
3. Confira a caixa de `nuvioweb.enterprise@gmail.com` (e spam)
4. Logs da API mostram `Lead notification sent via Resend` **sem** PII completa

## Segurança

- Nunca commitare `RESEND_API_KEY`
- Se a chave foi colada em chat/e-mail, **revogue e gere outra** no painel Resend

## Desfazer

`EMAIL_PROVIDER=local` e remova a chave do ambiente.
