import AbstractEntity from '@/core/entities/abstract-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Payment } from '@/modules/payment/entities/payment.entity';
import { NumericTransformer } from '@/utils/transformer/numericTransformer';
import { PaymentBalanceParam } from '@/modules/payment/types';

@Entity({ name: 'payment_balance' })
export class PaymentBalanceEntity
  extends AbstractEntity
  implements PaymentBalanceParam
{
  @OneToOne(() => Payment, (ent) => ent.paymentBalance)
  @JoinColumn({ name: 'payment' })
  payment: Payment;

  @Column({
    type: 'decimal',
    nullable: false,
    transformer: new NumericTransformer(),
  })
  commissionA: number;

  @Column({
    type: 'decimal',
    nullable: false,
    transformer: new NumericTransformer(),
  })
  commissionB: number;

  @Column({
    type: 'decimal',
    nullable: false,
    transformer: new NumericTransformer(),
  })
  commissionC: number;

  @Column({
    type: 'decimal',
    nullable: false,
    transformer: new NumericTransformer(),
  })
  tempHoldD: number;

  @Column({
    type: 'decimal',
    nullable: false,
    transformer: new NumericTransformer(),
  })
  payed: number;

  @Column({
    type: 'decimal',
    nullable: false,
    transformer: new NumericTransformer(),
  })
  amountToPay: number;
}
