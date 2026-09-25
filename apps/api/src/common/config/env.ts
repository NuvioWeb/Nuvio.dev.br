import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  /** Railway/Heroku injetam PORT; API_PORT permanece para dev local */
  PORT: z.coerce.number().int().positive().optional(),
  API_PORT: z.coerce.number().int().positive().default(3001),
  API_HOST: z.string().default('0.0.0.0'),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:5173')
    .transform((value) =>
      value
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),
  BODY_LIMIT_BYTES: z.coerce.number().int().positive().default(65_536),
  THROTTLE_TTL_MS: z.coerce.number().int().positive().default(60_000),
  THROTTLE_LIMIT: z.coerce.number().int().positive().default(10),
  THROTTLE_LEAD_LIMIT: z.coerce.number().int().positive().default(5),
  EMAIL_PROVIDER: z.enum(['local', 'smtp', 'resend']).default('local'),
  EMAIL_FROM: z.string().default('noreply@localhost'),
  EMAIL_TO: z.string().default('leads@localhost'),
  RESEND_API_KEY: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((v) => v === 'true'),
});

export type AppEnv = z.infer<typeof envSchema> & {
  CORS_ORIGINS: string[];
};

export function validateEnv(
  config: Record<string, unknown> | NodeJS.ProcessEnv,
): AppEnv {
  const parsed = envSchema.safeParse(config);
  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Configuração de ambiente inválida: ${message}`);
  }
  const data = parsed.data as AppEnv;
  if (data.PORT) {
    data.API_PORT = data.PORT;
  }
  return data;
}
