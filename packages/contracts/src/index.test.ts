import { describe, expect, it } from "vitest";
import {
  createLeadSchema,
  normalizeEmail,
  sanitizePlainText,
} from "./index.js";

describe("createLeadSchema", () => {
  const valid = {
    name: "Ana Silva",
    businessName: "Clínica Exemplo",
    email: "ana@exemplo.com",
    whatsapp: "+55 11 99999-0000",
    segment: "clinica" as const,
    objective: "Novo site",
    message: "Preciso de um site institucional com agenda.",
    conversionOrigin: "contato",
    consent: true as const,
    website: "",
  };

  it("aceita lead válido", () => {
    const result = createLeadSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejeita sem consentimento", () => {
    const result = createLeadSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejeita honeypot preenchido", () => {
    const result = createLeadSchema.safeParse({
      ...valid,
      website: "http://spam.test",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita e-mail inválido", () => {
    const result = createLeadSchema.safeParse({ ...valid, email: "x" });
    expect(result.success).toBe(false);
  });
});

describe("helpers", () => {
  it("normaliza e-mail", () => {
    expect(normalizeEmail("  Ana@Exemplo.COM ")).toBe("ana@exemplo.com");
  });

  it("sanitiza texto", () => {
    expect(sanitizePlainText("olá\u0000 mundo")).toBe("olá mundo");
  });
});
