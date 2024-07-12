import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { AbstractEntityDefaultFields } from '@/core/entities/abstract-entity-default-fields';
import { PAYMENT_STATUSES } from '@/modules/payment/types';

export class Migrations1720680826160 implements MigrationInterface {
  private readonly table: Table = new Table({
    name: 'payment',
    columns: [
      ...AbstractEntityDefaultFields,
      {
        name: 'amount',
        type: 'decimal',
        isNullable: false,
      },
      {
        name: 'status',
        type: 'enum',
        enum: Object.values(PAYMENT_STATUSES),
        isNullable: false,
        default: `'${PAYMENT_STATUSES.new}'`,
      },
      {
        name: 'store',
        type: 'uuid',
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        referencedTableName: 'store',
        referencedColumnNames: ['id'],
        columnNames: ['store'],
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true);
  }
}
