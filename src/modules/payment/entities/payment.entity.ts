import AbstractEntity from '@/core/entities/abstract-entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Store } from '@/modules/store/entities/store.entity';
import { NumericTransformer } from '@/utils/transformer/numericTransformer';
import { PAYMENT_STATUSES, PaymentContract } from '@/modules/payment/types';
import { PaymentBalanceEntity } from '@/modules/payment/entities/paymentBalance.entity';

@Entity({ name: 'payment' })
export class Payment extends AbstractEntity implements PaymentContract {
  @ManyToOne(() => Store, (ent) => ent.payment)
  @JoinColumn({ name: 'store' })
  store: Store;

  @Column({
    type: 'decimal',
    nullable: false,
    transformer: new NumericTransformer(),
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: Object.values(PAYMENT_STATUSES),
    nullable: false,
    default: PAYMENT_STATUSES.new,
  })
  status: PAYMENT_STATUSES;

  @OneToOne(() => PaymentBalanceEntity, (ent) => ent.payment, { eager: true })
  paymentBalance: PaymentBalanceEntity;
}
