import { Inject, Injectable } from '@nestjs/common';
import {
  CommissionConfigType,
  GetPyOutAmountInfoI,
  PaymentCalcServiceContract,
} from '@/modules/payment/types';
import { CommissionConfig } from '@/modules/payment/constant';

@Injectable()
export class PaymentCalcService implements PaymentCalcServiceContract {
  constructor(@Inject(CommissionConfig) private config: CommissionConfigType) {}

  getAmountOfCommission(amount: number, commissionPercentage: number): number {
    return amount * commissionPercentage;
  }

  getOnHoldAmount(amount: number): number {
    return this.getAmountOfCommission(amount, this.config.tempOnHoldD);
  }

  getPyOutAmountInfo(amount, extraCommission: number = 0): GetPyOutAmountInfoI {
    const { commissionA, commissionB } = this.config;
    const commissionAmountB = this.getAmountOfCommission(amount, commissionB);
    const tempOnHoldDAmount = this.getOnHoldAmount(amount);
    const commissionAmountC = this.getAmountOfCommission(
      amount,
      extraCommission,
    );
    const totalCommission = commissionA + commissionAmountB + commissionAmountC;
    return {
      commissionAmountA: commissionA,
      commissionAmountB,
      commissionAmountC,
      amount,
      totalCommission,
      tempOnHoldDAmount,
    };
  }
}
