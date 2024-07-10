import { HttpModule, HttpService } from '@nestjs/axios';
import { DynamicModule, Global, Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

import { connectionFactory } from '@/modules/db/connection.factory';
import {
  CONNECTION_FACTORY_CONFIG,
  DATA_SOURCE,
} from '@/modules/db/injection-token';
import MigrationsController from '@/modules/db/migrations/migrations.controller';
import MigrationsService from '@/modules/db/migrations/migrations.service';
import {
  exportRepositoryProvider,
  repositoryProviderFactory,
} from '@/modules/db/repositoryProvider.factory';

@Global()
@Module({})
export default class DbModule {
  static forRoot(): DynamicModule {
    return {
      module: DbModule,
      imports: [ConfigModule, HttpModule],
      controllers: [MigrationsController],
      providers: [
        MigrationsService,
        {
          provide: CONNECTION_FACTORY_CONFIG,
          useValue: {},
        },
        {
          provide: DATA_SOURCE,
          scope: Scope.REQUEST,
          useFactory: connectionFactory,
          inject: [REQUEST, HttpService, ConfigService],
        },
        ...repositoryProviderFactory(),
      ],
      exports: [DATA_SOURCE, ...exportRepositoryProvider],
    };
  }
}
