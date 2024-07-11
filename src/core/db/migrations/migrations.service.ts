import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DATA_SOURCE } from '@/core/db/injection-token';
import AppError from '@/utils/app.error';

@Injectable()
export default class MigrationsService {
  constructor(@Inject(DATA_SOURCE) private dataSource: DataSource) {}

  /**
   * @deprecated
   * @return true if there are pending migrations
   */
  async getMigrationsStatus(): Promise<boolean> {
    return this.dataSource.showMigrations();
  }

  /**
   * Run all pending migrations, if migrations fails, reverts last executed migration
   */
  async runMigrations(): Promise<void> {
    try {
      await this.dataSource.runMigrations();
    } catch (e) {
      await this.dataSource.undoLastMigration();
      throw new AppError('Failed to run migrations!');
    }
  }

  /**
   * Reverts last executed migration
   */
  async revertMigrations(): Promise<void> {
    await this.dataSource.undoLastMigration();
  }
}
