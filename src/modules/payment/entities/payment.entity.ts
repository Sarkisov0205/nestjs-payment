import AbstractEntity from '@/core/entities/abstract-entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Store } from '@/modules/store/entities/store.entity';
import { NumericTransformer } from '@/utils/transformer/numericTransformer';
import { PaymentContract } from '@/modules/payment/types';
import { PaymentTransactionsEntity } from '@/modules/payment/entities/paymentTransactions.entity';

@Entity({ name: 'payment' })
export class Payment extends AbstractEntity implements PaymentContract {
  @ManyToOne(() => Store, (ent) => ent.payment)
  @JoinColumn({ name: 'store' })
  store: Store;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
    transformer: new NumericTransformer(),
  })
  amount: number;

  @OneToMany(() => PaymentTransactionsEntity, (ent) => ent.payment)
  paymentTransactions: PaymentTransactionsEntity[];
}
