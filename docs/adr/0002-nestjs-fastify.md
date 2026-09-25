# ADR 0002 — NestJS com FastifyAdapter

## Status

Aceito

## Contexto

A API precisa de throughput adequado, headers de segurança e rate limiting para leads, sem microserviços.

## Decisão

Usar NestJS com `@nestjs/platform-fastify` (FastifyAdapter), `@fastify/helmet`, `@nestjs/throttler` e logger estruturado (Pino via Nest).

## Consequências

- Middleware Express-específico não se aplica; usar equivalentes Fastify.
- Swagger/OpenAPI via `@nestjs/swagger` permanece suportado.
- Performance e footprint melhores que Express para o mesmo monólito modular.
