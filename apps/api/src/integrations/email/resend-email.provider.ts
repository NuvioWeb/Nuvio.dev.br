import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EmailProvider,
  LeadNotificationPayload,
} from './email.provider';

/**
 * Envio via API Resend (chave `re_...`).
 * Domínio `nuvio.dev.br` verificado — FROM padrão: contato@nuvio.dev.br.
 */
@Injectable()
export class ResendEmailProvider implements EmailProvider {
  private readonly logger = new Logger(ResendEmailProvider.name);

  constructor(private readonly config: ConfigService) {}

  async sendLeadNotification(payload: LeadNotificationPayload): Promise<void> {
    const apiKey = this.config.get<string>('RESEND_API_KEY');
    const from =
      this.config.get<string>('EMAIL_FROM') ?? 'Nuvio <contato@nuvio.dev.br>';
    const to = this.config.get<string>('EMAIL_TO');

    if (!apiKey?.startsWith('re_')) {
      throw new Error(
        'EMAIL_PROVIDER=resend exige RESEND_API_KEY válida (começa com re_).',
      );
    }
    if (!to) {
      throw new Error('EMAIL_TO é obrigatório para notificar leads.');
    }

    const subject = `[Nuvio] Novo lead — ${payload.segment} — ${payload.objective}`;
    const text = [
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
    ].join('\n');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.replyEmail,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      this.logger.warn(`Resend falhou status=${response.status}`);
      throw new Error(`Resend HTTP ${response.status}: ${body.slice(0, 200)}`);
    }

    this.logger.log(`Lead notification sent via Resend (id=${payload.id})`);
  }
}
