import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CommissionConfig } from '@/modules/payment/constant';
import { CommissionConfigType } from '@/modules/payment/types';
import { IsNumber } from 'class-validator';
import { PaymentCalcService } from '@/modules/payment/services/paymentCalc.service';

@Injectable()
export class NewPaymentGuard implements CanActivate {
  constructor(
    @Inject(CommissionConfig) private config: CommissionConfigType,
    private paymentCalcService: PaymentCalcService,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const amount = request?.body?.amount;
    if (IsNumber(amount)) {
      const { totalCommission } =
        this.paymentCalcService.getPyOutAmountInfo(amount);

      if (amount > totalCommission) return true;

      throw new BadRequestException('Payment amount is less than commissions');
    }
    throw new BadRequestException();
  }
}
