import {
  Inject,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  CreateLeadDto,
  normalizeEmail,
  sanitizePlainText,
} from '@nuvio/contracts';
import {
  EMAIL_PROVIDER,
  EmailProvider,
} from '../../integrations/email/email.provider';

/**
 * Leads não são persistidos: validação + notificação por e-mail apenas.
 * O `id` é um correlacionador efêmero para logs/e-mail (não é registro em banco).
 */
@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    @Inject(EMAIL_PROVIDER) private readonly email: EmailProvider,
  ) {}

  async create(input: CreateLeadDto) {
    const id = randomUUID();
    const email = normalizeEmail(input.email);
    const name = sanitizePlainText(input.name, 120);
    const businessName = sanitizePlainText(input.businessName, 160);
    const whatsapp = input.whatsapp
      ? sanitizePlainText(input.whatsapp, 20)
      : undefined;
    const message = sanitizePlainText(input.message, 2000);
    const segment = input.segment;
    const objective = sanitizePlainText(input.objective, 120);
    const conversionOrigin = sanitizePlainText(
      input.conversionOrigin ?? 'contato',
      120,
    );

    try {
      await this.email.sendLeadNotification({
        id,
        name,
        businessName,
        replyEmail: email,
        whatsapp,
        segment,
        objective,
        conversionOrigin,
        messagePreview: message.slice(0, 500),
      });
    } catch (error) {
      this.logger.error(
        `Falha ao notificar lead ${id}: ${error instanceof Error ? error.message : 'erro'}`,
      );
      throw new ServiceUnavailableException(
        'Não foi possível enviar o pedido agora. Tente novamente em instantes ou fale pelo WhatsApp.',
      );
    }

    this.logger.log(`Lead notificado id=${id} segment=${segment}`);

    return { id, status: 'received' as const };
  }
}
