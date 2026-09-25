export interface LeadNotificationPayload {
  id: string;
  name: string;
  businessName: string;
  replyEmail: string;
  whatsapp?: string;
  segment: string;
  objective: string;
  conversionOrigin: string;
  /** Mensagem truncada só para o e-mail — não logar */
  messagePreview: string;
}

export interface EmailProvider {
  sendLeadNotification(payload: LeadNotificationPayload): Promise<void>;
}

export const EMAIL_PROVIDER = Symbol('EMAIL_PROVIDER');
