import { z } from "zod";

const MAX_NAME = 120;
const MAX_BUSINESS = 160;
const MAX_MESSAGE = 2000;
const MAX_SEGMENT = 80;
const MAX_OBJECTIVE = 120;
const MAX_ORIGIN = 120;

export const leadSegmentSchema = z.enum([
  "dentista",
  "clinica",
  "barbearia",
  "salao",
  "hotel",
  "pousada",
  "turismo",
  "advogado",
  "contador",
  "arquiteto",
  "outro",
]);

export type LeadSegment = z.infer<typeof leadSegmentSchema>;

export const createLeadSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Informe seu nome")
      .max(MAX_NAME, "Nome muito longo"),
    businessName: z
      .string()
      .trim()
      .min(2, "Informe o nome do negócio")
      .max(MAX_BUSINESS, "Nome do negócio muito longo"),
    email: z
      .string()
      .trim()
      .email("E-mail inválido")
      .max(254),
    whatsapp: z
      .string()
      .trim()
      .max(20)
      .regex(/^$|^\+?[0-9\s()-]{8,20}$/, "WhatsApp inválido")
      .optional()
      .or(z.literal("")),
    segment: leadSegmentSchema,
    objective: z
      .string()
      .trim()
      .min(2, "Informe o objetivo")
      .max(MAX_OBJECTIVE),
    message: z
      .string()
      .trim()
      .min(10, "Descreva um pouco mais o que você precisa")
      .max(MAX_MESSAGE),
    conversionOrigin: z
      .string()
      .trim()
      .max(MAX_ORIGIN)
      .default("contato"),
    consent: z.literal(true, {
      errorMap: () => ({
        message: "É necessário consentir com o tratamento dos dados",
      }),
    }),
    /** Honeypot — deve permanecer vazio */
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .transform((data) => ({
    ...data,
    whatsapp: data.whatsapp?.trim() ? data.whatsapp.trim() : undefined,
    website: undefined,
  }));

export type CreateLeadInput = z.input<typeof createLeadSchema>;
export type CreateLeadDto = z.output<typeof createLeadSchema>;

export const createLeadResponseSchema = z.object({
  id: z.string().uuid(),
  status: z.literal("received"),
});

export type CreateLeadResponse = z.infer<typeof createLeadResponseSchema>;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function sanitizePlainText(value: string, max = 2000): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}
