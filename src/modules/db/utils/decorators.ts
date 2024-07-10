import { Inject, Type } from '@nestjs/common';

import { getRepositoryToken } from '@/modules/db/utils/getRepositoryToken';

export const InjectRepository = (
  entity: Type,
): ReturnType<typeof Inject> => Inject(getRepositoryToken(entity));
