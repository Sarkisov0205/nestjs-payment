import { QueryRunner } from 'typeorm';
export const createHashIndex = async (
  queryRunner: QueryRunner,
  table: string,
  column: string,
  indexName?: string,
): Promise<void> => {
  const c = queryRunner.connection;
  const logger = c.logger;
  const idxName = indexName ?? `${table}_${column}_index`;
  logger.log('info', `Create index ${idxName}`);
  await queryRunner.query(
    `CREATE INDEX IF NOT EXISTS ${idxName} ON public.${table} USING HASH (${column});`,
  );
};

export const createGinIndex = async (
  queryRunner: QueryRunner,
  table: string,
  column: string,
  indexName?: string,
): Promise<void> => {
  const c = queryRunner.connection;
  const logger = c.logger;
  const idxName = indexName ?? `${table}_${column}_index`;
  logger.log('info', `Create index ${idxName}`);
  await queryRunner.query(`
    CREATE INDEX IF NOT EXISTS ${idxName}
    ON public.${table} USING gin(${column})
    WHERE ${column} IS NOT NULL;`);
};
