import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from '@fastify/helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { validateEnv } from './common/config/env';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const env = validateEnv(process.env);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
      bodyLimit: env.BODY_LIMIT_BYTES,
      requestIdHeader: 'x-request-id',
      genReqId: (req: { headers: Record<string, string | string[] | undefined> }) =>
        (typeof req.headers['x-request-id'] === 'string'
          ? req.headers['x-request-id']
          : undefined) ?? crypto.randomUUID(),
    }),
    { bufferLogs: true },
  );

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('');
  app.enableShutdownHooks();

  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  });

  app.enableCors({
    origin: env.CORS_ORIGINS,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'X-Request-Id'],
    credentials: false,
    maxAge: 86400,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  if (env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Nuvio API')
      .setDescription('API do site institucional Nuvio')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(env.API_PORT, env.API_HOST);
}

bootstrap();
