import { Injectable, Logger } from '@nestjs/common';
import { PaymentService } from '@/modules/payment/data/payment.service';
import { PaymentTransactionService } from '@/modules/payment/data/paymentTransaction.service';
import { PAYMENT_STATUSES } from '@/modules/payment/types';
import { Payment } from '@/modules/payment/entities/payment.entity';

@Injectable()
export class PaymentProcessService implements PaymentProcessService {
  private readonly logger: Logger = new Logger('Payment process');
  constructor(
    private paymentService: PaymentService,
    private paymentTransactionService: PaymentTransactionService,
  ) {}

  async setNewStatus(payment: Payment) {
    await this.paymentTransactionService.createTransaction(
      payment,
      PAYMENT_STATUSES.new,
    );
  }
  async setToProcessed(ids: string[]): Promise<void> {
    await this.process(ids, PAYMENT_STATUSES.processed);
  }
  async setToDone(ids: string[]): Promise<void> {
    await this.process(ids, PAYMENT_STATUSES.done);
  }

  private async process(ids: string[], status: PAYMENT_STATUSES) {
    for (const id of ids) {
      try {
        const payment = await this.paymentService.findOne(id, true);
        await this.paymentTransactionService.createTransaction(payment, status);
      } catch (e) {
        this.logger.error(
          `Can't set ${status} status for payment with id ${id}`,
        );
      }
    }
  }
}
