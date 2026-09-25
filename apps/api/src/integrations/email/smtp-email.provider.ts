import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import {
  EmailProvider,
  LeadNotificationPayload,
} from './email.provider';

/**
 * SMTP genérico (inclui Resend SMTP: host smtp.resend.com, user "resend", pass = API key).
 */
@Injectable()
export class SmtpEmailProvider implements EmailProvider {
  private readonly logger = new Logger(SmtpEmailProvider.name);

  constructor(private readonly config: ConfigService) {}

  async sendLeadNotification(payload: LeadNotificationPayload): Promise<void> {
    const host = this.config.get<string>('SMTP_HOST');
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');
    const port = this.config.get<number>('SMTP_PORT') ?? 587;
    const secure = this.config.get<boolean>('SMTP_SECURE') ?? false;
    const from = this.config.get<string>('EMAIL_FROM') ?? 'noreply@localhost';
    const to = this.config.get<string>('EMAIL_TO');

    if (!host || !user || !pass || !to) {
      throw new Error(
        'EMAIL_PROVIDER=smtp exige SMTP_HOST, SMTP_USER, SMTP_PASS e EMAIL_TO. Veja docs/procedures/email.md',
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: payload.replyEmail,
      subject: `[Nuvio] Novo lead — ${payload.segment} — ${payload.objective}`,
      text: [
        'Novo pedido de orçamento pelo site.',
        '',
        `ID: ${payload.id}`,
        `Nome: ${payload.name}`,
        `Negócio: ${payload.businessName}`,
        `E-mail: ${payload.replyEmail}`,
        `WhatsApp: ${payload.whatsapp ?? '—'}`,
        `Segmento: ${payload.segment}`,
        `Objetivo: ${payload.objective}`,
        `Origem: ${payload.conversionOrigin}`,
        '',
        'Mensagem:',
        payload.messagePreview,
      ].join('\n'),
    });

    this.logger.log(`Lead notification sent via SMTP (id=${payload.id})`);
  }
}
