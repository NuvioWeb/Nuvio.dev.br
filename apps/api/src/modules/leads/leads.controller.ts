import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { createLeadSchema } from '@nuvio/contracts';
import { LeadsService } from './leads.service';

@ApiTags('leads')
@Controller('api/v1/leads')
export class LeadsController {
  constructor(
    private readonly leadsService: LeadsService,
    private readonly config: ConfigService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({
    default: {
      limit: 5,
      ttl: 60_000,
    },
  })
  @ApiOperation({ summary: 'Recebe pedido de orçamento' })
  async create(@Body() body: unknown) {
    const leadLimit = this.config.get<number>('THROTTLE_LEAD_LIMIT') ?? 5;
    void leadLimit;

    const parsed = createLeadSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({
        message: 'Dados inválidos',
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    return this.leadsService.create(parsed.data);
  }
}
