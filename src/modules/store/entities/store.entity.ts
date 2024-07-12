import {
  Entity,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import AbstractEntity from '@/core/entities/abstract-entity';
import { StoreContract } from '@/modules/store/types';
import { Payment } from '@/modules/payment/entities/payment.entity';
import { NumericTransformer } from '@/utils/transformer/numericTransformer';

@Entity({ name: 'store' })
export class Store extends AbstractEntity implements StoreContract {
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'decimal',
    nullable: false,
    transformer: new NumericTransformer(),
  })
  commission: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  deleted_at: Date;

  @OneToMany(() => Payment, (ent) => ent.store)
  payment: Payment[];
}
