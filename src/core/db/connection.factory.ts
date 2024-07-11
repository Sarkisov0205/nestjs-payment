import { Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { getAllEntities, getAllMigrations } from '@/constant';

type DbConnectionOptions = Omit<PostgresConnectionOptions, 'type'>;
const LOGGER_PREFIX = '📥 DataSource';
const logger = new Logger(LOGGER_PREFIX);

/**
 * Create connection to DB.
 * In case of failure, second retry is made.
 */
export const connectionFactory = async (
  configService: ConfigService,
  isRetry = false,
): Promise<DataSource> => {
  try {
    const dataSourceConfig = dataSourceConfigFactory(configService);
    const dataSource = new DataSource(dataSourceConfig);
    await dataSource.initialize();

    return dataSource;
  } catch (e) {
    if (isRetry) {
      logger.error(
        `Unable to create connection to DB due to the following error: ${JSON.stringify(e)}. Terminating program...`,
      );
      const message = (e as unknown as Error).message;
      throw new ServiceUnavailableException(
        `DB service is unavailable ${message ? `due to ${message}` : '.'}`,
      );
    }
    return connectionFactory(configService, true);
  }
};

function getDbConnectionOptions(
  configService: ConfigService,
): DbConnectionOptions {
  const port = configService.getOrThrow('DB_PORT');
  const username = configService.getOrThrow('DB_USERNAME');
  const password = configService.getOrThrow('DB_PASSWORD');
  const database = configService.getOrThrow('DB_DATABASE');

  return {
    username,
    password,
    database,
    port,
  };
}

function dataSourceConfigFactory(
  configService: ConfigService,
): DataSourceOptions {
  const { username, password, database, port } =
    getDbConnectionOptions(configService);

  return {
    type: 'postgres',
    host: 'db',
    port,
    username,
    password,
    database,
    synchronize: false,
    migrationsRun: false,
    entities: getAllEntities(),
    migrations: getAllMigrations(),
    logging: ['warn', 'error'],
    logger: 'simple-console',
  };
}
