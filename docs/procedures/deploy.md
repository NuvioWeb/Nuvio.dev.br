# Procedimento — Deploy e domínio

## Objetivo

Publicar o site estático e a API.

## Web (estático)

1. `npm run build -w @nuvio/web`
2. Publique `apps/web/build/client` em CDN/hosting estático (Cloudflare Pages, Netlify, S3+CloudFront, etc.)
3. Configure `VITE_PUBLIC_SITE_URL` e `VITE_API_BASE_URL` no build
4. Mapeie o domínio e HTTPS

## API

Ver também: `docs/procedures/railway.md` (deploy via GitHub).

1. Definir variáveis de ambiente no host (sem commit) — e-mail obrigatório em produção
2. Build: `npm run build:api` (contracts + api)
3. Rodar `npm run start:api` (`node apps/api/dist/main.js`)
4. Permitir apenas origens do site em `CORS_ORIGINS`
5. Usar `PORT` do host (Railway/Render) — a API já respeita essa variável
6. Não há banco nem migrations

## Validar

- Home pré-renderizada com HTML completo
- `/robots.txt` e `/sitemap.xml`
- `POST /api/v1/leads` com rate limit (deve gerar e-mail na caixa `EMAIL_TO`)
- `/health/ready`

## Search Console / Analytics

- Só ativar analytics após consentimento, se aplicável
- Documentar IDs reais quando existirem (não inventar)
