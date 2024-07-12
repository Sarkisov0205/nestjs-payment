import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { AbstractEntityDefaultFields } from '@/core/entities/abstract-entity-default-fields';

export class Migrations1720714175413 implements MigrationInterface {
  private readonly table: Table = new Table({
    name: 'payment_balance',
    columns: [
      ...AbstractEntityDefaultFields,
      {
        name: 'commissionA',
        type: 'decimal',
        isNullable: false,
      },
      {
        name: 'commissionB',
        type: 'decimal',
        isNullable: false,
      },
      {
        name: 'commissionC',
        type: 'decimal',
        isNullable: false,
      },
      {
        name: 'tempHoldD',
        type: 'decimal',
        isNullable: false,
      },
      {
        name: 'amountToPay',
        type: 'decimal',
        isNullable: false,
      },
      {
        name: 'payed',
        type: 'decimal',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true);
  }
}
