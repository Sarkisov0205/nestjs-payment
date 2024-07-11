import { DynamicModule, Global, Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { connectionFactory } from '@/core/db/connection.factory';
import { DATA_SOURCE } from '@/core/db/injection-token';
import MigrationsController from '@/core/db/migrations/migrations.controller';
import MigrationsService from '@/core/db/migrations/migrations.service';
import {
  exportRepositoryProvider,
  repositoryProviderFactory,
} from '@/core/db/repositoryProvider.factory';

@Global()
@Module({})
export class DbModule {
  static forRoot(): DynamicModule {
    return {
      module: DbModule,
      imports: [ConfigModule],
      controllers: [MigrationsController],
      providers: [
        MigrationsService,
        {
          provide: DATA_SOURCE,
          scope: Scope.DEFAULT,
          useFactory: connectionFactory,
          inject: [ConfigService],
        },
        ...repositoryProviderFactory(),
      ],
      exports: [DATA_SOURCE, ...exportRepositoryProvider],
    };
  }
}
