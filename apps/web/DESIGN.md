# DESIGN.md

<!-- impeccable:design-schema 1 -->

## World

**Calendário de Balcão** — a home da Nuvio como calendário de comércio: placa visual superior, filete dourado, bloco de ação inferior (folha rasgável). Identidade Mosaico (Azul-ardósia + Dourado; Manrope + DM Sans).

## Color

| Role | Light | Dark |
|------|-------|------|
| Ground | `#F8FAFC` | `#0A0F18` |
| Plate | `#1E293B` | `#151C28` |
| Pad / paper | `#FFFFFF` | `#243044` |
| Gold fillet / CTA | `#F4B942` | `#F4B942` |

## Type

- Display: Manrope extrabold
- Body: DM Sans
- Nome da marca na placa: Manrope, tratamento de linha dourada

## Layout

- Hero = placa + filete + pad (um objeto)
- Seções usam filete dourado ou borda de pad, não azulejo nem planta
- Processo = folhas / células do pad
- Raios: 8–12px (papel, não pastilha)

## Motion

- Active: scale 0.97
- Reveal: opacity + translateY 14px
- Filete: escala X no reveal quando fizer sentido
- Reduced motion: estático

## Seed

`5871741c` · challenger-calendar · Calendário de Balcão · persuade
