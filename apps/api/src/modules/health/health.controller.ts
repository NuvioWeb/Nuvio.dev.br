import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('health')
@SkipThrottle()
@Controller('health')
export class HealthController {
  @Get('live')
  live() {
    return { status: 'ok' };
  }

  @Get('ready')
  ready() {
    return { status: 'ready', checks: { api: 'up' } };
  }
}
