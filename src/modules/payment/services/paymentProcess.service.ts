import { Injectable, Logger } from '@nestjs/common';
import { PaymentService } from '@/modules/payment/data/payment.service';
import { PaymentBalanceService } from '@/modules/payment/data/paymentBalance.service';
import {
  PAYMENT_STATUSES,
  PaymentBalanceParam,
  PaymentProcessServiceContract,
} from '@/modules/payment/types';
import { CreatePaymentDto } from '@/modules/payment/dto/create-payment.dto';
import { PaymentCalcService } from '@/modules/payment/services/paymentCalc.service';
import { Payment } from '@/modules/payment/entities/payment.entity';

@Injectable()
export class PaymentProcessService implements PaymentProcessServiceContract {
  private readonly logger: Logger = new Logger('Payment process');
  constructor(
    private paymentService: PaymentService,
    private paymentCalc: PaymentCalcService,
    private paymentBalanceService: PaymentBalanceService,
  ) {}

  async newPayment(createPaymentDto: CreatePaymentDto): Promise<string> {
    const payment = await this.paymentService.create(createPaymentDto);

    const amount = payment.amount;
    const {
      commissionAmountA: commissionA,
      commissionAmountB: commissionB,
      commissionAmountC: commissionC,
    } = this.paymentCalc.getPyOutAmountInfo(amount, payment.store.commission);

    const model: PaymentBalanceParam = {
      payment,
      commissionA,
      commissionB,
      commissionC,
      tempHoldD: 0,
      payed: 0,
      amountToPay: amount - (commissionA + commissionB + commissionC),
    };

    await this.paymentBalanceService.createBalance(model);

    return payment.id;
  }

  async setToProcessed(ids: string[]): Promise<void> {
    const process = async (payment: Payment) => {
      if (payment.status !== PAYMENT_STATUSES.new) {
        this.logger.error(
          'Only payment with status new can be updated to proceesd',
        );
      }
      const tempOnHoldD = this.paymentCalc.getOnHoldAmount(payment.amount);
      await this.paymentService.update(payment.id, PAYMENT_STATUSES.processed);
      await this.paymentBalanceService.updateBalance(
        payment.paymentBalance.id,
        { tempHoldD: tempOnHoldD },
      );
    };
    await this.wrapper(ids, process);
  }
  async setToDone(ids: string[]): Promise<void> {
    const process = async (payment: Payment) => {
      if (payment.status !== PAYMENT_STATUSES.processed) {
        this.logger.error(
          'Only payment with processed new can be updated to done',
        );
      }
      await this.paymentService.update(payment.id, PAYMENT_STATUSES.done);
      await this.paymentBalanceService.updateBalance(
        payment.paymentBalance.id,
        { tempHoldD: 0 },
      );
    };

    await this.wrapper(ids, process);
  }

  async wrapper(ids: string[], func: (payment: Payment) => Promise<void>) {
    const errorsIds = [];
    for (const id of ids) {
      try {
        const payment = await this.paymentService.findOne(id, true);
        await func(payment);
      } catch (e) {
        this.logger.error(e);
        errorsIds.push();
      }

      if (errorsIds.length) {
        throw new Error(`Can't update payment with ids [${errorsIds}]`);
      }
    }
  }
}
