import { Injectable } from '@nestjs/common';
import {
  PaymentBalanceDataAccess,
  PaymentBalanceParam,
  UpdateBalanceParams,
} from '@/modules/payment/types';
import { InjectRepository } from '@/core/db/utils/decorators';
import { PaymentBalanceEntity } from '@/modules/payment/entities/paymentBalance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentBalanceService implements PaymentBalanceDataAccess {
  constructor(
    @InjectRepository(PaymentBalanceEntity)
    private repo: Repository<PaymentBalanceEntity>,
  ) {}

  async createBalance(
    balanceData: PaymentBalanceParam,
  ): Promise<PaymentBalanceEntity> {
    const model = this.repo.create(balanceData);
    return await this.repo.save(model);
  }

  async updateBalance(id: string, data: UpdateBalanceParams) {
    const entity = await this.repo.findOneOrFail({ where: { id } });
    await this.repo.save({
      ...entity,
      ...data,
    });
  }

  async getPaymentBalance(paymentId: string): Promise<PaymentBalanceEntity> {
    return await this.repo.findOneOrFail({
      where: { payment: { id: paymentId } },
    });
  }
}
