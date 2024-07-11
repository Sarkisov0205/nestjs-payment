import { TableColumnOptions } from 'typeorm';

export const AbstractEntityDefaultFields: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'uuid',
    isPrimary: true,
    isUnique: true,
    generationStrategy: 'uuid',
    default: 'uuid_generate_v4()',
  },
  {
    name: 'created_at',
    type: 'timestamptz',
    isNullable: false,
    default: 'now()',
  },
];
