import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@/core/db/injection-token';
import { getRepositoryToken } from '@/core/db/utils/getRepositoryToken';
import AppError from '@/utils/app.error';
import { getAllEntities } from '@/constant';

export const repositoryProviderFactory: () => FactoryProvider[] = () => {
  return getAllEntities().map((repo) => ({
    provide: getRepositoryToken(repo),
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(repo);
      } catch (e) {
        throw new AppError(
          `Can't create repository instance for ${repo.name} entity`,
        );
      }
    },
    inject: [DATA_SOURCE],
  }));
};

export const exportRepositoryProvider: string[] = getAllEntities().map((repo) =>
  getRepositoryToken(repo),
);
