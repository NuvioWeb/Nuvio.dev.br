# Procedimento — Deploy da API no Render (GitHub)

## Objetivo

Publicar só a API Nest (`apps/api`) a partir do monorepo  
`https://github.com/NuvioWeb/Nuvio.dev.br.git`.

O site (Static Site) é outro serviço; este guia é **apenas a API**.

## Pré-requisitos

- Conta em [render.com](https://render.com) (pode usar o Gmail `nuvioweb.enterprise@gmail.com`)
- Repo no GitHub já com o código na branch `main`
- Conta Resend com domínio `nuvio.dev.br` verificado
- API key Resend (`re_...`)

## Passo a passo

### 1. Conectar o GitHub

1. Entre em [dashboard.render.com](https://dashboard.render.com)
2. **Login** com GitHub (conta que tem acesso a `NuvioWeb/Nuvio.dev.br`)
3. Autorize o Render a ver o repositório (org **NuvioWeb** se pedir)

### 2. Criar o Web Service

1. **New +** → **Web Service**
2. Conecte / selecione **`NuvioWeb/Nuvio.dev.br`**
3. Preencha:

| Campo | Valor |
|--------|--------|
| **Name** | `nuvio-api` (ou similar) |
| **Region** | Oregon ou a mais próxima (ex. São Paulo se disponível) |
| **Branch** | `main` |
| **Root Directory** | *(deixe vazio)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install --include=dev && npm run build -w @nuvio/contracts && npm run build -w @nuvio/api` |
| **Start Command** | `node apps/api/dist/main.js` |
| **Instance type** | Free (para testar) ou Starter |

4. **Advanced** (opcional mas recomendado):
   - **Health Check Path:** `/health/live`

### 3. Variáveis de ambiente

Em **Environment** (antes ou depois do primeiro deploy), adicione:

| Key | Value | Notas |
|-----|--------|--------|
| `NODE_ENV` | `production` | |
| `API_HOST` | `0.0.0.0` | |
| `CORS_ORIGINS` | `https://nuvio.dev.br` | Só o site em produção; se ainda testar localhost, acrescente `http://localhost:5173` |
| `EMAIL_PROVIDER` | `resend` | |
| `EMAIL_FROM` | `Nuvio <contato@nuvio.dev.br>` | Domínio verificado no Resend |
| `EMAIL_TO` | `nuvioweb.enterprise@gmail.com` | Caixa que recebe os leads |
| `RESEND_API_KEY` | `re_...` | Do painel Resend; marque como **Secret** |
| `THROTTLE_TTL_MS` | `60000` | Opcional |
| `THROTTLE_LIMIT` | `10` | Opcional |
| `THROTTLE_LEAD_LIMIT` | `5` | Opcional |
| `BODY_LIMIT_BYTES` | `65536` | Opcional |

**Não** defina `PORT` — o Render injeta automaticamente.  
**Não** defina `DATABASE_URL` — o projeto não usa banco.

### 4. Deploy

1. Clique em **Create Web Service**
2. Acompanhe os **Logs**:
   - `npm install` / build contracts / build api
   - `node apps/api/dist/main.js`
   - Nest “successfully started”
3. Se falhar, leia o erro no log (build vs start)

### 5. URL pública da API

1. No topo do serviço aparece algo como:  
   `https://nuvio-api.onrender.com`
2. Teste no navegador:
   - `https://nuvio-api.onrender.com/health/live` → `{"status":"ok"}`
   - `https://nuvio-api.onrender.com/health/ready` → `{"status":"ready",...}`

### 6. Domínio customizado `api.nuvio.dev.br` (recomendado)

1. No Render → serviço → **Settings** → **Custom Domains** → **Add**  
   `api.nuvio.dev.br`
2. O Render mostra um **CNAME** (ex. apontar para `nuvio-api.onrender.com`)
3. Na **Cloudflare** → DNS → **Add record**:
   - Type: `CNAME`
   - Name: `api`
   - Target: o host que o Render indicou
   - Proxy: comece com **DNS only** (nuvem cinza); depois pode ligar proxy se quiser
4. Espere o SSL ficar **Active** no Render
5. Teste: `https://api.nuvio.dev.br/health/live`

### 7. Ligar o site à API

Quando for buildar o front (Cloudflare Pages ou Static Site no Render):

```env
VITE_PUBLIC_SITE_URL=https://nuvio.dev.br
VITE_API_BASE_URL=https://api.nuvio.dev.br
```

(use a URL real da API se ainda não tiver custom domain)

E na API, `CORS_ORIGINS` deve incluir exatamente a origem do site (`https://nuvio.dev.br`).

### 8. Validar o formulário de leads

1. Site no ar com `VITE_API_BASE_URL` correto
2. Envie um pedido de orçamento
3. Confira e-mail em `EMAIL_TO` (e spam)
4. Logs da API: notificação Resend sem PII completa

## Plano Free — atenção

- A API **pode dormir** após inatividade (~15 min)
- O primeiro request depois disso demora ~30–60 s (cold start)
- Para produção séria, use plano pago (sempre ligado)

## Redeploy

Qualquer `git push` na `main` (com auto-deploy ligado) gera novo deploy.  
Ou: **Manual Deploy** → **Deploy latest commit**.

## Troubleshooting

| Sintoma | O que checar |
|---------|----------------|
| Build falha em `nest` / TypeScript | Build command com `--include=dev` |
| `Cannot find module '@nuvio/contracts'` | Root Directory vazio; build de contracts antes da api |
| App sobe e cai | Logs do Nest; variáveis `EMAIL_*` / `RESEND_API_KEY` |
| Formulário CORS error | `CORS_ORIGINS` igual à URL do site (com `https://`) |
| E-mail não chega | Resend dashboard; `EMAIL_FROM` no domínio verificado; spam |
| Health 502 no Free | Serviço dormindo — espere o wake ou faça upgrade |

## Checklist rápido

- [ ] Web Service criado no Render com build/start corretos
- [ ] Variáveis de e-mail e CORS preenchidas
- [ ] `/health/live` responde 200
- [ ] Custom domain `api.nuvio.dev.br` (opcional mas ideal)
- [ ] Front com `VITE_API_BASE_URL` apontando para a API
