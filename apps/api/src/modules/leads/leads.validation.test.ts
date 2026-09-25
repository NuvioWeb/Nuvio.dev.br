import { describe, expect, it } from 'vitest';
import { createLeadSchema } from '@nuvio/contracts';

describe('Leads validation (API boundary)', () => {
  it('bloqueia payload sem consentimento', () => {
    const result = createLeadSchema.safeParse({
      name: 'Teste',
      businessName: 'Negócio',
      email: 'a@b.com',
      segment: 'outro',
      objective: 'Site',
      message: 'Mensagem com tamanho ok',
      consent: false,
    });
    expect(result.success).toBe(false);
  });
});
