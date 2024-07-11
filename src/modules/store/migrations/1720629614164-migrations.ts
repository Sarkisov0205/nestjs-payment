import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { AbstractEntityDefaultFields } from '@/core/entities/abstract-entity-default-fields';
import { createHashIndex } from '@/utils/indexes-utils';

export class Migrations1720629614164 implements MigrationInterface {
  private readonly table: Table = new Table({
    name: 'store',
    columns: [
      ...AbstractEntityDefaultFields,
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'commission',
        type: 'decimal',
        precision: 5,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'deleted_at',
        type: 'timestamptz',
        isNullable: true,
        default: null,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await createHashIndex(queryRunner, 'store', 'name');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
