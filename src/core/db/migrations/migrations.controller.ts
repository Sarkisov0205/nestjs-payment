import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import MigrationsService from '@/core/db/migrations/migrations.service';

@ApiTags('Migrations')
@Controller('migrations')
export default class MigrationsController {
  constructor(private migrationsService: MigrationsService) {}

  @ApiResponse({
    status: 200,
    description: 'Run all pending migrations',
  })
  @Get('run')
  async runMigrations(): Promise<void> {
    await this.migrationsService.runMigrations();
  }

  @ApiResponse({
    status: 200,
    description: 'Run all pending migrations',
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: 'Check if there are any pending migrations',
  })
  @Get('status')
  async getMigrationsStatus(): Promise<boolean> {
    return await this.migrationsService.getMigrationsStatus();
  }
  @ApiResponse({
    status: 200,
    description: 'Revert last migration',
  })
  @Get('revert')
  async revertMigrations(): Promise<void> {
    await this.migrationsService.revertMigrations();
  }
}
