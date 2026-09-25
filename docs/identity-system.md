# Sistema de identidade Nuvio — Mosaico

## Conceito

Quatro blocos (estratégia, design, tecnologia, crescimento) com espaço negativo central de clareza. Paleta **Azul-ardósia + Dourado**.

## Tokens oficiais

| Token | Hex | Uso |
|-------|-----|-----|
| `--nuvio-ink` | `#1E293B` | Fundo principal, espaço negativo, superfícies profundas |
| `--nuvio-ink-2` / `--nuvio-slate` | `#334155` | Cards, módulos secundários, apoio |
| `--nuvio-gold` / `--nuvio-highlight` | `#F4B942` | Botões, CTAs, detalhes do Mosaico |
| `--nuvio-cloud` | `#F8FAFC` | Fundo claro e leitura |
| `--nuvio-line` | `#D1D5DB` | Divisórias e apoio |

Gradiente: `135deg, #F4B942 → #334155 → #F4B942`

## Tokens semânticos

Light: `background=#F8FAFC`, `primary=#F4B942`, `primary-foreground=#1E293B`  
Dark: `background=#0A0F18`, `card=#151C28`, `primary=#F4B942`

## Tipografia

- Títulos / marca: Manrope
- Texto / UI: DM Sans

## Assets

Em `apps/web/public/brand/` (kit Identidade Visual Mosaico — Azul-ardósia + Dourado):

- Logos com fundo transparente para UI (primary / negative)
- `nuvio-symbol.svg`, `nuvio-favicon.svg`, banner e social templates

## Regras

- Não alterar proporção dos quatro blocos nem o espaço negativo
- Componentes compactos: padding horizontal ≈ vertical
- Identidade de clientes permanece separada
