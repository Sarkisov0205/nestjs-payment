import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { AbstractEntityDefaultFields } from '@/core/entities/abstract-entity-default-fields';
import { PAYMENT_STATUSES } from '@/modules/payment/types';
import { createHashIndex } from '@/utils/indexes-utils';

export class Migrations1720714175413 implements MigrationInterface {
  private readonly table: Table = new Table({
    name: 'payment_transaction',
    columns: [
      ...AbstractEntityDefaultFields,
      {
        name: 'status',
        type: 'enum',
        enum: Object.values(PAYMENT_STATUSES),
        isNullable: false,
        default: `'${PAYMENT_STATUSES.new}'`,
      },
      {
        name: 'commissionA',
        type: 'decimal',
        precision: 5,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'commissionB',
        type: 'decimal',
        precision: 5,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'commissionC',
        type: 'decimal',
        precision: 5,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'tempHoldD',
        type: 'decimal',
        precision: 5,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'payment',
        type: 'uuid',
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        referencedTableName: 'payment',
        referencedColumnNames: ['id'],
        columnNames: ['payment'],
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true, true);
    await createHashIndex(queryRunner, 'payment_transaction', 'payment');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true);
  }
}
