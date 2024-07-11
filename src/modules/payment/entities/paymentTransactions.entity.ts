import AbstractEntity from '@/core/entities/abstract-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PAYMENT_STATUSES } from '@/modules/payment/types';
import { Payment } from '@/modules/payment/entities/payment.entity';
import { NumericTransformer } from '@/utils/transformer/numericTransformer';

@Entity({ name: 'payment_transaction' })
export class PaymentTransactionsEntity extends AbstractEntity {
  @Column({
    type: 'enum',
    enum: Object.values(PAYMENT_STATUSES),
    nullable: false,
    default: PAYMENT_STATUSES.new,
  })
  status: PAYMENT_STATUSES;

  @ManyToOne(() => Payment, (ent) => ent.paymentTransactions)
  @JoinColumn({ name: 'payment' })
  payment: Payment;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
    transformer: new NumericTransformer(),
  })
  commissionA: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
    transformer: new NumericTransformer(),
  })
  commissionB: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
    transformer: new NumericTransformer(),
  })
  commissionC: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
    transformer: new NumericTransformer(),
  })
  tempHoldD: number;
}
