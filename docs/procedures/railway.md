# Procedimento — Deploy da API no Railway (GitHub)

## Objetivo

Publicar a API Nest (`apps/api`) a partir do monorepo.

O site estático continua no Cloudflare Pages (`apps/web/build/client`).

## 1. GitHub

Repositório: `https://github.com/NuvioWeb/Nuvio.dev.br.git`

## 2. Novo projeto no Railway

1. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
2. Selecione `NuvioWeb/Nuvio.dev.br`
3. **Root Directory:** vazio (raiz do monorepo)
4. O arquivo `railway.toml` na raiz já define build/start

## 3. Variáveis (Settings → Variables)

```env
NODE_ENV=production
API_HOST=0.0.0.0
CORS_ORIGINS=https://nuvio.dev.br
EMAIL_PROVIDER=resend
EMAIL_FROM=Nuvio <contato@nuvio.dev.br>
EMAIL_TO=nuvioweb.enterprise@gmail.com
RESEND_API_KEY=re_xxxxxxxx
```

`PORT` é injetado automaticamente pelo Railway — não precisa definir.

## 4. Domínio

1. No serviço Railway → **Settings** → **Networking** → **Generate Domain**  
   (ex.: `nuvio-api-production.up.railway.app`)
2. Ou domínio custom: `api.nuvio.dev.br` (CNAME no Cloudflare apontando para o host Railway)

## 5. Site (Cloudflare Pages)

No build do web:

```env
VITE_PUBLIC_SITE_URL=https://nuvio.dev.br
VITE_API_BASE_URL=https://api.nuvio.dev.br
```

(use a URL pública real da API)

## 6. Validar

- `GET https://<api>/health/live`
- `GET https://<api>/health/ready`
- Formulário de contato no site → e-mail em `EMAIL_TO`
