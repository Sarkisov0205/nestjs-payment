import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DATA_SOURCE } from '@/core/db/injection-token';

@Injectable()
export default class MigrationsService {
  constructor(@Inject(DATA_SOURCE) private dataSource: DataSource) {}

  async getMigrationsStatus(): Promise<boolean> {
    return this.dataSource.showMigrations();
  }

  async runMigrations(): Promise<void> {
    try {
      await this.dataSource.runMigrations();
    } catch (e) {
      await this.dataSource.undoLastMigration();
      throw new Error('Failed to run migrations!');
    }
  }

  async revertMigrations(): Promise<void> {
    await this.dataSource.undoLastMigration();
  }
}
