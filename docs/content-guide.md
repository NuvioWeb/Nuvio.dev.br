# Guia de conteúdo

## Regras gerais

- Português do Brasil, tom claro e consultivo
- Não inventar depoimentos, métricas, prêmios, clientes ou redes sociais
- Não prometer “1º lugar no Google” ou faturamento

## Portfólio

- Só publicar com `status: "published"` e dados reais **ou** `isDemo: true` explícito
- Referências de identidade de cliente: `identidade-visual/[slug]/references.md`
- Cores não confirmadas: `needsConfirmation: true`

## Blog

- Datas verdadeiras
- Autor identificado
- Rascunhos com `status: "draft"` ficam fora do prerender/sitemap

## Contato institucional

Preencher em `apps/web/app/content/site.ts`:

- `email.value`
- `whatsapp.value`
- `social[]` somente com URLs reais
