import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import MigrationsService from '@/modules/db/migrations/migrations.service';

@ApiTags('Migrations')
@Controller('migrations')
export default class MigrationsController {
  constructor(private migrationsService: MigrationsService) {}

  /**
   * @deprecated use /launch instead
   */
  @ApiResponse({
    status: 200,
    description: 'Run all pending migrations',
  })
  @Get('run')
  async runMigrations(): Promise<void> {
    await this.migrationsService.runMigrations();
  }

  /**
   * @deprecated
   */
  @ApiResponse({
    status: 200,
    description: 'Run all pending migrations',
  })

  /**
   * @deprecated
   */
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
