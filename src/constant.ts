import { importAll } from '@/utils/webpack';

export const getAllEntities = importAll(
  require.context('./', true, /^.*\.entity\.ts$/),
);

export const getAllMigrations = importAll(
  require.context('./', true, /\d+-migrations\.ts$/),
);
