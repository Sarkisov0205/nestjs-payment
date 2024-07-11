import { Inject } from '@nestjs/common';
import { getRepositoryToken } from '@/core/db/utils/getRepositoryToken';

// eslint-disable-next-line @typescript-eslint/ban-types
export const InjectRepository = (entity: Function): ReturnType<typeof Inject> =>
  Inject(getRepositoryToken(entity));
