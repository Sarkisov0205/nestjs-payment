import { Inject, Injectable } from '@nestjs/common';
import {
  CommissionConfigType,
  PAYMENT_STATUSES,
  PaymentTransactionDataAccess,
} from '@/modules/payment/types';
import { Payment } from '@/modules/payment/entities/payment.entity';
import { InjectRepository } from '@/core/db/utils/decorators';
import { PaymentTransactionsEntity } from '@/modules/payment/entities/paymentTransactions.entity';
import { Repository } from 'typeorm';
import { CommissionConfig } from '@/modules/payment/constant';

@Injectable()
export class PaymentTransactionService implements PaymentTransactionDataAccess {
  constructor(
    @InjectRepository(PaymentTransactionsEntity)
    private repo: Repository<PaymentTransactionsEntity>,
    @Inject(CommissionConfig) private config: CommissionConfigType,
  ) {}

  async createTransaction(
    payment: Payment,
    status: PAYMENT_STATUSES,
  ): Promise<PaymentTransactionsEntity> {
    const { commissionA, commissionB, tempOnHoldD: tempHoldD } = this.config;
    const commissionC = payment.store.commission;
    const model = this.repo.create({
      payment,
      status,
      commissionA,
      commissionB,
      commissionC,
      tempHoldD,
    });

    return await this.repo.save(model);
  }

  async getPaymentTransactions(
    paymentId: string,
  ): Promise<PaymentTransactionsEntity[]> {
    return await this.repo.find({
      where: { payment: { id: paymentId } },
    });
  }
}
