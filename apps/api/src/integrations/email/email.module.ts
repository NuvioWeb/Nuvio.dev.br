import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EMAIL_PROVIDER } from './email.provider';
import { LocalEmailProvider } from './local-email.provider';
import { ResendEmailProvider } from './resend-email.provider';
import { SmtpEmailProvider } from './smtp-email.provider';

@Module({
  providers: [
    LocalEmailProvider,
    SmtpEmailProvider,
    ResendEmailProvider,
    {
      provide: EMAIL_PROVIDER,
      inject: [
        ConfigService,
        LocalEmailProvider,
        SmtpEmailProvider,
        ResendEmailProvider,
      ],
      useFactory: (
        config: ConfigService,
        local: LocalEmailProvider,
        smtp: SmtpEmailProvider,
        resend: ResendEmailProvider,
      ) => {
        const provider = config.get<string>('EMAIL_PROVIDER') ?? 'local';
        if (provider === 'resend') return resend;
        if (provider === 'smtp') return smtp;
        return local;
      },
    },
  ],
  exports: [EMAIL_PROVIDER],
})
export class EmailModule {}
