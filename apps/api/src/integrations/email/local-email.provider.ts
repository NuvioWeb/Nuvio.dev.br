import { Injectable, Logger } from '@nestjs/common';
import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';
import {
  EmailProvider,
  LeadNotificationPayload,
} from './email.provider';

@Injectable()
export class LocalEmailProvider implements EmailProvider {
  private readonly logger = new Logger(LocalEmailProvider.name);
  private readonly outDir = path.join(process.cwd(), '.local-mail');

  async sendLeadNotification(payload: LeadNotificationPayload): Promise<void> {
    await mkdir(this.outDir, { recursive: true });
    const line = JSON.stringify({
      at: new Date().toISOString(),
      type: 'lead_notification',
      leadId: payload.id,
      segment: payload.segment,
      objective: payload.objective,
      conversionOrigin: payload.conversionOrigin,
    });
    await appendFile(path.join(this.outDir, 'outbox.jsonl'), `${line}\n`, 'utf8');
    this.logger.log(
      `Lead notification stored locally (id=${payload.id}, segment=${payload.segment})`,
    );
  }
}
